import Head from "next/head";
import { useState } from "react";
import EventCard from "../components/EventCard";
import { getSiteSettings, getUpcomingEvents } from "../lib/api";
import EventsFilter from "../components/EventsFilter";

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

  // store events that we show to the user here
  const [eventsToShow, setEventsToShow] = useState([]);

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

      <div className="max-w-3xl mx-auto">
        <h1>Events</h1>
        <EventsFilter events={events} setEvents={setEventsToShow} />
        <div className="max-w-2xl mx-auto pt-4 md:pt-10">
          <p className="text-gray-400">
            Showing {eventsToShow.length} of {events.length} events..
          </p>
          <ul className="flex flex-col gap-4 md:gap-8  list-none m-0">
            {eventsToShow.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
