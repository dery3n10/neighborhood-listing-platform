const features = [
  {
    title: "Listings",
    description:
      "Browse neighborhood properties with clear details about each available home.",
  },
  {
    title: "Neighborhood Sponsors",
    description:
      "Discover local organizations and businesses that support the community.",
  },
  {
    title: "Voice Help",
    description:
      "Get simple voice-guided assistance while exploring the platform.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section
        className="mx-auto max-w-5xl"
        aria-labelledby="page-title"
      >
        <p className="mb-3 font-semibold uppercase tracking-wider text-blue-700">
          Community property tools
        </p>

        <h1
          id="page-title"
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Neighborhood Listing Platform
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          A simple and accessible place to explore property listings, connect
          with neighborhood sponsors, and receive helpful voice assistance.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-blue-800">
                {feature.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
