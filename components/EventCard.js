import { faCalendarTimes } from "@fortawesome/free-regular-svg-icons";
import { faCompactDisc, faExternalLinkAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import Link from "next/link";

const eventTypeIcons = {
  music: faCompactDisc,
  movie: faVideo,
  event: faCalendarTimes,
};

const EventTicketPrice = ({ event }) => {
  if (event.price === 0 || !event.price) {
    return <span>free</span>;
  }

  if (event.ticketLink) {
    return (
      <>
        <span className="flex items-center gap-1">
          Cost:{` `}
          <a href={event.ticketLink} target="_blank" rel="noreferrer">
            <span className="flex items-center gap-1">
              ${event.price.toFixed(2)}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="h-2" />
            </span>
          </a>
        </span>
      </>
    );
  } else {
    return <span>Cost: {` $${event.price.toFixed(2)}`}</span>;
  }
};

const EventCard = ({ event, showDate=true }) => {
  return (
    <li className="list-none">
      <div className="flex flex-col">
        {showDate && <div className="flex items-center gap-2 text-sm text-gray-600 w-auto pb-1">
          <span className="font-medium">{dayjs(event.startTime).format("dddd, MMMM D")}</span>
        </div>}
        <div className="p-3 md:p-4 md:p-200 bg-event bg-opacity-50">
          <h3 className="m-0">
            <Link href={`/event/${event.slug}`} passHref>
              <a className="font-bold text-lg">{event.title}</a>
            </Link>
          </h3>
          <span className="text-sm font-medium block">
            {dayjs(event.startTime).format("h:mma")}
          </span>
          {event.synopsis && (
            <span className="text-sm md:text-base block py-2 md:py-4">{event.synopsis}</span>
          )}
          {/* <div className="">
            <EventTicketPrice {...{event}}/>
          </div> */}
          <div className="pt-2 text-sm grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-0">
            <EventTicketPrice {...{ event }} />
            {event.eventLink && <a href={event.eventLink} target="_blank" rel="noreferrer">
              <span className="flex items-center gap-1">
                Event link
                <FontAwesomeIcon icon={faExternalLinkAlt} className="h-2" />
              </span>
            </a>}
          </div>
        </div>
        {event.venue && (
          <div className="flex items-center p-2 md:px-4 text-sm bg-venue bg-opacity-50">
            <span className="m-0 text-gray-500 mr-1">at{` `}</span>
            <Link href={`/venue/${event.venue.slug}`} passHref>
              <a className="font-medium">{event.venue?.name}</a>
            </Link>
          </div>
        )}
      </div>
    </li>
  );
};

export default EventCard;
