import dayjs from "dayjs";

export default {
  select: {
    title: "title",
    venue: "venue.",
    startTime: "startTime"
  },
  prepare({ title, startTime }) {
    return {
      title: title,
      subtitle: dayjs(startTime).format("MMM D @ h:mma")
    }
  }
}