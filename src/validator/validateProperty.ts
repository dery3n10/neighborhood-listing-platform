import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import type { ErrorObject } from "ajv";

import propertySchema from "../../schemas/property.schema.json";
import type { PropertyListing } from "../types/property-contract";

export type ValidationResult =
  | {
      isValid: true;
      data: PropertyListing;
      errors: [];
    }
  | {
      isValid: false;
      errors: string[];
    };

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
});

addFormats(ajv);

const validate = ajv.compile<PropertyListing>(propertySchema);

function formatError(error: ErrorObject): string {
  const path = error.instancePath || "/";
  return `${path}: ${error.message ?? "is invalid"}`;
}

export function validateProperty(data: unknown): ValidationResult {
  if (validate(data)) {
    return {
      isValid: true,
      data,
      errors: [],
    };
  }

  return {
    isValid: false,
    errors: (validate.errors ?? []).map(formatError),
  };
}
