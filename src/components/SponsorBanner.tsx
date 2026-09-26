import Image from "next/image";
import type { Sponsor } from "@/types";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({
  sponsor,
}: SponsorBannerProps) {
  return (
    <aside
      aria-label={`Sponsored message from ${sponsor.businessName}`}
      className="flex flex-col items-start gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:flex-row sm:items-center"
    >
      <Image
        src={sponsor.imageSrc}
        alt={sponsor.imageAlt}
        width={96}
        height={96}
        className="h-20 w-20 rounded-xl object-cover"
      />

      <div className="flex-1">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-800">
          Sponsored
        </p>

        <p className="mt-1 text-lg font-semibold text-slate-950">
          {sponsor.businessName}
        </p>
      </div>

      <a
        href={sponsor.websiteUrl}
        className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
      >
        Visit {sponsor.businessName}
      </a>
    </aside>
  );
}