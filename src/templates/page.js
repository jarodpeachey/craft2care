/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import Form, { FormBlock } from '../blocks/form';
import { Title, TitleBlock } from '../blocks/title';
import { Image, ImageBlock } from '../blocks/image';
import { Content, ContentBlock } from '../blocks/content';
import { Button, ButtonBlock } from '../blocks/button';
import { Posts, PostsBlock } from '../blocks/posts';
import { Container, ContainerBlock } from '../blocks/container';
import { Grid, GridBlock } from '../blocks/grid';
import { Spacer, SpacerBlock } from '../blocks/spacer';
import { PageLayout } from '../components/pageLayout';

export default function Page({ data }) {
  const [page] = useLocalJsonForm(data.page, PageForm);
  const blocks = page.blocks ? page.blocks : [];

  return (
    <PageLayout page={page}>
      {/* {!page.hero.showHero && <Spacer height={58} />} */}
      {blocks &&
        blocks.map(({ _template, ...block }, index) => {
          // console.log('BLOCK: ', block);
          switch (_template) {
            case 'ContainerBlock':
              return (
                <Wrapper
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
                  //       }
                  // }
                >
                  <Container id={index} page={page} data={block} />
                </Wrapper>
              );
            case 'TitleBlock':
              return (
                <Wrapper
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
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
                  <Title page={page} data={block} />
                </Wrapper>
              );
            case 'SpacerBlock':
              return (
                <Wrapper
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
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
            case 'ButtonBlock':
              return (
                <Wrapper
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
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
                  <Button data={block} />
                </Wrapper>
              );
            case 'ImageBlock':
              return (
                <Wrapper
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
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
                  <Image data={block} />
                </Wrapper>
              );
            case 'FormBlock':
              return (
                <Wrapper
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
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
                  <Form form={block} />
                </Wrapper>
              );
            case 'ContentBlock':
              if (block.content)
                return (
                  <Wrapper
                    className={
                      index === 0 && index === blocks.length - 1
                        ? 'container section'
                        : index === 0
                        ? 'container top'
                        : index === blocks.length - 1
                        ? 'container bottom'
                        : 'container'
                    }
                    key={`page-${page.title}-container-${_template}-block-${index}`}
                    // padding={
                    //   block.blockPadding ? block.blockPadding.paddingTop : 0
                    // }
                    // margin={block.blockMargin ? block.blockMargin.marginTop : 0}
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
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
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
                  <Posts data={block} />
                </Wrapper>
              );
            case 'GridBlock':
              return (
                <Wrapper
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
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
    </PageLayout>
  );
}

const Wrapper = styled.div`
  // padding-top: ${props => props.padding.paddingTop}px;
  // padding-bottom: ${props => props.padding.paddingBottom}px;
  // padding-right: ${props => props.padding.paddingRight}px;
  // padding-left: ${props => props.padding.paddingLeft}px;
  // margin-top: ${props => props.margin.marginTop}px;
  // margin-bottom: ${props => props.margin.marginBottom}px;
  // margin-right: ${props => props.margin.marginRight}px;
  // margin-left: ${props => props.margin.marginLeft}px;
`;

const PageForm = {
  label: 'Page',
  fields: [
    {
      label: 'Title',
      name: 'rawJson.title',
      component: 'text'
    },
    {
      label: 'Hero',
      name: 'rawJson.hero',
      component: 'group',
      fields: [
        {
          label: 'Show Hero',
          name: 'showHero',
          component: 'toggle',
          defaultValue: true
        },
        {
          label: 'Height',
          name: 'height',
          component: 'rangeNumber',
          defaultValue: 250
        },
        {
          label: 'Headline',
          name: 'headline',
          component: 'text'
        },
        {
          label: 'Headline Color',
          name: 'headlineColor',
          component: 'text',
          description: 'Primary, secondary or custom hex code (#555)'
        },
        {
          label: 'Textline',
          name: 'textline',
          component: 'text'
        },
        {
          label: 'Textline Color',
          name: 'textlineColor',
          component: 'text',
          description: 'Primary, secondary or custom hex code (#555)'
        },
        {
          label: 'Image',
          name: 'image',
          component: 'image',
          parse: filename => `../images/${filename}`,
          uploadDir: () => '/content/images/',
          previewSrc: formValues => {
            if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
              return '';
            return formValues.jsonNode.hero.image.childImageSharp.fluid.src;
          }
        },
        {
          label: 'Overlay',
          description: 'Show overlay on hero',
          name: 'overlay',
          component: 'toggle'
        },
        {
          label: 'Overlay Color',
          name: 'overlayColor',
          component: 'color'
        },
        {
          label: 'Center',
          name: 'center',
          component: 'toggle'
        },
        {
          label: 'Actions',
          name: 'ctas',
          component: 'group-list',
          itemProps: item => ({
            key: item.link,
            label: item.label
          }),
          fields: [
            {
              label: 'Label',
              name: 'label',
              component: 'text'
            },
            {
              label: 'Link',
              name: 'link',
              component: 'text'
            },
            {
              label: 'Background Color',
              name: 'backgroundColor',
              component: 'text',
              description: 'Primary or Secondary'
            }
          ]
        }
      ]
    },
    {
      label: 'Page Sections',
      name: 'rawJson.blocks',
      component: 'blocks',
      templates: {
        TitleBlock,
        ImageBlock,
        FormBlock,
        ContentBlock,
        ContainerBlock,
        ButtonBlock,
        GridBlock,
        SpacerBlock,
        PostsBlock
      }
    }
  ]
};

export const pageQuery = graphql`
  query($path: String!) {
    page: pagesJson(path: { eq: $path }) {
      title
      displayTitle
      hero {
        showHero
        height
        headline
        textline
        headlineColor
        textlineColor
        center
        overlay
        overlayColor
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ctas {
          label
          link
          backgroundColor
        }
      }
      blocks {
        _template
        content
        background
        name
        title
        buttonText
        height
        style
        left
        right
        buttonLink
        buttonColor
        underline
        center
        recipient
        itemsToShow
        maxNumberOfColumns
        demo
        columnSpacing
        containerBlocks {
          _template
          content
          background
          name
          title
          underline
          center
          recipient
          itemsToShow
          maxNumberOfColumns
          demo
          columnSpacing
          columns {
            _template
            content
            background
            name
            title
            underline
            center
            recipient
            itemsToShow
            maxNumberOfColumns
            demo
            columnSpacing
            widthOne
            widthTwo
            buttonText
            height
            style
            left
            right
            buttonLink
            buttonColor
            columnBlocks {
              _template
              content
              background
              name
              title
              underline
              center
              recipient
              itemsToShow
              maxNumberOfColumns
              demo
              columnSpacing
              widthOne
              widthTwo
              buttonText
              height
              style
              left
              right
              buttonLink
              buttonColor
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          buttonText
          height
          style
          left
          right
          buttonLink
          buttonColor
        }
        columns {
          _template
          content
          background
          name
          title
          underline
          center
          recipient
          itemsToShow
          maxNumberOfColumns
          demo
          widthOne
          widthTwo
          columnSpacing
          buttonText
          height
          style
          left
          right
          buttonLink
          buttonColor
          columnBlocks {
            _template
            content
            background
            name
            title
            underline
            center
            recipient
            itemsToShow
            maxNumberOfColumns
            demo
            widthOne
            widthTwo
            buttonText
            height
            style
            left
            right
            buttonLink
            buttonColor
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        fields {
          label
          inputType
          autocomplete
        }
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }

      rawJson
      fileRelativePath
    }
  }
`;
