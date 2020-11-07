/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { Title } from '../blocks/title';
import { Spacer } from '../blocks/spacer';

export const Footer = ({ ...styleProps }) => {
  return (
    <Wrapper {...styleProps}>
      <div className='container'>
        <Spacer height={24} />
        <Title
          data={{
            title: 'Made with ❤ by Diane Boykas',
            center: true,
            underline: false,
            noMargin: true,
            type: 'h4',
          }}
        />
        <Spacer height={24} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  padding: 16px;
  background: ${(props) => props.theme.color.primary};
  color: white;
  margin-top: auto;
  justify-self: flex-end;
`;
