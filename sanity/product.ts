import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "slug", 
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[^\w-]+/g, "") // Remove all non-alphanumeric characters except hyphens
            .slice(0, 200), // Ensure the slug length is within the maxLength
      },
    }),
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
    }),
    defineField({
      name: "about",
      title: "Product About",
      type: "string",
    }),
    defineField({
      name: "backDesign",
      title: "Back Design",
      type: "string",
    }),
    defineField({
      name: "frontDesign",
      title: "Front Design",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "array",
      of: [
        {
          name: "description",
          title: "Description",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "type",
      title: "Product Type",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Product Price",
      type: "number",
    }),
    defineField({
      name: "price_usd",
      title: "Price (USD)",
      type: "number",
    }),
    defineField({
      name: "price_uae",
      title: "Price (UAE)",
      type: "number",
    }),
    defineField({
      name: "sizes",
      title: "Product Size",
      type: "array",
      of: [
        {
          name: "size",
          title: "Size",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "colors",
      title: "Product Colors",
      type: "array",
      of: [
        {
          name: "color",
          title: "Color",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "careTips",
      title: "Product Care",
      type: "array",
      of: [
        {
          name: "care",
          title: "Care",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          name: "image",
          title: "Product Image",
          type: "image",
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
    }),
    defineField({
      name: "alt",
      title: "Product Image Text",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [
        {
          type: "category",
        },
      ],
    }),
    defineField({
      name: "is_main",
      title: "Is Main",
      type: "boolean",
    }),
    defineField({
      name: "is_new_release",
      title: "Is New Release",
      type: "boolean",
    }),
    defineField({
      name: "is_best_seller",
      title: "Is Best Seller",
      type: "boolean",
    }),
    defineField({
      name: "is_premium_tee",
      title: "Is Premium Tee",
      type: "boolean",
    }),
    defineField({
      name: "is_standard_tee",
      title: "Is Standard Tee",
      type: "boolean",
    }),
    defineField({
      name: "is_featured",
      title: "Is Fetaured",
      type: "boolean",
    }),
    defineField({
      name: "size",
      title: "Size chart (size)",
      type: "array",
      of: [
        {
          name: "size",
          title: "Size",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "length",
      title: "Size chart (length)",
      type: "array",
      of: [
        {
          name: "length",
          title: "Length",
          type: "number",
        },
      ],
    }),
    defineField({
      name: "chest",
      title: "Size chart (chest)",
      type: "array",
      of: [
        {
          name: "chest",
          title: "Chest",
          type: "number",
        },
      ],
    }),
    defineField({
      name: "sleeve",
      title: "Size chart (sleeve)",
      type: "array",
      of: [
        {
          name: "sleeve",
          title: "Sleeve",
          type: "number",
        },
      ],
    }),
  ],
});
