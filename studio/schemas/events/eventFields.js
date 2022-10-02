import dayjs from "dayjs";

export default [
  {
    title: "Title",
    name: "title",
    description: "The title of the event",
    type: "string",
    validation: Rule => Rule.required()
  },
  {
    title: "Venue",
    name: "venue",
    description: "The venue where the event is taking place",
    type: "reference",
    to: [{type: 'venue'}]
  },
  {
    title: "Start time",
    name: "startTime",
    description: "The start time of the event",
    type: "datetime",
    validation: Rule => Rule.required()
  },
  {
    title: "End time",
    name: "endTime",
    description: "The end time of the event",
    type: "datetime"
  },
  {
    title: "Slug",
    name: "slug",
    description: "The event slug name",
    type: "slug",
    options: {
      source: (doc) => `${doc.title}-${dayjs(doc.startTime).format('YYYY-MM-DD')}`,
      maxLength: 96,
    },
  },
  {
    title: "Link",
    name: "eventLink",
    description: "URL for the event",
    type: "url"
  },
  {
    title: "Synopsis",
    name: "synopsis",
    description: "Short rich-text event description",
    type: "text",
    validation: Rule => Rule.max(280)
  },
  {
    title: "Description",
    name: "description",
    description: "Extended rich-text event description",
    type: "blockContent"
  },
  {
    title: "Ticket link",
    name: "ticketLink",
    description: "Link where tickets may be purchased",
    type: "url"
  },
  {
    title: "Price",
    name: "price",
    description: "The cost of the event",
    type: "number"
  },
  {
    title: "Media",
    name: "media",
    description: "Any media/picture associated with the event",
    type: "array",
    of: [{type: "image"}]
  }
]