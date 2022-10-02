import Layout from "../components/layout";
import "../styles/globals.css";
import "../styles/embla.css";

import { MDXProvider } from "@mdx-js/react";
import MarkdownComponents from "../components/MarkdownComponents";
import { getSiteSettings } from "../lib/api";

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  return {
    props: { ...data },
  };
}

function MyApp({ Component, pageProps, siteTitle }) {
  return (
    <MDXProvider components={MarkdownComponents}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
}

export default MyApp;
