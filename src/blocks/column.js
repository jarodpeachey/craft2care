/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import React from 'react';
import { Image, ImageBlock } from './image';
import { Content, ContentBlock } from './content';
import { Button, ButtonBlock } from './button';
import { Spacer, SpacerBlock } from './spacer';
// import Row from '../components/grid/row';

export function Column({ page, data, demo }) {
  if (data.columnBlocks && data.columnBlocks.length > 0) {
    return (
      <>
        {data.columnBlocks
          ? data.columnBlocks.map(({ _template, ...block }, index) => {
              switch (_template) {
                case 'ButtonBlock':
                  return (
                    <>
                      <Button data={block} />
                    </>
                  );
                case 'ImageBlock':
                  return (
                    <>
                      <Image data={block} />
                    </>
                  );
                case 'ContentBlock':
                  if (block.content)
                    return (
                      <>
                        <Content data={block} />
                      </>
                    );
                  break;
                case 'SpacerBlock':
                  return <Spacer data={block} />;
                default:
                  return true;
              }
            })
          : null}
      </>
    );
  } else {
    console.log('Returning null');
    return null;
  }
}

const Wrapper = styled.div`
  margin: ${(props) => props.margin}px !important;
  padding: ${(props) => props.padding}px !important;
`;

export const ColumnBlock = {
  label: 'Column',
  name: 'column',
  fields: [
    {
      label: 'Width One (tablet)',
      name: 'widthOne',
      component: 'advancedSelect',
      options: [
        {
          value: 0,
          label: 'Auto (Fill available space)',
        },
        {
          value: 1,
          label: '1/12',
        },
        {
          value: 2,
          label: '2/12',
        },
        {
          value: 3,
          label: '3/12',
        },
        {
          value: 4,
          label: '4/12',
        },
        {
          value: 5,
          label: '5/12',
        },
        {
          value: 6,
          label: '6/12',
        },
        {
          value: 7,
          label: '7/12',
        },
        {
          value: 8,
          label: '8/12',
        },
        {
          value: 9,
          label: '9/12',
        },
        {
          value: 10,
          label: '10/12',
        },
        {
          value: 11,
          label: '11/12',
        },
        {
          value: 12,
          label: '12/12',
        },
      ],
      defaultValue: 0,
    },
    {
      label: 'Width Two (desktop)',
      name: 'widthTwo',
      component: 'advancedSelect',
      options: [
        {
          value: 0,
          label: 'Auto (Fill available space)',
        },
        {
          value: 1,
          label: '1/12',
        },
        {
          value: 2,
          label: '2/12',
        },
        {
          value: 3,
          label: '3/12',
        },
        {
          value: 4,
          label: '4/12',
        },
        {
          value: 5,
          label: '5/12',
        },
        {
          value: 6,
          label: '6/12',
        },
        {
          value: 7,
          label: '7/12',
        },
        {
          value: 8,
          label: '8/12',
        },
        {
          value: 9,
          label: '9/12',
        },
        {
          value: 10,
          label: '10/12',
        },
        {
          value: 11,
          label: '11/12',
        },
        {
          value: 12,
          label: '12/12',
        },
      ],
      defaultValue: 0,
    },
    {
      label: 'Column Items',
      name: 'columnBlocks',
      component: 'blocks',
      templates: {
        ImageBlock,
        ContentBlock,
        ButtonBlock,
        SpacerBlock,
      },
    },
  ],
};
