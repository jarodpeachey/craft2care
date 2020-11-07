import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql, withPrefix } from "gatsby";
import "../styles/_layout.scss";

const Head = ({ title, description, image = null, article, slug, bodyClass = "home" }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(graphql`
    query Head {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          baseUrl
          author
        }
      }
    }
  `);

  const { defaultTitle, defaultDescription, baseUrl, author } = site.siteMetadata;

  console.log(image);
  const defaultImage = "/images/seo.png";

  return (
    <Helmet bodyAttributes={{ class: bodyClass }} title={title || defaultTitle}>
      <meta name="description" content={description || defaultDescription} />
      <meta name="og:title" content={title || defaultTitle} />
      <meta name="og:description" content={description || defaultDescription} />
      <meta name="og:type" content="website" />
      <meta name="og:image" content={`https://react-tiny-grid.netlify.app${image || defaultImage}`} />
      <meta name="twitter:image" content={`https://react-tiny-grid.netlify.app${image || defaultImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />

      <script src={withPrefix("js/main.js")} type="text/javascript" defer="true" />
      <script src={withPrefix("js/theme.js")} type="text/javascript" defer="true" />
    </Helmet>
  );
};

export default Head;
