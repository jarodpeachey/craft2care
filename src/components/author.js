import React from 'react';
// import { useAuthors } from './useAuthors';

/* export const ListAuthors = (authorIDs) => {
  const authors = useAuthors().filter((author) =>
    authorIDs.find((id) => id === author.id)
  );

  const authorList = authors.map((author, index) => {
    if (authors.length === index + 1) {
      return author.name;
    } else {
      return author.name + ', ';
    }
  });

  return authors;
}; */

export const AuthorForm = {
  label: 'Author',
  fields: [
    {
      label: 'Name',
      name: 'name',
      component: 'text',
      parse(value) {
        return value || '';
      },
    },
    {
      label: 'Email',
      name: 'email',
      component: 'text',
      parse(value) {
        return value || '';
      },
    },
  ],
};
