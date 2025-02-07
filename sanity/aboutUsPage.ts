import { defineType, defineField } from "sanity";

export const aboutUsPage = defineType({
  name: "aboutUsPage",
  type: "document",
  title: "About us Page",
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
    defineField({
      name: "subHeading1",
      title: "Sub Heading 1",
      type: "string",
    }),
    defineField({
      name: "text1",
      title: "Text 1",
      type: "string",
    }),
    defineField({
      name: "subHeading2",
      title: "Sub Heading 2",
      type: "string",
    }),
    defineField({
      name: "text2",
      title: "Text 2",
      type: "string",
    }),
    defineField({
      name: "subHeading3",
      title: "Sub Heading 3",
      type: "string",
    }),
    defineField({
      name: "standForPoints",
      title: "Stand For Points",
      type: "array",
      of: [
        {
          name: "point",
          title: "Point",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "subHeading4",
      title: "Sub Heading 4",
      type: "string",
    }),
    defineField({
      name: "text4",
      title: "Text 4",
      type: "string",
    }),
    defineField({
      name: "subHeading5",
      title: "Sub Heading 5",
      type: "string",
    }),
    defineField({
      name: "text5",
      title: "Text 5",
      type: "string",
    }),
    defineField({
      name: "subHeading6",
      title: "Sub Heading 6",
      type: "string",
    }),
    defineField({
      name: "text6",
      title: "Text 6",
      type: "string",
    }),defineField({
      name: "text7",
      title: "Text 7",
      type: "string",
    }),
    defineField({
      name: "subHeading7",
      title: "Sub Heading 7",
      type: "string",
    }),
  ],
});
