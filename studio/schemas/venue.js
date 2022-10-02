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
    },
    {
      title: "Location",
      name: "location",
      description: "The venue location",
      type: "string",
      inputComponent: ShapeInput,
    },
  ],
};
