import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export const useCategories = () => {
  const { settingsJson } = useStaticQuery(
    graphql`
      query categoriesQuery {
        settingsJson(
          fileRelativePath: { eq: "/content/settings/categories.json" }
        ) {
          ...categories
        }
      }
    `
  );

  return settingsJson.categories;
};

export const categoriesFragment = graphql`
  fragment categories on SettingsJson {
    categories {
      name
      id
    }
  }
`;
