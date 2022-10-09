import eventFields from "./eventFields";
import eventPreview from "./eventPreview";

export default {
  title: "Event",
  name: "event",
  type: "document",
  fields: [
    ...eventFields
  ],
  preview: eventPreview
};
