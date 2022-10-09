import ShapeInput from "../components/ShapeInput";

export default {
  title: "Venue",
  name: "venue",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      description: "The name of the venue",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      description: "The venue slug, used in URLs",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Description",
      name: "description",
      description: "A description of the venue",
      type: "blockContent"
    },
    {
      title: "Website",
      name: "website",
      description: "The URL for this venue",
      type: "url",
    },
    {
      title: "Address",
      name: "address",
      description: "The venue's address",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      title: "City",
      name: "city",
      description: "The venue's city",
      type: "string",
      options: {
        layout: "dropdown",
        list: [
          "Detroit",
          "Windsor",
          "Hamtramck",
          "Highland Park",
          "Ferndale",
          "Dearborn",
          "Hazel Park",
          "Grosse Pointe Park",
          "Oak Park",
          "Berkley",
          "Royal Oak",
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Type",
      name: "type",
      description: "The venue type",
      type: "string",
      options: {
        layout: "dropdown",
        list: [
          "theater",
          "arena",
          "music",
          "park",
          "church",
          "cafe"
        ],
      },
    },
    {
      title: "Location",
      name: "location",
      description: "The venue location",
      type: "string",
      inputComponent: ShapeInput,
    },
  ],
  preview: {
    select: {
      name: "name",
      address: "address",
      city: "city"
    },
    prepare({ name, address, city }) {
      return {
        title: name,
        subtitle: `${address}, ${city}`
      }
    }
  }
};
