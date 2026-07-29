import content from "../content.json";

export function Stats() {
  return (
    <section className="bg-blue-cta text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:grid-cols-4">
        {content.stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
