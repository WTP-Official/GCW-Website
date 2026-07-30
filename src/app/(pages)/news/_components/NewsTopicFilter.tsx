"use client";

import { useRouter } from "next/navigation";

export function NewsTopicFilter({
  topics,
  selectedTopic,
}: {
  topics: string[];
  selectedTopic?: string;
}) {
  const router = useRouter();

  return (
    <div className="mt-8">
      <label htmlFor="news-topic-filter" className="sr-only">
        Lọc theo chủ đề
      </label>
      <select
        id="news-topic-filter"
        value={selectedTopic ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          router.push(value ? `/news?topic=${encodeURIComponent(value)}` : "/news");
        }}
        className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink"
      >
        <option value="">Tất cả chủ đề</option>
        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
}
