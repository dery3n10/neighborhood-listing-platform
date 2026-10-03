# ADR 001: Property Data Contract and Runtime Validation

- **Status:** Accepted
- **Date:** October 2, 2026
- **Decision owners:** Neighborhood Listing Platform project team

## Context

The neighborhood listing platform receives property information from external sources, including AI-generated JSON. TypeScript types can identify mistakes during development, but they are erased when the application becomes JavaScript. Therefore, TypeScript alone cannot confirm that incoming runtime data is safe.

The application needs a strict data contract for property cards, property details, sponsor selection, and voice responses.

The model must represent three concepts:

- `Property`
- `Sponsor`
- `PropertySponsor`

A property may have multiple sponsors, and a sponsor may support multiple properties. This creates a many-to-many relationship.

The application also needs consistent amenity values. Free-text values such as “AC,” “A/C,” and “Air Conditioning” would make searching, filtering, and voice responses unreliable.

Google AI Studio supports only part of the complete JSON Schema specification. The local validator must therefore enforce stricter rules than the AI-generation interface.

## Decision

The project will use JSON Schema Draft 2020-12 as the authoritative runtime data contract.

The strict schema is stored in:

`schemas/property.schema.json`

The application will validate incoming property records with Ajv and `ajv-formats`.

The validator will use:

- `allErrors: true`
- `strict: true`
- UUID format validation
- URI format validation
- Required fields
- Minimum numeric values
- ZIP-code and state patterns
- Controlled amenity values
- `additionalProperties: false`

The runtime validator is stored in:

`src/validator/validateProperty.ts`

TypeScript’s `PropertyListing` interface will be generated from the JSON Schema with `json-schema-to-typescript`. The generated type is stored in:

`src/types/property-contract.ts`

This approach keeps the runtime schema as the main source of truth while providing compile-time TypeScript support.

## AI Studio Compatibility

The project will maintain a separate AI-generation schema:

`schemas/property-generation.schema.json`

This schema represents the structured five-record response used by Google AI Studio.

Google AI Studio rejected the `additionalProperties` keyword. That keyword was removed only from the generation schema.

The strict local schema keeps `additionalProperties: false`, so unexpected fields are still rejected before the application uses the data.

## Entity and Relationship Decision

The conceptual domain model separates:

- `Property`, identified by `property_id`
- `Sponsor`, identified by `sponsor_id`
- `PropertySponsor`, identified by the combination of `property_id` and `sponsor_id`

For the course application, validated property JSON may contain an embedded `local_sponsors` array. This is treated as a convenient response projection for the interface and voice features, not as the ideal normalized database structure.

A production relational database should store sponsors separately and use a `PropertySponsor` join table. The application could then build a validated property response containing the related sponsor information.

## Amenities Decision

Amenities will use a controlled uppercase enum array.

The initial allowed values are:

- `AIR_CONDITIONING`
- `CENTRAL_HEATING`
- `GARAGE_PARKING`
- `SWIMMING_POOL`
- `EV_CHARGING`
- `SOLAR_PANELS`

Free-text amenities are rejected because spelling, capitalization, and abbreviation differences would reduce data quality.

The controlled array is appropriate for the course application because the list is small and stable.

A production database may use separate `Amenity` and `PropertyAmenity` tables if amenities need:

- Administrative editing
- Icons
- Translations
- Descriptions
- Categories
- Additional metadata

## Boundary Validation

All external property records are treated as `unknown` until they pass `validateProperty`.

Valid records are converted into the camelCase `Property` shape used by the Week 2 components.

Invalid records are:

- Excluded from the displayed property list
- Recorded as validation errors
- Prevented from reaching `PropertyCard`
- Handled without crashing the page

If any records are rejected, the page displays an accessible warning message.

## Alternatives Considered

### TypeScript Interfaces Only

This option was rejected because TypeScript types are erased at runtime. An API response or JSON file can contain invalid data even when a type assertion allows the code to compile.

### Zod as the Single Source of Truth

Zod was considered because it can provide runtime validation and inferred TypeScript types.

It was not selected as the primary source because the assignment specifically focuses on JSON Schema, structured AI output, and standards-based Ajv validation.

### Free-Text Amenities

This option was rejected because it creates duplicate and inconsistent values.

### Fully Normalized Sponsors in Every Layer

A fully normalized relational design is appropriate for production storage. It was not used as the only interface format because property cards and voice responses benefit from a complete validated projection.

### Trusting AI Studio Structured Output Without Local Validation

This option was rejected because structured output support is limited and AI-generated data must still be treated as untrusted external input.

## Consequences

### Positive Consequences

- Invalid external data is rejected before reaching the interface.
- All five synthetic seed records can be validated locally.
- Unknown fields are rejected.
- TypeScript types can be regenerated from the authoritative schema.
- Controlled amenities support predictable filtering and voice responses.
- Validation failures produce descriptive error messages.
- The interface fails safely instead of crashing.

### Negative Consequences

- The project maintains both a strict local schema and a reduced AI Studio generation schema.
- The TypeScript contract must be regenerated after schema changes.
- Adding a new controlled amenity requires a schema and application update.
- Embedded sponsor projections duplicate some sponsor information.
- The adapter must convert snake_case contract fields into camelCase interface fields.

## Verification

The decision is verified by:

- One valid fixture
- Four required invalid fixtures
- Six passing Vitest tests
- Validation of all five generated seed records
- Successful lint and production builds
- Visual confirmation that five validated records render through `PropertyCard`

## AI Review

ChatGPT and Gemini both identified possible update, insertion, and deletion anomalies when sponsors are embedded in multiple property records.

Both reviews recommended normalized sponsor storage for a production relational database and agreed that controlled amenity values are practical for the current course application.
