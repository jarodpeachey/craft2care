const proxy = require('http-proxy-middleware');
const theme = require('./content/settings/theme.json');
const site = require('./content/settings/site.json');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-tinacms-json',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        sidebar: {
          hidden:
            typeof window !== 'undefined'
              ? window.location.pathname === '/tests'
              : false,
          position: 'displace',
          theme: {
            color: {
              primary: {
                light: theme.color.primary,
                medium: theme.color.primary,
                dark: theme.color.primary,
              },
            },
          },
        },
        plugins: [
          {
            resolve: 'gatsby-tinacms-git',
            options: {
              sshKey: process.env.SSH_KEY,
            },
          },
          'gatsby-tinacms-remark',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'settings',
        path: `${__dirname}/content/settings`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/siteLayout.js`),
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: site.title,
        short_name: site.title,
        start_url: '/',
        background_color: theme.color.primary,
        theme_color: theme.color.primary,
        display: 'minimal-ui',
        icon: 'content/images/icon.png',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 880,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Lato:400,700'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    'gatsby-plugin-styled-components',
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
};
