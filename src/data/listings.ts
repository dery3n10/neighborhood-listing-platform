import type { Property, Sponsor } from "@/types";

export const properties: Property[] = [
  {
    id: "property-1221-minorca",
    title: "Minorca Drive Residence",
    streetAddress: "1221 Minorca Dr",
    city: "Pacific Palisades",
    state: "CA",
    zipCode: "90272",
    price: 9999999,
    bedrooms: 6,
    bathrooms: 8.5,
    squareFootage: 8472,
    imageSrc: "/images/property-placeholder.svg",
    imageAlt:
      "Illustrated placeholder for the residence at 1221 Minorca Drive",
    detailsUrl:
      "https://www.realtor.com/realestateandhomes-detail/1221-Minorca-Dr_Pacific-Palisades_CA_90272_M26930-01342",
  },
  {
    id: "property-1492-paseo",
    title: "Paseo De Oro Residence",
    streetAddress: "1492 Paseo De Oro",
    city: "Pacific Palisades",
    state: "CA",
    zipCode: "90272",
    price: 1795000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFootage: 2952,
    imageSrc: "/images/property-placeholder.svg",
    imageAlt:
      "Illustrated placeholder for the residence at 1492 Paseo De Oro",
    detailsUrl:
      "https://www.realtor.com/realestateandhomes-detail/1492-Paseo-De-Oro_Pacific-Palisades_CA_90272_M12211-34305",
  },
  {
    id: "property-1550-amalfi",
    title: "Amalfi Drive Residence",
    streetAddress: "1550 Amalfi Dr",
    city: "Pacific Palisades",
    state: "CA",
    zipCode: "90272",
    price: 36995000,
    bedrooms: 8,
    bathrooms: 8.5,
    squareFootage: 16773,
    imageSrc: "/images/property-placeholder.svg",
    imageAlt:
      "Illustrated placeholder for the residence at 1550 Amalfi Drive",
    detailsUrl:
      "https://www.realtor.com/realestateandhomes-detail/1550-Amalfi-Dr_Pacific-Palisades_CA_90272_M11354-53513",
  },
];

export const sponsors: Sponsor[] = [
  {
    id: "sponsor-community-bank",
    businessName: "Community First Bank",
    imageSrc: "/images/sponsor-community-bank.svg",
    imageAlt: "Community First Bank sample sponsor graphic",
    websiteUrl: "https://example.com/community-first-bank",
  },
  {
    id: "sponsor-home-services",
    businessName: "Neighborhood Home Services",
    imageSrc: "/images/sponsor-home-services.svg",
    imageAlt: "Neighborhood Home Services sample sponsor graphic",
    websiteUrl: "https://example.com/neighborhood-home-services",
  },
];