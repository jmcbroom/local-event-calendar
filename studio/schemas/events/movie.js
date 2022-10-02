import eventFields from "./eventFields";

export default {
  title: "Movie",
  name: "movie",
  type: "document",
  fields: [
    ...eventFields,
    {
      title: "IMDB page",
      name: "imdbPage",
      description: "IMDB page for this movie",
      type: "url"
    },
    {
      title: "Recurrences",
      name: "recurrences",
      description: "Recurring times for this event",
      type: "array",
      of: [{type: "datetime"}]
    }
  ],
};
