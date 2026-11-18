// Company legal identity — not translated.
export const companyAddress = {
  legalName: "Acquafy Corporation",
  line: "6314 Kingspointe Pkwy Ste 3, Orlando, FL 32819-6531, USA",
} as const;

/** The map opens on the building, not on a business: searching the suite ("Ste 3") makes Google Maps jump to another
 * company listed in it, so the search uses the street address only. */
const mapsQuery = "6314 Kingspointe Pkwy, Orlando, FL 32819, USA";

export const companyMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
