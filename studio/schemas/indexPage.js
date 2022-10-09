export default {
  title: "Index page",
  name: "indexPage",
  type: "document",
  fields: [
    {
      title: "Index page content",
      name: "indexPageContent",
      description: "The index page content",
      type: "blockContent",
    }
  ],
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'], 
};
