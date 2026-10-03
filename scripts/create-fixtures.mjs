import fs from "node:fs";

const generated = JSON.parse(
  fs.readFileSync("data/generated/synthetic-properties.json", "utf8"),
);

const validListing = generated.records[0];

function saveFixture(filename, data) {
  fs.writeFileSync(
    `data/fixtures/${filename}`,
    `${JSON.stringify(data, null, 2)}\n`,
  );
}

saveFixture("valid-listing.json", validListing);

const missingId = structuredClone(validListing);
delete missingId.property_id;
saveFixture("invalid-missing-id.json", missingId);

const negativePrice = {
  ...structuredClone(validListing),
  price: -250000,
};
saveFixture("invalid-negative-price.json", negativePrice);

const badZip = {
  ...structuredClone(validListing),
  zip_code: "9210",
};
saveFixture("invalid-bad-zip.json", badZip);

const unknownField = {
  ...structuredClone(validListing),
  hoa_dues: 450,
};
saveFixture("invalid-unknown-field.json", unknownField);

console.log("Created one valid fixture and four invalid fixtures.");
