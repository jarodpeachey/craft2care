import React from 'react';
import styled, { css } from 'styled-components';

export function Title({ page, data }) {
  const centered = data.center ? data.center : false;
  const noMargin = data.noMargin ? data.noMargin : false;

  if (data.title) {
    if (data.type === 'h1') {
      return (
        <>
          <H1 center={centered} noMargin={noMargin}>
            {data && data.title ? data.title : page.title ? page.title : ''}
          </H1>
          {data && data.underline && (
            <Hr center={centered} noMargin={noMargin} />
          )}
        </>
      );
    } else if (data.type === 'h2') {
      return (
        <>
          <H2 center={centered} noMargin={noMargin}>
            {data && data.title ? data.title : page.title ? page.title : ''}
          </H2>
          {data && data.underline && (
            <Hr center={centered} noMargin={noMargin} />
          )}
        </>
      );
    } else if (data.type === 'h3') {
      return (
        <>
          <H3 center={centered} noMargin={noMargin}>
            {data && data.title ? data.title : page.title ? page.title : ''}
          </H3>
          {data && data.underline && (
            <Hr center={centered} noMargin={noMargin} />
          )}
        </>
      );
    } else if (data.type === 'h4') {
      return (
        <>
          <H4 center={centered} noMargin={noMargin}>
            {data && data.title ? data.title : page.title ? page.title : ''}
          </H4>
          {data && data.underline && (
            <Hr center={centered} noMargin={noMargin} />
          )}
        </>
      );
    } else if (data.type === 'h5') {
      return (
        <>
          <H5 center={centered} noMargin={noMargin}>
            {data && data.title ? data.title : page.title ? page.title : ''}
          </H5>
          {data && data.underline && (
            <Hr center={centered} noMargin={noMargin} />
          )}
        </>
      );
    } else if (data.type === 'h6') {
      return (
        <>
          <H6 center={centered} noMargin={noMargin}>
            {data && data.title ? data.title : page.title ? page.title : ''}
          </H6>
          {data && data.underline && (
            <Hr center={centered} noMargin={noMargin} />
          )}
        </>
      );
    } else {
      return (
        <>
          <H3 center={centered} noMargin={noMargin}>
            {data && data.title ? data.title : page.title ? page.title : ''}
          </H3>
          {data && data.underline && (
            <Hr center={centered} noMargin={noMargin} />
          )}
        </>
      );
    }
  } else {
    return null;
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

  ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `}
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

  ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `}
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

  ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `}
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

  ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `}
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

  ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `}
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

  ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `}
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
