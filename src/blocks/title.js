import React from 'react';
import styled, { css } from 'styled-components';

export function Title({ page, data }) {
  const centered = data.center ? data.center : false;
  if (data.type === 'h1') {
    return (
      <>
        <H1 center={centered}>
          {data && data.title ? data.title : page.title ? page.title : ''}
        </H1>
        {data && data.underline && <Hr center={centered} />}
      </>
    );
  } else if (data.type === 'h2') {
    return (
      <>
        <H2 center={centered}>
          {data && data.title ? data.title : page.title ? page.title : ''}
        </H2>
        {data && data.underline && <Hr center={centered} />}
      </>
    );
  } else if (data.type === 'h3') {
    return (
      <>
        <H3 center={centered}>
          {data && data.title ? data.title : page.title ? page.title : ''}
        </H3>
        {data && data.underline && <Hr center={centered} />}
      </>
    );
  } else if (data.type === 'h4') {
    return (
      <>
        <H4 center={centered}>
          {data && data.title ? data.title : page.title ? page.title : ''}
        </H4>
        {data && data.underline && <Hr center={centered} />}
      </>
    );
  } else if (data.type === 'h5') {
    return (
      <>
        <H5 center={centered}>
          {data && data.title ? data.title : page.title ? page.title : ''}
        </H5>
        {data && data.underline && <Hr center={centered} />}
      </>
    );
  } else if (data.type === 'h6') {
    return (
      <>
        <H6 center={centered}>
          {data && data.title ? data.title : page.title ? page.title : ''}
        </H6>
        {data && data.underline && <Hr center={centered} />}
      </>
    );
  }
}

const H1 = styled.h1`
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const H2 = styled.h2`
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const H3 = styled.h3`
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const H4 = styled.h4`
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const H5 = styled.h5`
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const H6 = styled.h6`
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const Hr = styled.hr`
  margin: 2.2rem 0;

  ${(props) =>
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
    underline: true,
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
    {
      name: 'type',
      label: 'Type',
      component: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    { name: 'title', label: 'Title', component: 'text', defaultValue: 'Title' },
    {
      name: 'center',
      label: 'Center',
      component: 'toggle',
      defaultValue: true,
    },
    {
      name: 'underline',
      label: 'Underline',
      component: 'toggle',
      defaultValue: true,
    },
  ],
};
