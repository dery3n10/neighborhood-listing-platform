import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import SponsorBanner from "@/components/SponsorBanner";
import { sponsors } from "@/data/listings";
import {
  validatedProperties,
  validationErrors,
} from "@/data/validatedListings";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header aria-labelledby="page-title">
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
            Explore neighborhood properties and connect with organizations that
            support the community.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="search-heading">
          <h2
            id="search-heading"
            className="text-2xl font-bold text-slate-900"
          >
            Search properties
          </h2>

          <div className="mt-6">
            <SearchFilters />
          </div>
        </section>

        <section className="mt-12" aria-labelledby="sponsors-heading">
          <h2
            id="sponsors-heading"
            className="text-2xl font-bold text-slate-900"
          >
            Neighborhood sponsors
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {sponsors.map((sponsor) => (
              <SponsorBanner key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="listings-heading">
          <h2
            id="listings-heading"
            className="text-2xl font-bold text-slate-900"
          >
            Available properties
          </h2>

          {validationErrors.length > 0 && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950"
            >
              Some property records failed validation and were not displayed.
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {validatedProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                priority={index === 0}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
