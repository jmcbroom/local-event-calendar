import Head from "next/head";
import PortableText from "react-portable-text";
import EventCard from "../../components/EventCard";
import { getSiteSettings, getEventBySlug, getEventSlugs } from "../../lib/api";
import dayjs from "dayjs";
import VenueCard from "../../components/VenueCard";

export async function getStaticPaths(context) {
  const eventData = await getEventSlugs();

  const events = eventData.map((event => {
    return {
      params: event
    }
  }))

  return {
    paths: events,
    fallback: false
  }
}

export async function getStaticProps(context) {

  const data = await getSiteSettings();
  const event = await getEventBySlug(context.params.slug)
  return {
    props: {
      event,
      ...data
    },
  };
}

export default function EventPage(props) {
  let { event } = props;
  let { venue } = event;
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
        <h1>{event.title}</h1>
        <p>{dayjs(event.startTime).format("ddd MMM D, h:mma")}{event.endTime && dayjs(event.endTime).format(" - h:mma")}</p>
        <div className="py-2">
          {event.synopsis && <p>{event.synopsis}</p>}
        </div>
        {venue &&
        <>
        <h2>Venue information</h2>
        <VenueCard venue={venue} />
        </>
        }
      </div> 
    </>
  );
}