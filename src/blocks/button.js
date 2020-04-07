/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import MaterialButton from '@material-ui/core/Button';
import { Link } from 'gatsby';

export function Button({ page, data }) {
  const centered = data.center ? data.center : false;
  const left = data.left ? data.left : false;
  const right = data.right ? data.right : false;
  return (
    <Link className='no-underline' to={data.buttonLink ? data.buttonLink : '/'}>
      <StyledButton
        variant='contained'
        color={data.buttonColor ? data.buttonColor.toLowerCase() : 'primary'}
        center={centered}
        left={left}
        right={right}
      >
        {data && data.buttonText ? data.buttonText : ''}
      </StyledButton>
    </Link>
  );
}

const StyledButton = styled(MaterialButton)`
  margin: ${props =>
    props.right
      ? '0 0 0 auto'
      : props.left
      ? '0 auto 0 0'
      : props.center
      ? '0 auto'
      : '0'} !important;
  display: block !important;
  width: fit-content !important;
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
    buttonColor: 'primary'
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
      name: 'buttonText',
      label: 'Text',
      component: 'text',
      defaultValue: 'Click Me'
    },
    {
      name: 'center',
      label: 'Center',
      component: 'toggle',
      defaultValue: true
    },
    {
      name: 'left',
      label: 'Left',
      component: 'toggle',
      defaultValue: false
    },
    {
      name: 'right',
      label: 'Right',
      component: 'toggle',
      defaultValue: false
    },
    {
      name: 'buttonLink',
      label: 'Link',
      component: 'text',
      defaultValue: '/'
    },
    {
      name: 'buttonColor',
      label: 'Button Color',
      component: 'select',
      options: ['Primary', 'Secondary'],
      defaultValue: 'Primary'
    }
  ]
};
