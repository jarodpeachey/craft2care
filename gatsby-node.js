const path = require('path');
const slug = require('slug');
const { createFilePath } = require('gatsby-source-filesystem');
const { GraphQLBoolean } = require('gatsby/graphql');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const fetch = require('node-fetch');

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode } = actions;

  const apiKey = process.env.NETLIFY_TOKEN;
  const siteID = process.env.SITE_ID;

  if (!apiKey || !siteID) {
    reporter.panicOnBuild('Please define a Netlify access token');
  }

  // const client = new NetlifyAPI(apiKey, opts);

  const nodeHelper = (input, name) => {
    // input.netlify_id = input.id;
    // input.id = createNodeId(`gatsby-source-netlify-${input.netlify_id}`);
    // console.log(input);

    const nodeMeta = {
      id: input.id,
      parent: null,
      children: [],
      internal: {
        type: `Netlify${name}`,
      },
    };
    nodeMeta.internal.content = JSON.stringify(nodeMeta);
    nodeMeta.internal.contentDigest = createContentDigest(nodeMeta);

    console.log(nodeMeta);

    createNode(Object.assign({}, input, nodeMeta));
  };

  try {
    await fetch(
      `https://api.netlify.com/api/v1/sites/${siteID}/submissions/?access_token=${apiKey}`
    ).then((res) => {
      res.json().then((json) => {
        console.log(typeof json);
        console.log(json);

        if (Object.values(json).length > 0) {
          Object.values(json).forEach((submission) => {
            nodeHelper(submission, 'Submissions');
          });
        } else {
          const submission = {
            number: 1,
            id: toString(Math.random() * 100),
            created_at: new Date(),
            data: {
              comment: 'Test',
              email: 'test@mail.com',
              name: 'Diane Boykas',
              path: '/',
              parentCommentNumber: 12,
            },
          };
          nodeHelper(submission, 'Submissions');
        }
      });
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

// exports.onCreatePage = ({ page, actions }) => {
//   console.log(page);
//   const { createPage, deletePage } = actions;
//   deletePage(page);
//   createPage({
//     ...page,
//     post: page,
//     context: {
//       ...page.context,
//       pathname: page.path,
//     },
//   });
// };

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  //   lists: allPagesJson(filter: { path: { ne: null }, listType: { ne: null } }) {
  //   edges {
  //     node {
  //       path
  //       listType
  //     }
  //   }
  // }

  const result = await graphql(`
    {
      pages: allPagesJson(filter: { path: { ne: null } }) {
        edges {
          node {
            path
          }
        }
      }
      posts: allPostsJson(filter: { path: { ne: null } }) {
        edges {
          node {
            path
            internal {
              type
            }
          }
        }
      }
      categories: settingsJson(
        fileRelativePath: { eq: "/content/settings/categories.json" }
      ) {
        categories {
          name
          id
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.path,
      component: path.resolve('src/templates/page.js'),
      context: {
        pathname: node.path,
      },
    });
  });

  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: node.path,
      component: path.resolve('src/templates/post.js'),
      context: {
        pathname: node.path,
      },
    });
  });

  result.data.categories.categories.forEach((category) => {
    console.log(category);
    createPage({
      path: `/category/${category.id}`,
      component: path.resolve('src/templates/category.js'),
      context: {
        category: category.id,
      },
    });
  });

  // result.data.lists.edges.forEach(({ node }) => {
  //   const listPageTemplate = path.resolve(`src/templates/list.js`);
  //   const listType = node.listType;
  //   const allPosts = result.data.posts.edges;
  //   const posts = allPosts.filter((post) => page.type === listType);
  //   const postsPerPage = 5;
  //   const numPages = Math.max(Math.ceil(posts.length / postsPerPage), 1);
  //   const slug = node.path;

  //   Array.from({ length: numPages }).forEach((_, i) => {
  //     const currentPage = i + 1;
  //     const isFirstPage = i === 0;

  //     createPage({
  //       path: isFirstPage ?
  //         node.path :
  //         `${String(node.path)}/${String(currentPage)}`,
  //       component: listPageTemplate,
  //       context: {
  //         slug,
  //         limit: postsPerPage,
  //         skip: i * postsPerPage,
  //         numPages,
  //         currentPage,
  //       },
  //     });
  //   });
  // });
};
