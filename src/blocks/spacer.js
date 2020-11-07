/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import MaterialButton from '@material-ui/core/Button';
import { Link } from 'gatsby';

export function Spacer ({ page, data, height }) {
  if (data && data.height || height) {
    return (
      <Wrapper height={height || (data.height ? data.height : 24)} />
    );
  }

  else {
    return null;
}
}

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
  height: ${(props) => props.height}px !important;
  content: '';
`;

export const SpacerBlock = {
  label: 'Spacer',
  name: 'Spacer',
  defaultItem: {
    height: 24,
  },
  fields: [

    { name: 'height', label: 'Spacer Height', component: 'rangeNumber' },
  ],
};
