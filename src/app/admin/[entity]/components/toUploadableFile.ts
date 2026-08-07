const ASCII_UNSAFE = /[^\x00-\x7F]/;

// Next.js's route handler formData() parser throws "Failed to parse body as
// FormData" when the multipart Content-Disposition filename has non-ASCII
// bytes (https://github.com/vercel/next.js/issues/76893, unfixed as of
// Next 15.4). Vietnamese filenames almost always carry diacritics, so
// rebuild the File with an ASCII-safe name before it's sent — the upload
// route regenerates the on-disk filename anyway, so the original name isn't
// needed past this point.
export function toUploadableFile(file: File): File {
  if (!ASCII_UNSAFE.test(file.name)) return file;
  const extension = file.name.match(/\.[^.]+$/)?.[0] ?? "";
  return new File([file], `upload${extension}`, { type: file.type });
}
