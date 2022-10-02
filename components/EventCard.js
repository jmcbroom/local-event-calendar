import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import Link from "next/link";

const EventCard = ({ event, synopsis=true }) => {
  return (
    <div className="bg-gray-100 border-2 flex flex-col">
      <div className="p-2 md:p-4 bg-blue-50 flex items-start justify-between">
        <div className="flex flex-col">
          <Link href={`/event/${event.slug}`} passHref>
            <a className="text-xl font-semibold">{event.title}</a>
          </Link>
          <span>{dayjs(event.startTime).format("ddd MMM D, h:mma")}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-mono font-thin">{event.type}</span>
        </div>
      </div>

      {synopsis && <div className="p-2 md:py-4 md:px-6 flex-grow bg-white">
        <p>{event.synopsis}</p>
      </div>}

      {event.url && (
        <div className="p-2 md:p-4 bg-white">
          <a href={event.url} className="flex items-center gap-2 opacity-75 flex-grow-0">
            <FontAwesomeIcon icon={faLink} className="h-4" />
            <span>Event page</span>
          </a>
        </div>
      )}

      {event.venue && (
        <div className="p-2 md:p-4 bg-blue-50">
          <div className="flex items-top justify-between">
            <div className="flex flex-col">
              <Link href={`/venue/${event.venue.slug}`} passHref>
                <a className="text-md font-semibold">{event.venue?.name}</a>
              </Link>
              <span className="">{event.venue.address}</span>
            </div>
            <div className="flex flex-col items-start justify-start">
              <span>${event.price > 0 ? event.price.toFixed(2) : `free`}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
