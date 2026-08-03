import { readFile, writeFile } from "fs/promises";
import path from "path";

// Dev-only: reads/writes each route's own content.json on disk. Vercel's
// production filesystem is read-only, so writes only work via `pnpm dev`.
function contentFilePath(contentFile: string) {
  return path.join(process.cwd(), "src/app/(pages)", contentFile);
}

// Concurrent admin requests targeting the same content.json (e.g. a
// double-submit, or two entities sharing one file like cam-nang's
// tools/items) otherwise race: both read the pre-write JSON, then the
// second writeFile clobbers the first's change. Queuing read+write per
// file path serializes them so no update is lost.
const fileLocks = new Map<string, Promise<unknown>>();

function withFileLock<T>(filePath: string, run: () => Promise<T>): Promise<T> {
  const previous = fileLocks.get(filePath) ?? Promise.resolve();
  const next = previous.then(run, run);
  fileLocks.set(
    filePath,
    next.then(
      () => undefined,
      () => undefined,
    ),
  );
  return next;
}

export async function readContentItems(contentFile: string, itemsKey: string) {
  const raw = await readFile(contentFilePath(contentFile), "utf-8");
  const data = JSON.parse(raw) as Record<string, unknown>;
  return (data[itemsKey] as Record<string, unknown>[]) ?? [];
}

/**
 * Reads, lets `mutate` edit the items array in place (return the array to
 * persist), and writes the whole file back — all under the per-file lock.
 */
export async function mutateContentItems<T>(
  contentFile: string,
  itemsKey: string,
  mutate: (items: Record<string, unknown>[]) => { items: Record<string, unknown>[]; result: T },
): Promise<T> {
  const filePath = contentFilePath(contentFile);
  return withFileLock(filePath, async () => {
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as Record<string, unknown>;
    const items = (data[itemsKey] as Record<string, unknown>[]) ?? [];
    const { items: nextItems, result } = mutate(items);
    data[itemsKey] = nextItems;
    await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
    return result;
  });
}
