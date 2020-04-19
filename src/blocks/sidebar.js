/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import React from 'react';
import { Image, ImageBlock } from './image';
import { Content, ContentBlock } from './content';
import { Button, ButtonBlock } from './button';
import { GridBlock, Grid } from './grid';
import { PostsBlock, Posts } from './posts';
import { TitleBlock, Title } from './title';
import { Spacer, SpacerBlock } from './spacer';
// import Row from '../components/grid/row';

export function Sidebar({ page, sections }) {
  if (sections && sections.length > 0) {
    return (
      <>
        {sections &&
          sections.map(({ _template, ...block }, index) => {
            console.log('Sidebar block: ', block);
            switch (_template) {
              case 'SidebarBlock':
                return (
                  <>
                    {block.sidebarBlocks && (
                      <Column>
                        <Card margin>
                          {' '}
                          {block.sectionTitle !== null && (
                            <SidebarTitle>{block.sectionTitle}</SidebarTitle>
                          )}
                          {block.sidebarBlocks.map((sidebarBlock, newIndex) => {
                            switch (sidebarBlock._template) {
                              case 'TitleBlock':
                                return (
                                  <Title page={page} data={sidebarBlock} />
                                );
                              case 'ButtonBlock':
                                return (
                                  <>
                                    <Button data={sidebarBlock} />
                                  </>
                                );
                              case 'PostsBlock':
                                return (
                                  <>
                                    <Posts data={sidebarBlock} />
                                  </>
                                );
                              case 'ImageBlock':
                                return (
                                  <>
                                    <Image data={sidebarBlock} />
                                  </>
                                );
                              case 'GridBlock':
                                return (
                                  <>
                                    <Grid page={page} data={sidebarBlock} />
                                  </>
                                );
                              case 'ContentBlock':
                                if (sidebarBlock.content)
                                  return (
                                    <>
                                      <Content
                                        key={`post-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                        data={sidebarBlock}
                                      />
                                    </>
                                  );
                                break;
                              case 'SpacerBlock':
                                return <Spacer data={sidebarBlock} />;
                              default:
                                return true;
                            }
                          })}
                        </Card>
                      </Column>
                    )}
                  </>
                );
              default:
                return null;
            }
          })}
      </>
    );
  } else {
    console.log('Returning null');
    return null;
  }
}

const Column = styled.div`
  padding: 20px 0;
`;

const Card = styled.div`
  background: white;
  box-shadow: 4px 6px 16px 1px #eee;
  border: 1px solid #ddd;
  background: white;

  padding: 24px;
`;

const SidebarTitle = styled.h3`
  width: 100%;
  padding-bottom: 24px;
  border-bottom: 2px solid ${(props) => props.theme.color.primary};
`;

export const SidebarBlock = {
  label: 'Sidebar Section',
  name: 'sidebarSection',
  fields: [
    {
      label: 'Section Title',
      name: 'sectionTitle',
      component: 'text',
    },
    {
      label: 'Sidebar Content',
      name: 'sidebarBlocks',
      component: 'blocks',
      templates: {
        TitleBlock,
        ImageBlock,
        ContentBlock,
        ButtonBlock,
        SpacerBlock,
        PostsBlock,
        GridBlock,
      },
    },
  ],
};
