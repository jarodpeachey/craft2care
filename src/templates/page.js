/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { Title, TitleBlock } from '../blocks/title';
import { Image, ImageBlock } from '../blocks/image';
import { Content, ContentBlock } from '../blocks/content';
import { Button, ButtonBlock } from '../blocks/button';
import { Posts, PostsBlock } from '../blocks/posts';
import { Container, ContainerBlock } from '../blocks/container';
import { Sidebar, SidebarBlock } from '../blocks/sidebar';
import { Grid, GridBlock } from '../blocks/grid';
import { Spacer, SpacerBlock } from '../blocks/spacer';
import { PageLayout } from '../components/pageLayout';
import Row from '../components/grid/row';
import { AppContext } from '../components/AppProvider';

export default function Page({ data }) {
  const [page] = useLocalJsonForm(data.page, PageForm);
  const blocks = page.blocks ? page.blocks : [];
  const sections =
    page.sidebar && page.sidebar.sidebarSections
      ? page.sidebar.sidebarSections
      : [];

  const { setBreadcrumb } = useContext(AppContext);

  useEffect(() => {
    setBreadcrumb(typeof window !== 'undefined' && window.location.pathname);
  }, []);

  return (
    <PageLayout page={page}>
      {page.sidebar &&
      page.sidebar.showSidebar &&
      sections.length > 0 &&
      sections[0].sidebarBlocks &&
      sections[0].sidebarBlocks.length > 0 ? (
        <div className='container top bottom'>
          <Row spacing={[20, 0]} breakpoints={[769]}>
            <div widths={[8]}>
              {blocks
                ? blocks.map(({ _template, ...block }, index) => {
                    // console.log('BLOCK: ', block);
                    switch (_template) {
                      case 'ContainerBlock':
                        return (
                          <Wrapper
                            key={`page-${page.title}-container-${_template}-block-${index}`}
                          >
                            <Container id={index} page={page} data={block} />
                          </Wrapper>
                        );
                      case 'TitleBlock':
                        return (
                          <Wrapper
                            key={`page-${page.title}-container-${_template}-block-${index}`}
                          >
                            <Title page={page} data={block} />
                          </Wrapper>
                        );
                      case 'SpacerBlock':
                        return (
                          <Wrapper
                            key={`page-${page.title}-container-${_template}-block-${index}`}
                          >
                            <Spacer data={block} />
                          </Wrapper>
                        );
                      case 'ButtonBlock':
                        return (
                          <Wrapper
                            key={`page-${page.title}-container-${_template}-block-${index}`}
                          >
                            <Button data={block} />
                          </Wrapper>
                        );
                      case 'ImageBlock':
                        return (
                          <Wrapper
                            key={`page-${page.title}-container-${_template}-block-${index}`}
                          >
                            <Image data={block} />
                          </Wrapper>
                        );
                      case 'ContentBlock':
                        if (block.content)
                          return (
                            <Wrapper
                              key={`page-${page.title}-container-${_template}-block-${index}`}
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
                          >
                            <Posts data={block} />
                          </Wrapper>
                        );
                      case 'GridBlock':
                        return (
                          <Wrapper
                            key={`page-${page.title}-grid-${_template}-block-${index}`}
                          >
                            <Grid page={page} data={block} />
                          </Wrapper>
                        );
                      default:
                        return true;
                    }
                  })
                : null}
            </div>
            <div widths={[4]}>
              <Sidebar page={page} sections={sections} />
            </div>
          </Row>
        </div>
      ) : (
        <div>
          {blocks
            ? blocks.map(({ _template, ...block }, index) => {
                // console.log('BLOCK: ', block);
                switch (_template) {
                  case 'ContainerBlock':
                    return (
                      <Wrapper
                        key={`page-${page.title}-container-${_template}-block-${index}`}
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
                      >
                        <Image data={block} />
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
                      >
                        <Grid page={page} data={block} />
                      </Wrapper>
                    );
                  default:
                    return true;
                }
              })
            : null}
        </div>
      )}
    </PageLayout>
  );
}

const Wrapper = styled.div`
  // padding-top: ${(props) => props.padding.paddingTop}px;
  // padding-bottom: ${(props) => props.padding.paddingBottom}px;
  // padding-right: ${(props) => props.padding.paddingRight}px;
  // padding-left: ${(props) => props.padding.paddingLeft}px;
  // margin-top: ${(props) => props.margin.marginTop}px;
  // margin-bottom: ${(props) => props.margin.marginBottom}px;
  // margin-right: ${(props) => props.margin.marginRight}px;
  // margin-left: ${(props) => props.margin.marginLeft}px;
`;

const PageForm = {
  label: 'Page',
  fields: [
    {
      label: 'Title',
      name: 'rawJson.title',
      component: 'text',
    },
    {
      label: 'Sidebar',
      name: 'rawJson.sidebar',
      component: 'group',
      fields: [
        {
          label: 'Show Sidebar',
          name: 'showSidebar',
          component: 'toggle',
          defaultValue: true,
        },
        {
          label: 'Sections',
          name: 'sidebarSections',
          component: 'blocks',
          templates: {
            SidebarBlock,
          },
        },
      ],
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
          defaultValue: true,
        },
        {
          label: 'Height',
          name: 'height',
          component: 'rangeNumber',
          defaultValue: 250,
        },
        {
          label: 'Headline',
          name: 'headline',
          component: 'text',
        },
        {
          label: 'Headline Color',
          name: 'headlineColor',
          component: 'text',
          description: 'Primary, secondary or custom hex code (#555)',
        },
        {
          label: 'Textline',
          name: 'textline',
          component: 'text',
        },
        {
          label: 'Textline Color',
          name: 'textlineColor',
          component: 'text',
          description: 'Primary, secondary or custom hex code (#555)',
        },
        {
          label: 'Image',
          name: 'image',
          component: 'image',
          parse: (filename) => `../images/${filename}`,
          uploadDir: () => '/content/images/',
          previewSrc: (formValues) => {
            if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
              return '';
            return formValues.jsonNode.hero.image.childImageSharp.fluid.src;
          },
        },
        {
          label: 'Overlay',
          description: 'Show overlay on hero',
          name: 'overlay',
          component: 'toggle',
        },
        {
          label: 'Overlay Color',
          name: 'overlayColor',
          component: 'color',
        },
        {
          label: 'Center',
          name: 'center',
          component: 'toggle',
        },
        {
          label: 'Actions',
          name: 'ctas',
          component: 'group-list',
          itemProps: (item) => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: 'Label',
              name: 'label',
              component: 'text',
            },
            {
              label: 'Link',
              name: 'link',
              component: 'text',
            },
            {
              label: 'Background Color',
              name: 'backgroundColor',
              component: 'text',
              description: 'Primary or Secondary',
            },
          ],
        },
      ],
    },
    {
      label: 'Page Sections',
      name: 'rawJson.blocks',
      component: 'blocks',
      templates: {
        TitleBlock,
        ImageBlock,
        ContentBlock,
        ContainerBlock,
        ButtonBlock,
        GridBlock,
        SpacerBlock,
        PostsBlock,
      },
    },
  ],
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
        background
        name
        title
        type
        content
        sectionTitle
        buttonText
        height
        style
        left
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        right
        rounded
        maxWidth
        center
        buttonLink
        buttonColor
        underline
        recipient
        itemsToShow
        maxNumberOfColumns
        categories
        demo
        columnSpacing
        widthOne
        widthTwo
        containerBlocks {
          _template
          background
          name
          title
          type
          content
          sectionTitle
          buttonText
          height
          style
          left
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          right
          rounded
          maxWidth
          center
          buttonLink
          buttonColor
          underline
          recipient
          itemsToShow
          maxNumberOfColumns
          categories
          demo
          columnSpacing
          widthOne
          widthTwo
          columns {
            _template
            background
            name
            title
            type
            content
            sectionTitle
            buttonText
            height
            style
            left
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            right
            rounded
            maxWidth
            center
            buttonLink
            buttonColor
            underline
            recipient
            itemsToShow
            maxNumberOfColumns
            categories
            demo
            columnSpacing
            widthOne
            widthTwo
            columnBlocks {
              _template
              background
              name
              title
              type
              content
              sectionTitle
              buttonText
              height
              style
              left
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              right
              rounded
              maxWidth
              center
              buttonLink
              buttonColor
              underline
              recipient
              itemsToShow
              maxNumberOfColumns
              categories
              demo
              columnSpacing
              widthOne
              widthTwo
            }
          }
        }
        columns {
          _template
          background
          name
          title
          type
          content
          sectionTitle
          buttonText
          height
          style
          left
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          right
          rounded
          maxWidth
          center
          buttonLink
          buttonColor
          underline
          recipient
          itemsToShow
          maxNumberOfColumns
          categories
          demo
          columnSpacing
          widthOne
          widthTwo
          columnBlocks {
            _template
            background
            name
            title
            type
            content
            sectionTitle
            buttonText
            height
            style
            left
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            right
            rounded
            maxWidth
            center
            buttonLink
            buttonColor
            underline
            recipient
            itemsToShow
            maxNumberOfColumns
            categories
            demo
            columnSpacing
            widthOne
            widthTwo
          }
        }
      }
      sidebar {
        showSidebar
        _template
        background
        name
        title
        type
        content
        sectionTitle
        buttonText
        height
        style
        left
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        right
        rounded
        maxWidth
        center
        buttonLink
        buttonColor
        underline
        recipient
        itemsToShow
        maxNumberOfColumns
        categories
        demo
        columnSpacing
        widthOne
        widthTwo
        containerBlocks {
          _template
          background
          name
          title
          type
          content
          sectionTitle
          buttonText
          height
          style
          left
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          right
          rounded
          maxWidth
          center
          buttonLink
          buttonColor
          underline
          recipient
          itemsToShow
          maxNumberOfColumns
          categories
          demo
          columnSpacing
          widthOne
          widthTwo
          columns {
            _template
            background
            name
            title
            type
            content
            sectionTitle
            buttonText
            height
            style
            left
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            right
            rounded
            maxWidth
            center
            buttonLink
            buttonColor
            underline
            recipient
            itemsToShow
            maxNumberOfColumns
            categories
            demo
            columnSpacing
            widthOne
            widthTwo
            columnBlocks {
              _template
              background
              name
              title
              type
              content
              sectionTitle
              buttonText
              height
              style
              left
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              right
              rounded
              maxWidth
              center
              buttonLink
              buttonColor
              underline
              recipient
              itemsToShow
              maxNumberOfColumns
              categories
              demo
              columnSpacing
              widthOne
              widthTwo
            }
          }
        }
        columns {
          _template
          background
          name
          title
          type
          content
          sectionTitle
          buttonText
          height
          style
          left
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          right
          rounded
          maxWidth
          center
          buttonLink
          buttonColor
          underline
          recipient
          itemsToShow
          maxNumberOfColumns
          categories
          demo
          columnSpacing
          widthOne
          widthTwo
          columnBlocks {
            _template
            background
            name
            title
            type
            content
            sectionTitle
            buttonText
            height
            style
            left
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            right
            rounded
            maxWidth
            center
            buttonLink
            buttonColor
            underline
            recipient
            itemsToShow
            maxNumberOfColumns
            categories
            demo
            columnSpacing
            widthOne
            widthTwo
          }
        }
        sidebarSections {
          showSidebar
          _template
          background
          name
          title
          type
          content
          sectionTitle
          buttonText
          height
          style
          left
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          right
          rounded
          maxWidth
          center
          buttonLink
          buttonColor
          underline
          recipient
          itemsToShow
          maxNumberOfColumns
          categories
          demo
          columnSpacing
          widthOne
          widthTwo
          containerBlocks {
            _template
            background
            name
            title
            type
            content
            sectionTitle
            buttonText
            height
            style
            left
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            right
            rounded
            maxWidth
            center
            buttonLink
            buttonColor
            underline
            recipient
            itemsToShow
            maxNumberOfColumns
            categories
            demo
            columnSpacing
            widthOne
            widthTwo
            columns {
              _template
              background
              name
              title
              type
              content
              sectionTitle
              buttonText
              height
              style
              left
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              right
              rounded
              maxWidth
              center
              buttonLink
              buttonColor
              underline
              recipient
              itemsToShow
              maxNumberOfColumns
              categories
              demo
              columnSpacing
              widthOne
              widthTwo
              columnBlocks {
                _template
                background
                name
                title
                type
                content
                sectionTitle
                buttonText
                height
                style
                left
                image {
                  childImageSharp {
                    fluid(quality: 70, maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                right
                rounded
                maxWidth
                center
                buttonLink
                buttonColor
                underline
                recipient
                itemsToShow
                maxNumberOfColumns
                categories
                demo
                columnSpacing
                widthOne
                widthTwo
              }
            }
          }
          columns {
            _template
            background
            name
            title
            type
            content
            sectionTitle
            buttonText
            height
            style
            left
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            right
            rounded
            maxWidth
            center
            buttonLink
            buttonColor
            underline
            recipient
            itemsToShow
            maxNumberOfColumns
            categories
            demo
            columnSpacing
            widthOne
            widthTwo
            columnBlocks {
              _template
              background
              name
              title
              type
              content
              sectionTitle
              buttonText
              height
              style
              left
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              right
              rounded
              maxWidth
              center
              buttonLink
              buttonColor
              underline
              recipient
              itemsToShow
              maxNumberOfColumns
              categories
              demo
              columnSpacing
              widthOne
              widthTwo
            }
          }
          sidebarBlocks {
            showSidebar
            _template
            background
            name
            title
            type
            content
            sectionTitle
            buttonText
            height
            style
            left
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            right
            rounded
            maxWidth
            center
            buttonLink
            buttonColor
            underline
            recipient
            itemsToShow
            maxNumberOfColumns
            categories
            demo
            columnSpacing
            widthOne
            widthTwo
            containerBlocks {
              _template
              background
              name
              title
              type
              content
              sectionTitle
              buttonText
              height
              style
              left
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              right
              rounded
              maxWidth
              center
              buttonLink
              buttonColor
              underline
              recipient
              itemsToShow
              maxNumberOfColumns
              categories
              demo
              columnSpacing
              widthOne
              widthTwo
              columns {
                _template
                background
                name
                title
                type
                content
                sectionTitle
                buttonText
                height
                style
                left
                image {
                  childImageSharp {
                    fluid(quality: 70, maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                right
                rounded
                maxWidth
                center
                buttonLink
                buttonColor
                underline
                recipient
                itemsToShow
                maxNumberOfColumns
                categories
                demo
                columnSpacing
                widthOne
                widthTwo
                columnBlocks {
                  _template
                  background
                  name
                  title
                  type
                  content
                  sectionTitle
                  buttonText
                  height
                  style
                  left
                  image {
                    childImageSharp {
                      fluid(quality: 70, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  right
                  rounded
                  maxWidth
                  center
                  buttonLink
                  buttonColor
                  underline
                  recipient
                  itemsToShow
                  maxNumberOfColumns
                  categories
                  demo
                  columnSpacing
                  widthOne
                  widthTwo
                }
              }
            }
            columns {
              _template
              background
              name
              title
              type
              content
              sectionTitle
              buttonText
              height
              style
              left
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              right
              rounded
              maxWidth
              center
              buttonLink
              buttonColor
              underline
              recipient
              itemsToShow
              maxNumberOfColumns
              categories
              demo
              columnSpacing
              widthOne
              widthTwo
              columnBlocks {
                _template
                background
                name
                title
                type
                content
                sectionTitle
                buttonText
                height
                style
                left
                right
                rounded
                maxWidth
                center
                buttonLink
                buttonColor
                underline
                recipient
                itemsToShow
                maxNumberOfColumns
                categories
                demo
                columnSpacing
                widthOne
                widthTwo
              }
            }
          }
        }
      }

      rawJson
      fileRelativePath
    }
    categories: settingsJson(
      fileRelativePath: { eq: "/content/settings/categories.json" }
    ) {
      name
      id
    }
    author: settingsJson(
      fileRelativePath: { eq: "/content/settings/author.json" }
    ) {
      name
      email
    }
  }
`;
