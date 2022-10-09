import eventFields from "./eventFields";
import eventPreview from "./eventPreview";

export default {
  title: "Music",
  name: "music",
  type: "document",
  fields: [
    ...eventFields,
    {
      title: "Spotify link",
      name: "spotifyLink",
      description: "Spotify link for this artist",
      type: "url"
    },
  ],
  preview: eventPreview
};
