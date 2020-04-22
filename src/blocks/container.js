/* eslint-disable react/jsx-fragments */
import React from 'react';
import styled, { css } from 'styled-components';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { Title, TitleBlock } from './title';
import { Button, ButtonBlock } from './button';
import { Image, ImageBlock } from './image';
import { Content, ContentBlock } from './content';
import { Posts, PostsBlock } from './posts';
import { Grid, GridBlock } from './grid';
import { Spacer, SpacerBlock } from './spacer';
import { useStaticQuery } from 'gatsby';

export function Container({ page, data, id }) {
  const background = data.background ? data.background : '#fff';
  const blocks = data.containerBlocks ? data.containerBlocks : [];

  if (blocks.length > 0) {
    return (
      <>
        <StyledContainer background={background}>
          <div className='container section'>
            {blocks &&
              blocks.map(({ _template, ...block }, index) => {
                switch (_template) {
                  case 'SpacerBlock':
                    return <Spacer height={block.height} />;
                  case 'TitleBlock':
                    return (
                      <Wrapper
                        key={`page-${page.title}-container-${_template}-block-${index}`}
                        // padding={
                        //   block.blockPadding ? block.blockPadding.paddingTop : 0
                        // }
                        // margin={
                        //   block.blockMargin ? block.blockMargin.marginTop : 0
                        // }
                      >
                        <Title page={page} data={block} />
                      </Wrapper>
                    );
                  case 'ButtonBlock':
                    return (
                      <Wrapper
                        key={`page-${page.title}-container-${_template}-block-${index}`}
                        // padding={
                        //   block.blockPadding ? block.blockPadding.paddingTop : 0
                        // }
                        // margin={
                        //   block.blockMargin ? block.blockMargin.marginTop : 0
                        // }
                      >
                        <Button data={block} />
                      </Wrapper>
                    );
                  case 'ImageBlock':
                    return (
                      <Wrapper
                        key={`page-${page.title}-container-${_template}-block-${index}`}
                        // padding={
                        //   block.blockPadding ? block.blockPadding.paddingTop : 0
                        // }
                        // margin={
                        //   block.blockMargin ? block.blockMargin.marginTop : 0
                        // }
                      >
                        <Image data={block} />
                      </Wrapper>
                    );
                  case 'ContentBlock':
                    if (block.content)
                      return (
                        <Wrapper
                          key={`page-${page.title}-container-${_template}-block-${index}`}
                          // padding={
                          //   block.blockPadding ? block.blockPadding.paddingTop : 0
                          // }
                          // margin={
                          //   block.blockMargin ? block.blockMargin.marginTop : 0
                          // }
                        >
                          <Content
                            key={`page-${page.title}-${_template}-block-${index}`}
                            data={block}
                          />
                        </Wrapper>
                      );
                    break;
                  case 'PostsBlock':
                    return (
                      <Wrapper
                        key={`page-${page.title}-container-${_template}-block-${index}`}
                        // padding={
                        //   block.blockPadding ? block.blockPadding.paddingTop : 0
                        // }
                        // margin={
                        //   block.blockMargin ? block.blockMargin.marginTop : 0
                        // }
                      >
                        <Posts data={block} />
                      </Wrapper>
                    );
                  case 'GridBlock':
                    return (
                      <Wrapper
                        key={`page-${page.title}-grid-${_template}-block-${index}`}
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
                        <Grid page={page} data={block} />
                      </Wrapper>
                    );
                  default:
                    return true;
                }
                return null;
              })}
          </div>
        </StyledContainer>
      </>
    );
  } else {
    console.log('Returning null');
    return null;
  }
}

const Wrapper = styled.div`
  // padding-top: ${(props) => props.padding.paddingTop}px !important;
  // padding-bottom: ${(props) => props.padding.paddingBottom}px !important;
  // padding-right: ${(props) => props.padding.paddingRight}px !important;
  // padding-left: ${(props) => props.padding.paddingLeft}px !important;
  // margin-top: ${(props) => props.margin.marginTop}px !important;
  // margin-bottom: ${(props) => props.margin.marginBottom}px !important;
  // margin-right: ${(props) => props.margin.marginRight}px !important;
  // margin-left: ${(props) => props.margin.marginLeft}px !important;
`;

const StyledContainer = styled.div`
  background: #${(props) => props.background};
`;

export const ContainerBlock = {
  label: 'Container',
  name: 'container',
  defaultItem: {
    background: 'f7f7f7',
  },
  fields: [
    {
      name: 'background',
      label: 'Background',
      component: 'text',
      defaultValue: '#f7f7f7',
    },
    {
      label: 'Container Sections',
      name: 'containerBlocks',
      component: 'blocks',
      templates: {
        TitleBlock,
        ImageBlock,
        ContentBlock,
        PostsBlock,
        ButtonBlock,
        GridBlock,
        SpacerBlock,
      },
    },
  ],
};
