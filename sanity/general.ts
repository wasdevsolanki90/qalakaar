import { defineType, defineField } from "sanity";

export const general = defineType({
  name: "general",
  title: "General",
  type: "document",
  fields: [
    defineField({
        name: "type",
        title: "Image",
        type: "string",
    }),
    defineField({
        name: "position",
        title: "Position of image",
        type: "number",
    }),
    defineField({
        name: "mainHeading",
        title: "Main heading",
        type: "string",
    }),
    defineField({
        name: "text",
        title: "Text",
        type: "string",
    }),
    defineField({
      name: "image",
      title: "Home Page Image",
      type: "image",
    }),
    defineField({
      name: "stripTexts",
      title: "Strip Texts",
      type: "array",
      of: [
        {
          name: "striptext",
          title: "StripText",
          type: "string",
        },
      ],
    }),
  ],
});
