"use client";

import { FormEvent, useState } from "react";

export interface SearchFilterValues {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

interface SearchFiltersProps {
  onSubmit?: (filters: SearchFilterValues) => void;
}

function toOptionalNumber(value: string) {
  return value === "" ? undefined : Number(value);
}

export default function SearchFilters({
  onSubmit,
}: SearchFiltersProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const filters: SearchFilterValues = {
      minPrice: toOptionalNumber(minPrice),
      maxPrice: toOptionalNumber(maxPrice),
      bedrooms: toOptionalNumber(bedrooms),
    };

    if (
      filters.minPrice !== undefined &&
      filters.maxPrice !== undefined &&
      filters.minPrice > filters.maxPrice
    ) {
      setError("Minimum price cannot be greater than maximum price.");
      setStatus("");
      return;
    }

    setError("");
    setStatus("Filters applied.");
    onSubmit?.(filters);
  }

  const controlClasses =
    "mt-2 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300";

  return (
    <form
      aria-describedby={error ? "filter-error" : undefined}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold text-slate-950">
        Search filters
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="font-semibold text-slate-800">
          Minimum price
          <select
            name="minPrice"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            className={controlClasses}
          >
            <option value="">No minimum</option>
            <option value="500000">$500,000</option>
            <option value="1000000">$1,000,000</option>
            <option value="2000000">$2,000,000</option>
          </select>
        </label>

        <label className="font-semibold text-slate-800">
          Maximum price
          <select
            name="maxPrice"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className={controlClasses}
          >
            <option value="">No maximum</option>
            <option value="1000000">$1,000,000</option>
            <option value="2000000">$2,000,000</option>
            <option value="5000000">$5,000,000</option>
          </select>
        </label>

        <label className="font-semibold text-slate-800">
          Bedrooms
          <select
            name="bedrooms"
            value={bedrooms}
            onChange={(event) => setBedrooms(event.target.value)}
            className={controlClasses}
          >
            <option value="">Any number</option>
            <option value="1">1 or more</option>
            <option value="2">2 or more</option>
            <option value="3">3 or more</option>
            <option value="4">4 or more</option>
          </select>
        </label>
      </div>

      {error && (
        <p
          id="filter-error"
          role="alert"
          className="mt-4 font-semibold text-red-700"
        >
          {error}
        </p>
      )}

      <p aria-live="polite" className="mt-4 text-sm text-slate-700">
        {status}
      </p>

      <button
        type="submit"
        className="mt-4 rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        Apply filters
      </button>
    </form>
  );
}