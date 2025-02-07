import { defineType, defineField } from "sanity";

export const shippingPolicyPage = defineType({
  name: "shippingPolicyPage",
  title: "Shipping Policy Page",
  type: "document",
  fields: [
    defineField({
      name: "mainHeading",
      title: "Main Heading",
      type: "string",
    }),
    defineField({
      name: "effectiveDate",
      title: "Effective Date",
      type: "date",
      description: "The date the policy becomes effective.",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      description: "A brief introduction to the policy.",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "The sections of the policy.",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "The title of the section.",
            }),
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
    
    defineField({
      name: "closingNote",
      title: "Closing Note",
      type: "text",
      description: "A closing note for the policy.",
    }),
  ],
});
