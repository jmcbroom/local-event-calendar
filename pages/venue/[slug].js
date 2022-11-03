import Head from "next/head";
import PortableText from "react-portable-text";
import EventCard from "../../components/EventCard";
import { getSiteSettings, getVenueById, getVenueSlugs } from "../../lib/api";
import PublicEventForm from "../../components/PublicEventForm";
import VenueEventListing from "../../components/VenueEventListing";
import VenueMap from "../../components/VenueMap";

export async function getStaticPaths(context) {
  const venueData = await getVenueSlugs();

  const venues = venueData.map((venue) => {
    return {
      params: venue,
    };
  });

  return {
    paths: venues,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  const venue = await getVenueById(context.params.slug);
  return {
    props: {
      venue,
      ...data,
    },
  };
}

export default function VenuePage(props) {
  let { venue } = props;
  venue.feature = JSON.parse(venue.location)[0];
  let { events } = venue;
  let { siteTitle, description } = props;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta name="description" content={description} key="description" />
        <meta property="og:title" content={siteTitle} key="title" />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="pt-4 md:pt-12 max-w-3xl mx-auto">
        <div className="mb-4">
          <h1 className="m-0">{venue.name}</h1>
          <span className="block text-sm">
            {venue.address}, {venue.city}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-venue bg-venue bg-opacity-50 p-2 md:p-4 mb-8">
          {venue.description && <PortableText content={venue.description} />}
          <VenueMap venue={venue} />
        </div>
        <h2>Next events here</h2>
        <ul className="flex flex-col gap-4 md:gap-6 m-0 list-none">
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </ul>
      </div>
      <PublicEventForm venue={venue} />
    </>
  );
}
