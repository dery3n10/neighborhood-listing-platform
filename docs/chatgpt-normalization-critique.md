# ChatGPT Normalization Critique

**Model:** ChatGPT  
**Date:** October 2, 2026

## Prompt

Review this data-modeling decision for a fictional neighborhood property listing platform.

The strict JSON contract stores each property with an embedded `local_sponsors` array. A separate conceptual `PropertySponsor` relationship also exists because one property may have multiple sponsors and one sponsor may support multiple properties.

Amenities currently use a controlled enum array:

- `AIR_CONDITIONING`
- `CENTRAL_HEATING`
- `GARAGE_PARKING`
- `SWIMMING_POOL`
- `EV_CHARGING`
- `SOLAR_PANELS`

Please critique the normalization design. Address sponsor anomalies, join tables, amenity-storage choices, and the best practical approach for a small course application compared with a production relational database.

## ChatGPT Response

Embedding `local_sponsors` creates a useful read model for the interface, but it should not be treated as the normalized source of sponsor information.

If the same sponsor appears inside several property records, changes to its name, tier, or target URL must be repeated. Missing one copy creates inconsistent data. Deleting the last property containing a sponsor can also remove the only stored copy of that sponsor.

A production relational design should use:

- A `Property` table with `property_id` as its primary key
- A `Sponsor` table with `sponsor_id` as its primary key
- A `PropertySponsor` join table containing `property_id` and `sponsor_id`

The join table can also store relationship-specific information, such as placement order, campaign dates, or the sponsor tier used for a specific property.

Free-text amenities should not be used because spelling and capitalization differences make filtering unreliable.

A controlled enum array is a reasonable choice for the course application because:

- The amenity list is small
- The allowed values are stable
- JSON validation remains simple
- The interface and voice response receive predictable values

The main disadvantage is that adding an amenity requires a schema update.

Separate `Amenity` and `PropertyAmenity` tables are more appropriate when amenities change often, need display names or icons, require translations, or contain additional attributes.

For the course application, the best choice is to keep the controlled amenity array and include sponsor projections inside each validated property response. The conceptual model should still separate sponsors and the many-to-many relationship.

For a production system, the normalized database should store sponsors and relationships separately. The application can then create a denormalized property response containing embedded sponsor information for efficient interface and voice-assistant use.

## Useful Output

The useful recommendation was to separate the normalized storage model from the interface response model. The database can remain normalized while the API returns a convenient validated projection.

## Decision

The project will use JSON Schema Draft 2020-12 with Ajv as the runtime validation source. Amenities will remain controlled enum values for the course application. Sponsor information may appear as an embedded projection in validated property JSON, while the architectural model recognizes separate `Sponsor` and `PropertySponsor` entities.
