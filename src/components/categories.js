import React from 'react';
import { useCategories } from './useCategories';

export const ListCategories = (categoryNames) => {
  const categories = useCategories().filter((category) =>
    categoryNames.find((name) => name === category)
  );

  const categoryList = categories.map((category, index) => {
    if (categories.length === index + 1) {
      return category;
    } else {
      return category + ', ';
    }
  });

  return categories;
};

export const CategoriesForm = {
  label: 'Categories',
  fields: [
    {
      label: 'Categories',
      name: 'rawJson.categories',
      component: 'group-list',
      itemProps: (item) => ({
        key: item.id,
        label: item.name,
      }),
      fields: [
        {
          label: 'Name',
          name: 'name',
          component: 'text',
          parse(value) {
            return value || '';
          },
        },
      ],
    },
  ],
};
