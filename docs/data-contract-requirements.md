# Lab 3 Data Contract Requirements

## Minimum Facts by Consumer

### Property Card

- property ID
- display title
- street address
- city
- state
- ZIP code
- price
- bedrooms
- bathrooms
- square feet
- image source
- image alternative text
- property details URL

### Property Detail Page

- all property-card fields
- amenities
- complete address
- associated local sponsors

### Sponsor Selection

- sponsor ID
- business name
- advertisement tier
- target URL
- property ID associated with the sponsor

### Voice Response

- property title
- city and state
- price
- bedrooms
- bathrooms
- square feet
- controlled amenity names
- sponsor business names

## Entity Boundaries

### Property

Represents a residential property listing and its physical, pricing, address, media, and amenity information.

**Primary key:** `property_id`, stored as a UUID string.

### Sponsor

Represents a fictional business that may appear with one or more property listings.

**Primary key:** `sponsor_id`, stored as a UUID string.

### PropertySponsor

Represents the relationship between a property and a sponsor. It stores placement information without making the sponsor part of the property’s identity.

**Composite key:** `property_id` and `sponsor_id`.

**Relationship:** A property may have multiple sponsors, and a sponsor may support multiple properties.

## Amenities Decision

Amenities will use a controlled uppercase enum array instead of free-text values.

Initial allowed values:

- `AIR_CONDITIONING`
- `CENTRAL_HEATING`
- `GARAGE_PARKING`
- `SWIMMING_POOL`
- `EV_CHARGING`
- `SOLAR_PANELS`

Controlled values prevent duplicates such as “A/C,” “AC,” and “Air Conditioning.” They also make filtering and voice responses more predictable.

## Synthetic Data Rule

All Lab 3 records will be fictional. No real client, customer, owner, tenant, or private personal information will be included in AI prompts, generated JSON, fixtures, tests, or commits.
