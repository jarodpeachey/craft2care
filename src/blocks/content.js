import React from 'react';
import styled, { css } from 'styled-components';
import ReactMarkdown from 'react-markdown';

export function Content({ data }) {
  const centered = data.center ? data.center : false;

  if (data) {
    return (
      <StyledContent center={centered}>
        <ReactMarkdown source={data.content} />
      </StyledContent>
    );
  } else {
    console.log('Returning null');
    return null;
  }
}

const StyledContent = styled.div`
  ${(props) =>
    props.center &&
    css`
      text-align: center !important;
    `};
`;

export const ContentBlock = {
  label: 'Content',
  name: 'content',
  key: 'test',
  fields: [

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
