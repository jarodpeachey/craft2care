exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  createPage({
    path: `/`,
    component: require.resolve(`./src/pages/homePage.js`),
  });
};
