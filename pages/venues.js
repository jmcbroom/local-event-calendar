import Head from "next/head";
import VenueCard from "../components/VenueCard";
import { getAllVenues, getSiteSettings } from "../lib/api";

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  const venues = await getAllVenues();
  return {
    props: {
      venues,
      ...data
    },
  };
}

export default function VenuesPage(props) {
  let { venues } = props; 
  let { siteTitle, description } = props;

  console.log(venues)

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
        <h1>{venues.length} venues where things are happening:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 pt-4 md:pt-10">

        {venues.map(venue => <VenueCard venue={venue} key={venue.id}/>)}
        </div>
      </div>
    </>
  );
}