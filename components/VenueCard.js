import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import Link from "next/link";
import PortableText from "react-portable-text";

const VenueCard = ({ venue }) => {
  return (
    <div className="bg-gray-100 border-2 flex flex-col">
      <div className="p-2 md:p-4 bg-blue-50 flex items-start justify-between">
        <div className="flex flex-col">
          <Link href={`/venue/${venue.slug.current}`} passHref>
            <a className="text-xl font-semibold">{venue.name}</a>
          </Link>
        </div>
      </div>

      <div className="p-2 md:py-2 md:px-6 flex-grow bg-white">
        {venue.description && <PortableText content={venue.description} />}
      </div>

      {venue.nextEvent && (
        <>
          <span className="px-2 md:px-6 text-sm bg-white text-gray-500 py-1">Next event:</span>
          <div className="px-2 md:px-6 py-2">
            <div className="flex items-top justify-between">
              <div className="flex flex-col">
                <Link href={`/event/${venue.nextEvent.slug}`} passHref>
                  <a className="text-md font-semibold">{venue.nextEvent.title}</a>
                </Link>
                <span>{dayjs(venue.nextEvent.startTime).format("ddd, MMM DD")}</span>
              </div>
              <div className="flex flex-col items-start justify-start">
                <span>
                  ${venue.nextEvent.price > 0 ? venue.nextEvent.price.toFixed(2) : `free`}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {event.venue && (
      )} */}
    </div>
  );
};

export default VenueCard;
