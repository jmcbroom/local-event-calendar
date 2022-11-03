import Head from "next/head";
import PublicVenueForm from "../components/PublicVenueForm";
import VenueCard from "../components/VenueCard";
import { getAllVenues, getSiteSettings } from "../lib/api";

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  const venues = await getAllVenues();
  return {
    props: {
      venues,
      ...data,
    },
  };
}

export default function VenuesPage(props) {
  let { venues } = props;
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
      <div className="max-w-3xl mx-auto">
        <h1>Venues</h1>
        <ul className="max-w-2xl mx-auto flex flex-col gap-4 pt-4 md:pt-10 list-none m-0">
          {venues.map((venue) => (
            <VenueCard venue={venue} key={venue._id} />
          ))}
        </ul>
      </div>
      <PublicVenueForm />
    </>
  );
}
