import { describe, expect, it } from "vitest";

import generatedData from "../data/generated/synthetic-properties.json";
import invalidBadZip from "../data/fixtures/invalid-bad-zip.json";
import invalidMissingId from "../data/fixtures/invalid-missing-id.json";
import invalidNegativePrice from "../data/fixtures/invalid-negative-price.json";
import invalidUnknownField from "../data/fixtures/invalid-unknown-field.json";
import validListing from "../data/fixtures/valid-listing.json";
import { validateProperty } from "../src/validator/validateProperty";

describe("property data contract", () => {
  it("accepts one valid property listing", () => {
    const result = validateProperty(validListing);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("accepts all five generated seed records", () => {
    for (const record of generatedData.records) {
      const result = validateProperty(record);
      expect(result.isValid).toBe(true);
    }
  });

  it("rejects a listing with a missing property ID", () => {
    const result = validateProperty(invalidMissingId);

    expect(result.isValid).toBe(false);
    expect(result.errors.join(" ")).toContain("property_id");
  });

  it("rejects a listing with a negative price", () => {
    const result = validateProperty(invalidNegativePrice);

    expect(result.isValid).toBe(false);
    expect(result.errors.join(" ")).toContain("/price");
    expect(result.errors.join(" ")).toContain(">= 0");
  });

  it("rejects a listing with an invalid ZIP code", () => {
    const result = validateProperty(invalidBadZip);

    expect(result.isValid).toBe(false);
    expect(result.errors.join(" ")).toContain("/zip_code");
    expect(result.errors.join(" ")).toContain("pattern");
  });

  it("rejects a listing with an unknown field", () => {
    const result = validateProperty(invalidUnknownField);

    expect(result.isValid).toBe(false);
    expect(result.errors.join(" ")).toContain(
      "must NOT have additional properties",
    );
  });
});
