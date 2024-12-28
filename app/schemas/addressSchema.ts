import { z } from "zod";

import { municipalityTypes } from "../utils/enumMap";

// Zod schema for Country
export const countrySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Country name is required")
    .max(255, "Country name must be less than 255 characters"),
  twoLetterIsoCode: z
    .string()
    .length(2, "Two-letter ISO code must be exactly 2 characters"),
  threeLetterIsoCode: z
    .string()
    .length(3, "Three-letter ISO code must be exactly 3 characters")
    .optional(),
  numericIsoCode: z
    .string()
    .length(3, "Numeric ISO code must be exactly 3 digits")
    .optional(),
  callingCode: z.string().optional(),
  published: z.boolean().optional().default(true),
});

// Zod schema for StateProvince
export const stateProvinceSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "State/Province name is required")
    .max(255, "State/Province name must be less than 255 characters"),
  countryId: z.string(),
  abbreviation: z
    .string()
    .max(10, "Abbreviation must be less than 10 characters")
    .optional(),
  published: z.boolean().default(true),
});

// Zod schema for District
export const districtSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "District name is required")
    .max(255, "District name must be less than 255 characters"),
  stateProvinceId: z.string(),
  published: z.boolean().optional().default(true),
});

// Zod schema for Municipality

export const municipalitySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Municipality name is required")
    .max(255, "Municipality name must be less than 255 characters"),
  districtId: z.string(),
  type: z.enum(municipalityTypes, {
    errorMap: (issue) => {
      return {
        message: `${issue.message} must be one of: metropolitan, sub_metropolitan, municipality, rural_municipality`,
      };
    },
  }),
  wards: z.array(z.number()).min(1, "At least one ward is required"),
  published: z.boolean().optional().default(true),
});

export type CountrySchema = z.infer<typeof countrySchema>;
export type StateProvinceSchema = z.infer<typeof stateProvinceSchema>;
export type DistrictSchema = z.infer<typeof districtSchema>;
export type MunicipalitySchema = z.infer<typeof municipalitySchema>;
