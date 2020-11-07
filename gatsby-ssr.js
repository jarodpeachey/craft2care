/* eslint-disable import/prefer-default-export */
// import { AuthorsField } from './src/fields/authors';
import React from 'react';
import AppProvider from './src/components/AppProvider';

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};
