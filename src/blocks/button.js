/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import MaterialButton from '@material-ui/core/Button';
import { Link } from 'gatsby';
import { bestContrast } from '../components/style';

export function Button({ page, data }) {
  const centered = data.center ? data.center : false;
  const left = data.left ? data.left : false;
  const right = data.right ? data.right : false;
  const type = data.type ? data.type : 'button';
  const noLink = data.noLink ? data.noLink : false;

  if (data.buttonText) {
    return (
      <>
        {noLink ? (
          <StyledButton
            color={
              data.buttonColor ? data.buttonColor.toLowerCase() : 'primary'
            }
            center={centered}
            left={left}
            right={right}
            type={type}
          >
            {data && data.buttonText ? data.buttonText : ''}
          </StyledButton>
        ) : (
          <Link
            className='no-underline'
            to={data.buttonLink ? data.buttonLink : '/'}
          >
            <StyledButton
              color={
                data.buttonColor ? data.buttonColor.toLowerCase() : 'primary'
              }
              center={centered}
              left={left}
              right={right}
              type={type}
            >
              {data && data.buttonText ? data.buttonText : ''}
            </StyledButton>
          </Link>
        )}
      </>
    );
  } else {
    return null;
  }
}

const StyledButton = styled.button`
  margin: ${(props) =>
    props.right
      ? '0 0 0 auto'
      : props.left
      ? '0 auto 0 0'
      : props.center
      ? '0 auto'
      : '0'} !important;
  background: ${(props) =>
    props.color === 'secondary'
      ? props.theme.color.secondary
      : props.theme.color.primary};
  color: white;
  }};
  display: block !important;
  width: fit-content !important;
  border: none;
  border-radius: 100px;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition-duration: .4s;
  :hover {
    background: ${(props) =>
      props.color === 'secondary'
        ? props.theme.color.secondary
        : props.theme.color.primary}d9;
    transition-duration: .4s;
    box-shadow: 2px 4px 22px -10px ${(props) => props.theme.color.primary};
    transform: scale(1.04);
  }
`;

export const ButtonBlock = {
  label: 'Button',
  name: 'Button',
  defaultItem: {
    buttonText: '',
    center: true,
    left: false,
    right: false,
    buttonLink: '/',
    buttonColor: 'primary',
  },
  fields: [
    {
      name: 'buttonText',
      label: 'Text',
      component: 'text',
      defaultValue: 'Click Me',
    },
    {
      name: 'center',
      label: 'Center',
      component: 'toggle',
      defaultValue: true,
    },
    {
      name: 'left',
      label: 'Left',
      component: 'toggle',
      defaultValue: false,
    },
    {
      name: 'right',
      label: 'Right',
      component: 'toggle',
      defaultValue: false,
    },
    {
      name: 'buttonLink',
      label: 'Link',
      component: 'text',
      defaultValue: '/',
    },
    {
      name: 'buttonColor',
      label: 'Button Color',
      component: 'select',
      options: ['Primary', 'Secondary'],
      defaultValue: 'Primary',
    },
  ],
};
