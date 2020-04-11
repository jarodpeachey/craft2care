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
                      <Wrapper
                        demo={demo}
                        key={`page-${page.title}-grid-column-${_template}-${index}`}
                        // padding={
                        //   block.blockPadding ? block.blockPadding.paddingTop : 0
                        // }
                        // margin={
                        //   block.blockMargin ? block.blockMargin.marginTop : 0
                        // }
                      >
                        <Button data={block} />
                      </Wrapper>
                    </>
                  );
                case 'ImageBlock':
                  return (
                    <>
                      <Wrapper
                        key={`page-${page.title}-grid-column-${_template}-${index}`}
                        // padding={
                        //   block.blockPadding ? block.blockPadding.paddingTop : 0
                        // }
                        // margin={
                        //   block.blockMargin ? block.blockMargin.marginTop : 0
                        // }
                      >
                        <Image data={block} />
                      </Wrapper>
                    </>
                  );
                case 'ContentBlock':
                  if (block.content)
                    return (
                      <>
                        <Wrapper
                          key={`page-${page.title}-grid-column-${_template}-${index}`}
                          // padding={
                          //   block.blockPadding ? block.blockPadding.paddingTop : 0
                          // }
                          // margin={
                          //   block.blockMargin ? block.blockMargin.marginTop : 0
                          // }
                        >
                          <Content data={block} />
                        </Wrapper>
                      </>
                    );
                  break;
                case 'SpacerBlock':
                  return (
                    <Wrapper
                      className='container'
                      key={`page-${page.title}-container-${_template}-block-${index}`}
                      // padding={
                      //   block.blockPadding
                      //     ? block.blockPadding
                      //     : {
                      //         paddingTop: 0,
                      //         paddingBottom: 0,
                      //         paddingLeft: 0,
                      //         paddingRight: 0
                      //       }
                      // }
                      // margin={
                      //   block.blockMargin
                      //     ? block.blockMargin
                      //     : {
                      //         marginTop: 0,
                      //         marginBottom: 0,
                      //         marginLeft: 0,
                      //         marginRight: 0
                      //       }
                      // }
                    >
                      <Spacer data={block} />
                    </Wrapper>
                  );
                default:
                  return true;
              }
            })
          : null}
      </>
    );
  }

  return null;
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
