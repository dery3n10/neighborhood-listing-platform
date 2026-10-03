import generatedData from "../../data/generated/synthetic-properties.json";
import type { Property } from "../types";
import { validateProperty } from "../validator/validateProperty";

export const validationErrors: string[] = [];
export const validatedProperties: Property[] = [];

for (const [index, rawRecord] of generatedData.records.entries()) {
  const result = validateProperty(rawRecord);

  if (!result.isValid) {
    validationErrors.push(
      `Record ${index + 1}: ${result.errors.join("; ")}`,
    );
    continue;
  }

  const listing = result.data;

  validatedProperties.push({
    id: listing.property_id,
    title: listing.title,
    streetAddress: listing.address.street,
    city: listing.address.city,
    state: listing.address.state,
    zipCode: listing.zip_code,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    squareFootage: listing.square_feet,
    imageSrc: "/images/property-placeholder.svg",
    imageAlt: listing.image_alt,
    detailsUrl: listing.details_url,
  });
}
