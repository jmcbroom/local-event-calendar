import dayjs from "dayjs";
import Head from "next/head";
import PortableText from "react-portable-text";
import EventCard from "../components/EventCard";
import { getSingletonByName, getSiteSettings, getUpcomingEvents } from "../lib/api";
import { eventInRange } from "../lib/common";

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  const indexPage = await getSingletonByName('indexPage')
  const events = await getUpcomingEvents()
  return {
    props: {events, ...data, ...indexPage},
  };
}

export default function IndexPage(props) {
  let { siteTitle, description, indexPageContent  } = props;

  let { events } = props;
  let eventsToday = events.filter(event => eventInRange(dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'day').format('YYYY-MM-DD'), event))

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
        <PortableText content={indexPageContent} projectId={`8i111c0b`} dataset={`production`} className="p-2 md:p-4 bg-tertiary bg-opacity-50" />
        <div className="p-2 md:p-4">
          <h2>{eventsToday.length > 0 ? `Today's events` : `No events today`}</h2>
          {eventsToday.map(event => <EventCard event={event} key={event.id} showDate={false} />)}
        </div>
      </div>
    </>
  );
}