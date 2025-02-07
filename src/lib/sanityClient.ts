import { createClient } from "next-sanity";

// import { apiVersion, dataset, projectId, useCdn } from "../../../sanity/env";

export const client = createClient({
  token: process.env.SANITY_ACCESS_TOKENS,
  apiVersion: "2023-06-24",
  dataset: "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
});
