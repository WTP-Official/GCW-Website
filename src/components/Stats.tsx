import content from "../app/content.json";

export function Stats() {
  return (
    <section className="bg-bg-muted">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-16 sm:grid-cols-4">
        {content.stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="text-2xl text-ink sm:text-3xl">{stat.value}</p>
            <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
