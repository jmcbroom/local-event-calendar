import dayjs from "dayjs";

export const eventInRange = (startDate, endDate, event) => {
  if (
    dayjs(event.startTime) > dayjs(startDate) &&
    dayjs(event.startTime) < dayjs(endDate)
  ) {
    return true;
  } else {
    return false;
  }
}