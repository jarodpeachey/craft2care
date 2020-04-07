import React from 'react';
import styled, { css } from 'styled-components';

export function Title({ page, data }) {
  const centered = data.center ? data.center : false;
  return (
    <>
      <StyledTitle center={centered}>
        {data && data.title ? data.title : page.title ? page.title : ''}
      </StyledTitle>
      {data && data.underline && <Hr center={centered} />}
    </>
  );
}

const StyledTitle = styled.h2`
  font-size: 2.2em;
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const Hr = styled.hr`
  margin: 2.2rem 0;

  ${props =>
    props.center &&
    css`
      margin-left: auto;
      margin-right: auto;
    `};
`;

export const TitleBlock = {
  label: 'Title',
  name: 'title',
  defaultItem: {
    title: '',
    center: false,
    underline: true
  },
  fields: [
    // {
    //   name: 'blockPadding',
    //   label: 'Padding',
    //   component: 'group',
    //   fields: [
    //     {
    //       label: 'Padding Top',
    //       name: 'paddingTop',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     },
    //     {
    //       label: 'Padding Bottom',
    //       name: 'paddingBottom',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     },
    //     {
    //       label: 'Padding Left',
    //       name: 'paddingLeft',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     },
    //     {
    //       label: 'Padding Right',
    //       name: 'paddingRight',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     }
    //   ]
    // },
    // {
    //   name: 'blockMargin',
    //   label: 'Margin',
    //   component: 'group',
    //   fields: [
    //     {
    //       label: 'Margin Top',
    //       name: 'marginTop',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     },
    //     {
    //       label: 'Margin Bottom',
    //       name: 'marginBottom',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     },
    //     {
    //       label: 'Margin Left',
    //       name: 'marginLeft',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     },
    //     {
    //       label: 'Margin Right',
    //       name: 'marginRight',
    //       component: 'rangeNumber',
    //       defaultValue: 0
    //     }
    //   ]
    // },
    { name: 'title', label: 'Title', component: 'text', defaultValue: 'Title' },
    {
      name: 'center',
      label: 'Center',
      component: 'toggle',
      defaultValue: true
    },
    {
      name: 'underline',
      label: 'Underline',
      component: 'toggle',
      defaultValue: true
    }
  ]
};
