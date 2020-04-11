import React from 'react';
import styled, { css } from 'styled-components';
import ReactMarkdown from 'react-markdown';

export function Content({ data }) {
  const centered = data.center ? data.center : false;

  if (data && data.content) {
    return (
      <StyledContent center={centered}>
        <ReactMarkdown source={data.content} />
      </StyledContent>
    );
  }

  return null;
}

const StyledContent = styled.div`
  ${(props) =>
    props.center &&
    css`
      p {
        margin-bottom: 0 !important;
      }
      text-align: center !important;
    `};
  p {
    margin-bottom: 0 !important;
  }
`;

export const ContentBlock = {
  label: 'Content',
  name: 'content',
  key: 'test',
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
      name: 'content',
      label: 'Content',
      component: 'markdown',
      defaultValue: '',
    },
    {
      name: 'center',
      label: 'Center',
      component: 'toggle',
      defaultValue: false,
    },
  ],
};
