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
    "gatsby-transformer-remark",
    "gatsby-transformer-json",
    "gatsby-plugin-split-css",
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en",
      },
    },
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
        develop: false, // Enable while using "gatsby develop"
        tailwind: true, // Enable tailwindcss support
        whitelist: ["error", "error-message"], // Don't remove this selector
        // ignore: ["_navigation.scss"], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
  ],
};
