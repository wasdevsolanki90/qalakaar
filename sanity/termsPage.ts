import { defineType, defineField } from "sanity";

export const termsPage = defineType({
  name: "termsPage",
  type: "document",
  title: "Terms Page",
  fields: [
    defineField({
      name: "mainHeading",
      title: "Main Heading",
      type: "string",
    }),
    defineField({
      name: "lastUpdateddate",
      title: "Last updated Date for terms and conditions page",
      type: "date",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          name: "section",
          title: "Section",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [
                {
                  type: "block",
                  title: "Block Content",
                },
                {
                  type: "object",
                  name: "listItem",
                  title: "List Item",
                  fields: [
                    defineField({
                      name: "text",
                      title: "Text",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
