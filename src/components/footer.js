import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

export const Footer = ({ ...styleProps }) => {
  return (
    <Wrapper {...styleProps}>
      <div className='container'>
        {'Copyright © '} {new Date().getFullYear()}
        {'. '} GJCommerce
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  padding: 16px;
  background: ${props => props.theme.color.primary};
  color: white;
  margin-top: auto;
  justify-self: flex-end;
`;
