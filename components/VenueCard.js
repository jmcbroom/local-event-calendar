import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import Link from "next/link";
import PortableText from "react-portable-text";

const VenueCard = ({ venue }) => {
  return (
    <li className="list-none">
      <div className="p-3 md:p-4 md:p-200 bg-venue bg-opacity-50">
        <h3 className="m-0">
          <Link href={`/venue/${venue.slug.current}`} passHref>
            <a className="font-bold text-lg">{venue.name}</a>
          </Link>
        </h3>
        <span className="text-sm text-gray-700">
          {venue.address}, {venue.city}
        </span>

        <div className="flex-grow">
          {venue.description && <PortableText content={venue.description} />}
        </div>
      </div>

      {venue.nextEvent && (
        <div className="px-2 md:px-4 py-2 bg-event bg-opacity-50">
          <div className="flex items-top justify-between">
            <span>{dayjs(venue.nextEvent.startTime).format("ddd, MMM DD")}</span>
            <Link href={`/event/${venue.nextEvent.slug}`} passHref>
              <a className="text-md font-semibold">{venue.nextEvent.title}</a>
            </Link>
          </div>
        </div>
      )}
    </li>
  );
};

export default VenueCard;
