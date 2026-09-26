"use client";

import Image from "next/image";
import { useState } from "react";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export default function PropertyCard({
  property,
  priority = false,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Image
        src={property.imageSrc}
        alt={`${property.title} at ${property.streetAddress}, ${property.city}`}
        width={640}
        height={400}
        priority={priority}
        className="aspect-[16/10] w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-bold text-slate-950">
            {property.title}
          </h3>

          <address className="mt-1 not-italic text-slate-600">
            {property.streetAddress}, {property.city}, {property.state}{" "}
            {property.zipCode}
          </address>
        </div>

        <p className="text-2xl font-bold text-blue-700">
          ${property.price.toLocaleString()}
        </p>

        <ul
          className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700"
          aria-label="Property facts"
        >
          <li>{property.bedrooms} bedrooms</li>
          <li>{property.bathrooms} bathrooms</li>
          <li>{property.squareFootage.toLocaleString()} square feet</li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <a
            href={property.detailsUrl}
            className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            View details for {property.streetAddress}
          </a>

          <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={`Favorite ${property.streetAddress}`}
            onClick={() => setIsFavorite((current) => !current)}
            className={`rounded-lg border border-slate-400 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
              isFavorite ? "bg-blue-100" : "bg-white"
            }`}
          >
            Favorite
          </button>
        </div>
      </div>
    </article>
  );
}
