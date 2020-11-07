const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Craft 2 Care",
    description: "Simple craft ideas for Operation Christmas Child",
    defaultTitle: "Craft 2 Care",
    defaultDescription: "Simple craft ideas for Operation Christmas Child",
    baseUrl: "https://craft2care.netlify.app",
    siteUrl: "https://craft2care.netlify.app",
    author: "@jarodpeachey",
    socials: {
      twitter: `https://twitter.com/jarodpeachey`,
      github: `https://github.com/jarodpeachey/craft2care`,
    },
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/static/media/img`,
      },
    },
    "gatsby-plugin-split-css",
    {
      resolve: "gatsby-plugin-no-javascript",
      options: {},
    },
    {
      resolve: "gatsby-plugin-no-javascript-utils",
      options: {
        noSourcemaps: true,
        removeGeneratorTag: true,
        removeReactHelmetAttrs: true,
        noInlineStyles: false,
        removeGatsbyAnnouncer: true,
        removeFocusWrapper: true,
        removePreloadLinks: false,
      },
    },
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: false,
        tailwind: false,
        whitelist: [],
      },
    },
  ],
};
