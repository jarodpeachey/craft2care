/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import React from 'react';
import { Column, ColumnBlock } from './column';
import Row from '../components/grid/row';

export function Grid({ page, data }) {
  const rowProps = {
    maxColumnSize: 12 / data.maxNumberOfColumns,
    breakpoints: [769, 960],
    spacing: [12],
  };

  const demo = data.demo || false; // Demo mode shows the breakpoints and widths for each column so you can see what's going on!

  const itemsToShow =
    data.columns && data.columns.length ? data.columns.length : 0;

  let makeFill = false;

  if (itemsToShow > 0) {
    data.columns.map((block) => {
      if (block.widthOne > 0 || block.widthTwo > 0) {
        makeFill = true;

        return true;
      }
    });
  }

  if (data && itemsToShow && itemsToShow.length > 0) {
    return (
      <>
        {itemsToShow > 0 ? (
          <Row demo={demo} {...rowProps}>
            {data.columns
              ? data.columns.map(({ _template, ...block }, index) => {
                  let widths;

                  if (block.widthOne === 0 && block.widthTwo === 0) {
                    if (itemsToShow === 1) {
                      widths = ['auto', 'auto'];
                    } else if (itemsToShow === 2) {
                      widths = ['auto', 'auto'];
                    } else if (itemsToShow === 3) {
                      widths = ['auto', 'auto'];
                    } else if (itemsToShow === 4 || itemsToShow === 5) {
                      widths = ['auto', 'auto'];
                    } else if (itemsToShow >= 6) {
                      widths = ['auto', 'auto'];
                    }
                  } else if (block.widthOne === 0) {
                    if (itemsToShow === 1) {
                      widths = [12, block.widthTwo];
                    } else if (itemsToShow === 2) {
                      widths = [makeFill ? 'auto' : 6, block.widthTwo];
                    } else if (itemsToShow === 3) {
                      widths = [makeFill ? 'auto' : 6, block.widthTwo];
                    } else if (itemsToShow === 4 || itemsToShow === 5) {
                      widths = [makeFill ? 'auto' : 6, block.widthTwo];
                    } else if (itemsToShow >= 6) {
                      widths = [makeFill ? 'auto' : 6, block.widthTwo];
                    }
                  } else if (block.widthTwo === 0) {
                    if (itemsToShow === 1) {
                      widths = [block.widthOne, makeFill ? 'auto' : 12];
                    } else if (itemsToShow === 2) {
                      widths = [block.widthOne, makeFill ? 'auto' : 6];
                    } else if (itemsToShow === 3) {
                      widths = [block.widthOne, makeFill ? 'auto' : 4];
                    } else if (itemsToShow === 4 || itemsToShow === 5) {
                      widths = [block.widthOne, makeFill ? 'auto' : 3];
                    } else if (itemsToShow >= 6) {
                      widths = [
                        block.widthOne,
                        makeFill ? 'auto' : 12 / data.maxNumberOfColumns,
                      ];
                    }
                  } else {
                    widths = [block.widthOne, block.widthTwo];
                  }

                  return (
                    <Column
                      key={`page-${page.title}-grid-column-${index}`}
                      page={page}
                      data={block}
                      widths={widths}
                    />
                  );
                })
              : null}
          </Row>
        ) : null}
      </>
    );
  }

  return null;
}

const Wrapper = styled.div`
  margin: ${(props) => props.margin}px !important;
  padding: ${(props) => props.padding}px !important;
`;

export const GridBlock = {
  label: 'Grid',
  name: 'grid',
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
    // { name: 'itemsToShow', label: 'Items To Show', component: 'rangeNumber' },
    {
      name: 'maxNumberOfColumns',
      label: 'Max Number Of Columns',
      component: 'rangeNumber',
      max: 4,
      min: 2,
      defaultValue: 4,
    },
    {
      name: 'columnSpacing',
      label: 'Spacing',
      component: 'rangeNumber',
      description: 'The distance between each column in pixels',
      max: 48,
      min: 1,
      defaultValue: 12,
    },
    {
      label: 'Columns',
      name: 'columns',
      component: 'blocks',
      templates: {
        ColumnBlock,
      },
    },
  ],
};
