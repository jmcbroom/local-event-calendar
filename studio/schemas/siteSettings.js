export default {
  title: "Sitewide Settings",
  name: "siteSettings",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "siteTitle",
      description: "The name of the site",
      type: "string",
    },
    {
      title: "URL",
      name: "siteUrl",
      description: "The production URL of the site",
      type: "url"
    },
    {
      title: "Geographic Area",
      name: "geographicArea",
      description: "Your area of coverage. Ex: `Coachella Valley`, `Detroit`",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      description: "A brief tagline for the site",
      type: "string",
    },
    {
      title: "Organization",
      name: "organization",
      description: "The name of your organization",
      type: "string",
    },
    {
      title: "Netlify webhook URL",
      name: "webhookUrl",
      description: "The Netlify webhook URL",
      type: "url"
    },
    {
      title: "Bounding box",
      name: "bbox",
      description: "The bounding box for your area of interest",
      type: "string",
    },
  ],
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'], 
};
