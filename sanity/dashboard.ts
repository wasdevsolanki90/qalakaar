import { defineType, defineField } from "sanity";

export const dashboard = defineType({
  name: "dashboard",
  type: "document",
  title: "User Dashboard",
  fields: [
    defineField({
      name: "mainHeading",
      title: "Main Heading",
      type: "string",
    }),
    defineField({
      name: "mainText",
      title: "Main Text",
      type: "string",
    }),
  ],
});
