/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/display-name */
import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form, { FormBlock } from '../blocks/form';
import { Title, TitleBlock } from '../blocks/title';
import { Image, ImageBlock } from '../blocks/image';
import { Content, ContentBlock } from '../blocks/content';
import { Container, ContainerBlock } from '../blocks/container';
import { Button, ButtonBlock } from '../blocks/button';
import { Spacer, SpacerBlock } from '../blocks/spacer';
import { PageLayout } from '../components/pageLayout';
import { ListAuthors } from '../components/authors';
import { ListCategories } from '../components/categories';
import { formatDate } from '../utils/formatDate';
// import { useAuthors } from '../components/useAuthors';

export default function ({ data, ...props }) {
  const newDate = data.post.date;

  const [post] = useLocalJsonForm(
    data.post,
    PostForm(data.authors.authors, data.categories.categories, newDate)
  );

  // console.log(post);

  const blocks = post.blocks ? post.blocks : [];

  const authors = ListAuthors(data.post.authors);
  const categories = ListCategories(data.post.categories);

  console.log(post);

  return (
    <PageLayout page={post}>
      {!post.hero.showHero && <Spacer height={58} />}{' '}
      <div className='container top p-relative'>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostLink to='/blog'>
            <PostIcon>
              <FontAwesomeIcon icon='arrow-left' />
            </PostIcon>{' '}
            Back to Blog
          </PostLink>
        </PostHeader>
        <Meta>
          <MetaSpan>{formatDate(post.date)}</MetaSpan>
          {authors && authors.length > 0 && (
            <MetaSpan>
              <em>By</em>&nbsp;
              {authors.map((author) => (
                <span>{author.name}</span>
              ))}
            </MetaSpan>
          )}
          {categories && categories.length > 0 && (
            <MetaSpan>
              <em>By</em>&nbsp;
              {categories.map((category) => (
                <span>{category.name}</span>
              ))}
            </MetaSpan>
          )}
        </Meta>
      </div>
      {blocks &&
        blocks.map(({ _template, ...block }, index) => {
          switch (_template) {
            case 'ParamBlock':
              return <Param />;
            case 'TitleBlock':
              return (
                <div
                  key={`post-${post.title}-${_template}-block-${index}`}
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
                >
                  <Title post={post} data={block} />
                </div>
              );
            case 'ButtonBlock':
              return (
                <div
                  key={`post-${post.title}-${_template}-block-${index}`}
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
                >
                  <Button data={block} />
                </div>
              );
            case 'ImageBlock':
              return (
                <div
                  key={`post-${post.title}-${_template}-block-${index}`}
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
                >
                  <Image data={block} />
                </div>
              );
            case 'FormBlock':
              return (
                <div
                  key={`post-${post.title}-${_template}-block-${index}`}
                  className={
                    index === 0 && index === blocks.length - 1
                      ? 'container section'
                      : index === 0
                      ? 'container top'
                      : index === blocks.length - 1
                      ? 'container bottom'
                      : 'container'
                  }
                >
                  <Form form={block} />
                </div>
              );
            case 'ContentBlock':
              if (block.content)
                return (
                  <div
                    key={`post-${post.title}-container-${_template}-block-${index}`}
                    className={
                      index === 0 && index === blocks.length - 1
                        ? 'container section'
                        : index === 0
                        ? 'container top'
                        : index === blocks.length - 1
                        ? 'container bottom'
                        : 'container'
                    }
                  >
                    <Content
                      key={`post-${post.title}-${_template}-block-${index}`}
                      data={block}
                    />
                  </div>
                );
              break;
            case 'ContainerBlock':
              return (
                <Container
                  key={`post-${post.title}-${_template}-block-${index}`}
                  id={index}
                  post={post}
                  data={block}
                />
              );
            case 'SpacerBlock':
              return <Spacer data={block} />;
            default:
              return true;
          }
        })}
    </PageLayout>
  );
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

const Meta = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  a:not(:hover) {
    text-decoration: none;
  }
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const MetaActions = styled.span`
  opacity: 1;
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const MetaSpan = styled.span`
  justify-self: flex-start;
  opacity: 0.5;
  position: relative;
  em {
    font-style: normal;
    opacity: 0.5;
  }
  svg {
    opacity: 0.5;
    width: 1.4em;
    margin-top: -0.2em;
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
  &:not(:last-child) {
    margin-right: 1em;
  }
  &:not(:first-child) {
    padding-left: 1rem;
    &:before {
      content: '—';
      position: absolute;
      opacity: 0.5;
      left: 0;
      transform: translate3d(-50%, 0, 0);
    }
  }
  &:last-child {
    flex: 1 0 auto;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PostTitle = styled.h1`
  width: fit-content;
  margin-bottom: 0;
`;

const PostLink = styled(Link)`
  width: 100%;
  text-align: right;
  text-decoration: none;
  margin-left: auto;
  color: ${(props) => props.theme.color.primary};
  height: 44px;
  display: flex;
  width: fit-content;
  align-items: center;
`;

const PostIcon = styled.span`
  position: relative;
  top: 1px;
  margin-right: 8px;
`;

const PostForm = (authors, categories, post) => {
  console.log(categories);

  return {
    // actions: [DeleteAction],
    label: 'Post',
    fields: [
      {
        label: 'Title',
        name: 'rawJson.title',
        component: 'text',
      },
      {
        label: 'Authors',
        name: 'rawJson.authors',
        component: 'authors',
        authors,
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
        ],
      },
      {
        name: 'rawJson.draft',
        component: 'toggle',
        label: 'Draft',
      },
      {
        label: 'Date',
        name: 'rawJson.date',
        component: 'date',
        defaultValue: post && post.date ? post.date : '',
      },
      {
        label: 'Post Content',
        name: 'rawJson.blocks',
        component: 'blocks',
        templates: {
          TitleBlock,
          ImageBlock,
          FormBlock,
          ContentBlock,
          ContainerBlock,
          ButtonBlock,
          SpacerBlock,
        },
      },
    ],
  };
};

export const postQuery = graphql`
  query($path: String!) {
    post: postsJson(draft: { eq: false }, path: { eq: $path }) {
      title
      authors
      categories
      date
      hero {
        showHero
        height
        overlayColor
        overlay
        center
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      blocks {
        _template
        content
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
        categories
        demo
        columnSpacing
        widthOne
        widthTwo
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
          categories
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
            categories
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
    authors: settingsJson(
      fileRelativePath: { eq: "/content/settings/authors.json" }
    ) {
      authors {
        email
        name
        id
        link
      }
    }
    categories: settingsJson(
      fileRelativePath: { eq: "/content/settings/categories.json" }
    ) {
      categories {
        name
        id
      }
    }
  }
`;
