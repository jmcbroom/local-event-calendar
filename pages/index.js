import Head from "next/head";
import { getSiteSettings } from "../lib/api";

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  return {
    props: {...data},
  };
}

export default function IndexPage(props) {
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
        <p>{description}</p>
      </div>
    </>
  );
}