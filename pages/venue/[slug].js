import Head from "next/head";
import PortableText from "react-portable-text";
import EventCard from "../../components/EventCard";
import { getSiteSettings, getVenueById, getVenueSlugs } from "../../lib/api";


export async function getStaticPaths(context) {
  const venueData = await getVenueSlugs();

  const venues = venueData.map((venue => {
    return {
      params: venue
    }
  }))

  return {
    paths: venues,
    fallback: false
  }
}

export async function getStaticProps(context) {

  const data = await getSiteSettings();
  const venue = await getVenueById(context.params.slug)
  return {
    props: {
      venue,
      ...data
    },
  };
}

export default function VenuePage(props) {
  let { venue } = props;
  let { events } = venue
  let { siteTitle, description } = props;

  console.log(venue)

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
      <div className="pt-4 md:pt-12">
        <h1>{venue.name}</h1>
        <div className="py-2">
          {venue.description && <PortableText content={venue.description} />}
        </div>
        <h2>Upcoming events here</h2>
        <div className="flex flex-col gap-2 md:gap-4">
          {events.map(event => <EventCard event={event} key={event._id} synopsis={false}/>)}
        </div>
      </div> 
    </>
  );
}