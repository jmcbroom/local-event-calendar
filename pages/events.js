import dayjs from "dayjs";
import Head from "next/head";
import { getSiteSettings, getUpcomingEvents } from "../lib/api";
import EventCard from "../components/EventCard";

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  const events = await getUpcomingEvents();

  return {
    props: {
      events,
      ...data,
    },
  };
}

export default function EventsPage(props) {
  let { events } = props;
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
      <div>
        <h1>{events.length} events for you to check out:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 pt-4 md:pt-10">
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </div>
    </>
  );
}
