exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  createPage({
    path: `/`,
    component: require.resolve(`./src/pages/homePage.tsx`),
  }),
    createPage({
      path: `/contact`,
      component: require.resolve(`./src/pages/contactPage.tsx`),
    }),
    createPage({
      path: `/success`,
      component: require.resolve(`./src/pages/successPage.tsx`),
    });
};
