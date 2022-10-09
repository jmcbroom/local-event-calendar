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
      <div className="max-w-3xl mx-auto">
        <h1>Welcome to {siteTitle}!</h1>
        <p className="py-2">
          {`
          I'm building this site because I'm tired of finding out about things after they happen!

          So far, it's pretty simple, but I'm hoping to make it better with your help.
          
          `}

        </p>

      </div>
    </>
  );
}