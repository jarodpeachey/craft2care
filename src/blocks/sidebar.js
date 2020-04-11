/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import React from 'react';
import Form, { FormBlock } from './form';
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
            switch (_template) {
              case 'SidebarBlock':
                return (
                  <>
                    {block.sidebarBlocks &&
                      block.sidebarBlocks.map((sidebarBlock, newIndex) => {
                        switch (sidebarBlock._template) {
                          case 'TitleBlock':
                            return (
                              <Column>
                                <Card
                                  margin
                                  key={`page-${page.title}-${sidebarBlock._template}-block-${newIndex}`}
                                >
                                  {block.sectionTitle !== null && (
                                    <SidebarTitle>
                                      {block.sectionTitle}
                                    </SidebarTitle>
                                  )}
                                  <Title page={page} data={sidebarBlock} />
                                </Card>
                              </Column>
                            );
                          case 'ButtonBlock':
                            return (
                              <Column>
                                <Card
                                  margin
                                  key={`page-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                >
                                  {block.sectionTitle !== null && (
                                    <SidebarTitle>
                                      {block.sectionTitle}
                                    </SidebarTitle>
                                  )}
                                  <Button data={sidebarBlock} />
                                </Card>
                              </Column>
                            );
                          case 'PostsBlock':
                            return (
                              <Column>
                                <Card
                                  margin
                                  key={`page-${page.title}-container-${_template}-block-${index}`}
                                >
                                  {block.sectionTitle !== null && (
                                    <SidebarTitle>
                                      {block.sectionTitle}
                                    </SidebarTitle>
                                  )}
                                  <Posts data={sidebarBlock} />
                                </Card>
                              </Column>
                            );
                          case 'ImageBlock':
                            return (
                              <Column>
                                <Card
                                  margin
                                  key={`post-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                >
                                  {block.sectionTitle !== null && (
                                    <SidebarTitle>
                                      {block.sectionTitle}
                                    </SidebarTitle>
                                  )}
                                  <Image data={sidebarBlock} />
                                </Card>
                              </Column>
                            );
                          case 'GridBlock':
                            return (
                              <Column>
                                <Card
                                  margin
                                  key={`post-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                >
                                  {block.sectionTitle !== null && (
                                    <SidebarTitle>
                                      {block.sectionTitle}
                                    </SidebarTitle>
                                  )}
                                  <Grid page={page} data={sidebarBlock} />
                                </Card>
                              </Column>
                            );
                          case 'FormBlock':
                            return (
                              <Column>
                                <Card
                                  margin
                                  key={`post-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                >
                                  {block.sectionTitle !== null && (
                                    <SidebarTitle>
                                      {block.sectionTitle}
                                    </SidebarTitle>
                                  )}
                                  <Form form={sidebarBlock} />
                                </Card>
                              </Column>
                            );
                          case 'ContentBlock':
                            if (sidebarBlock.content)
                              return (
                                <Column>
                                  <Card
                                    margin
                                    key={`post-${page.title}-container-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                  >
                                    {block.sectionTitle !== null && (
                                      <SidebarTitle>
                                        {block.sectionTitle}
                                      </SidebarTitle>
                                    )}
                                    <Content
                                      key={`post-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                      data={sidebarBlock}
                                    />
                                  </Card>
                                </Column>
                              );
                            break;
                          case 'ContainerBlock':
                            return (
                              <Container
                                key={`post-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
                                id={newIndex}
                                page={page}
                                data={sidebarBlock}
                              />
                            );
                          case 'SpacerBlock':
                            return <Spacer data={sidebarBlock} />;
                          default:
                            return true;
                        }
                      })}
                  </>
                );
              default:
                return null;
            }
          })}
      </>
    );
  }

  return null;
}

const Column = styled.div`
  padding: 32px 0;
`;

const Card = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 2px 3px 5px 0px #e8e8e8;
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
