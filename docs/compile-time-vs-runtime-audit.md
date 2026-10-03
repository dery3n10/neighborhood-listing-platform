# Compile-Time Types vs. Runtime Validation — Applied Code Audit

## 1. Conceptual Distinction

A TypeScript compile-time type helps the developer identify mistakes while writing and building the application. However, TypeScript types are removed when the code is converted into JavaScript. This is called **type erasure**.

Because of type erasure, a TypeScript interface cannot inspect an API response, form submission, JSON file, or webhook payload while the application is running.

Runtime validation checks the actual incoming value. In this project, Ajv compares unknown data with the strict JSON Schema before the application is allowed to use it.

In simple terms:

- TypeScript checks what the code claims the data will look like.
- Runtime validation checks what the data actually looks like.

Both are needed because outside data can be incorrect even when the TypeScript code compiles successfully.

## 2. Project Interface

The following interface is generated from `schemas/property.schema.json` and stored in `src/types/property-contract.ts`:

```ts
export interface PropertyListing {
  property_id: string;
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  amenities: (
    | "AIR_CONDITIONING"
    | "CENTRAL_HEATING"
    | "GARAGE_PARKING"
    | "SWIMMING_POOL"
    | "EV_CHARGING"
    | "SOLAR_PANELS"
  )[];
  image_src: string;
  image_alt: string;
  details_url: string;
  local_sponsors: {
    sponsor_id: string;
    business_name: string;
    tier: "standard" | "premium" | "exclusive";
    target_url: string;
  }[];
}
```

This interface improves compile-time safety, but it does not validate incoming JSON at runtime.

## 3. Unsafe Type Assertion

The following code compiles because the programmer forces the external value to be treated as a `PropertyListing`:

```ts
import type { PropertyListing } from "./types/property-contract";

const rawResponse = await fetch("/api/property");
const externalInput: unknown = await rawResponse.json();

const listing = externalInput as PropertyListing;

console.log(`Price: $${listing.price.toFixed(2)}`);
console.log(
  `Amenities: ${listing.amenities.map((amenity) => amenity.toLowerCase()).join(", ")}`,
);
```

The `as PropertyListing` assertion does not inspect or change the runtime value. It only tells the TypeScript compiler to trust the programmer.

Therefore, this code can compile cleanly even when the server sends invalid data.

## 4. Faulty Payload A — Runtime Type Mismatch

This payload contains `"price": "850000"` as a string instead of a number:

```json
{
  "property_id": "123e4567-e89b-12d3-a456-426614174001",
  "title": "Sunny San Diego Cottage",
  "address": {
    "street": "123 Ocean Breeze Way",
    "city": "San Diego",
    "state": "CA"
  },
  "zip_code": "92109",
  "price": "850000",
  "bedrooms": 3,
  "bathrooms": 2,
  "square_feet": 1500,
  "amenities": [
    "AIR_CONDITIONING",
    "SWIMMING_POOL"
  ],
  "image_src": "https://example.com/images/prop1.jpg",
  "image_alt": "Front view of the fictional San Diego cottage",
  "details_url": "https://example.com/properties/prop1",
  "local_sponsors": [
    {
      "sponsor_id": "987e4567-e89b-12d3-a456-426614174001",
      "business_name": "Fictional Coastal Home Services",
      "tier": "standard",
      "target_url": "https://example.com/sponsors/coastal-home"
    }
  ]
}
```

If the payload is forced into the interface with `as PropertyListing`, TypeScript accepts the assertion.

However, this line fails while the program is running:

```ts
listing.price.toFixed(2);
```

The application attempts to call the number method `.toFixed()` on a string. This causes an unhandled runtime error.

The Ajv validator rejects this payload because `/price` must be a number.

## 5. Faulty Payload B — Business Invariant Violation

This payload uses the correct primitive types, but the price is negative:

```json
{
  "property_id": "123e4567-e89b-12d3-a456-426614174002",
  "title": "Fictional Long Beach Home",
  "address": {
    "street": "456 Harbor Example Avenue",
    "city": "Long Beach",
    "state": "CA"
  },
  "zip_code": "90802",
  "price": -450000,
  "bedrooms": 3,
  "bathrooms": 2,
  "square_feet": 1600,
  "amenities": [
    "CENTRAL_HEATING",
    "GARAGE_PARKING"
  ],
  "image_src": "https://example.com/images/prop2.jpg",
  "image_alt": "Front view of a fictional Long Beach home",
  "details_url": "https://example.com/properties/prop2",
  "local_sponsors": [
    {
      "sponsor_id": "987e4567-e89b-12d3-a456-426614174002",
      "business_name": "Fictional Harbor Repair",
      "tier": "premium",
      "target_url": "https://example.com/sponsors/harbor-repair"
    }
  ]
}
```

Every primitive type matches the TypeScript interface:

- `price` is a number
- `bedrooms` is a number
- `zip_code` is a string
- URLs are strings
- Amenities are strings from the allowed list

TypeScript does not know that a listing price must be nonnegative. Therefore, the value can pass a compile-time type check and still represent an invalid business state.

If this value were saved without runtime validation, it could corrupt the database and cause the interface to display a negative property price.

The Ajv schema rejects the payload because `/price` must be greater than or equal to zero.

## 6. Boundary Defense

The project validates unknown input before performing calculations, displaying the record, or saving it.

```ts
import { validateProperty } from "./validator/validateProperty";

export function processExternalProperty(input: unknown) {
  const result = validateProperty(input);

  if (!result.isValid) {
    console.error("Property payload rejected:", result.errors);

    return {
      accepted: false,
      errors: result.errors,
    };
  }

  const listing = result.data;

  return {
    accepted: true,
    formattedPrice: `$${listing.price.toFixed(2)}`,
    amenityNames: listing.amenities.map((amenity) =>
      amenity.toLowerCase(),
    ),
  };
}
```

The input remains `unknown` until `validateProperty` succeeds.

If either faulty payload is submitted:

- Payload A is rejected because `price` is a string.
- Payload B is rejected because `price` is below the allowed minimum.
- Execution stops before `.toFixed()` is called.
- The invalid data is not sent to the interface or database.

## 7. Actual Project Validator

The project’s validator is stored in `src/validator/validateProperty.ts`.

It compiles the Draft 2020-12 schema with Ajv, enables all validation errors, adds UUID and URI format support, and returns either validated `PropertyListing` data or a list of errors.

The project also includes automated tests proving that the validator rejects:

- A missing property ID
- A negative price
- An invalid ZIP code
- An unknown property field

It also proves that one valid fixture and all five generated seed records pass.

## Conclusion

A TypeScript assertion can make unsafe data appear valid to the compiler, but it cannot change or inspect the real runtime value.

Runtime validation is the boundary defense that protects the application. In this project, the JSON Schema and Ajv validator prevent incorrect types and invalid business values from reaching the property cards or future database operations.
