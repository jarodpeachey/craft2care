import React from 'react';
import { useCategories } from './useCategories';

export const ListCategories = (categoryIDs) => {
  const categories = useCategories().filter((category) =>
    categoryIDs.find((id) => id === category.id)
  );

  const categoryList = categories.map((category, index) => {
    if (categories.length === index + 1) {
      return category.name;
    } else {
      return category.name + ', ';
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
