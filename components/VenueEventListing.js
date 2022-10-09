import { faCalendarTimes } from "@fortawesome/free-regular-svg-icons";
import {
  faCompactDisc,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Link from "next/link";

const eventTypeIcons = {
  music: faCompactDisc,
  movie: faVideo,
  event: faCalendarTimes,
};

const VenueEventListing = ({ event }) => {
  return (
    <li className="border-b-2 py-2">
      <div className="flex flex-col">
        <span className="m-0 text-gray-800 font-semibold block py-2 text-sm">
          {dayjs(event.startTime).format("dddd, MMMM D")}
        </span>
        <div className="p-2 md:px-4 md:p-200 bg-event mb-2">
          <h3 className="m-0">
            <Link href={`/event/${event.slug}`} passHref>
              <a className="text-base font-bold">{event.title}</a>
            </Link>
          </h3>
          <span className="block text-sm font-bold">{dayjs(event.startTime).format("h:mma")}</span>
          {event.synopsis && <p className="text-sm">{event.synopsis}</p>}
          <span className="block text-sm font-medium items-center">
            {event.ticketLink ? (
              <a href={event.ticketLink}>
                {event.price > 0 ? `$${event.price.toFixed(2)}` : `free`}
              </a>
            ) : event.price > 0 ? (
              event.price.toFixed(2)
            ) : (
              `free`
            )}
          </span>
        </div>
      </div>
    </li>
  );
};

export default VenueEventListing;
