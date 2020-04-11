/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from 'gatsby-image';
import Form, { FormBlock } from '../blocks/form';
import { Title, TitleBlock } from '../blocks/title';
import { Image, ImageBlock } from '../blocks/image';
import { Content, ContentBlock } from '../blocks/content';
import { Button, ButtonBlock } from '../blocks/button';
import { Posts, PostsBlock } from '../blocks/posts';
import { Container, ContainerBlock } from '../blocks/container';
import { Sidebar, SidebarBlock } from '../blocks/sidebar';
import { Spacer, SpacerBlock } from '../blocks/spacer';
import { PostLayout } from '../components/postLayout';
import { ListCategories } from '../components/categories';
import { formatDate } from '../utils/formatDate';
import Row from '../components/grid/row';
import { ThemeContext } from '../components/theme';
import { Grid, GridBlock } from '../blocks/grid';
import Comments from '../components/Comments';

export default function ({ data, ...props }) {
  console.log(data);

  const { theme } = useContext(ThemeContext);
  const newDate = data.post.date;

  const [post] = useLocalJsonForm(
    data.post,
    PostForm(data.categories.categories, newDate)
  );

  // console.log(post);

  const blocks = post.blocks ? post.blocks : [];
  console.log(post);
  const sections =
    post.sidebar && post.sidebar.sidebarSections
      ? post.sidebar.sidebarSections
      : [];

  const categories = ListCategories(data.post.categories);

  const author = data.settingsJson;

  return (
    <PostLayout post={post}>
      {post.sidebar &&
      post.sidebar.showSidebar &&
      post.sidebar.sidebarSections.length > 0 ? (
        <div className='container top bototm'>
          <Row spacing={[28, 12]} breakpoints={[769]}>
            <div widths={[8]}>
              <Row spacing={[0, 28]} breakpoints={[769]}>
                <div widths={[12]}>
                  <Card>
                    <PostImage
                      fluid={
                        post.image
                          ? post.image.childImageSharp.fluid
                          : theme.hero.image.childImageSharp.fluid // WORK TO DO
                      }
                    />
                    <PostHeader>
                      <PostTitle>{post.title}</PostTitle>
                      <PostLink to='/blog'>
                        <PostIcon>
                          <FontAwesomeIcon icon='arrow-left' />
                        </PostIcon>{' '}
                        Back to Blog
                      </PostLink>
                    </PostHeader>
                    <PostDate>{newDate}</PostDate>
                    {theme && theme.length > 0 && (
                      <PostAuthor>
                        {' - '}
                        <em>By</em>&nbsp;
                        <span>{author.name}</span>
                      </PostAuthor>
                    )}
                    {categories && categories.length > 0 && (
                      <PostCategories>
                        {categories.map((category) => {
                          return <PostCategory>{category.name}</PostCategory>;
                        })}
                      </PostCategories>
                    )}
                    <Spacer height={48} />
                    {blocks &&
                      blocks.map(({ _template, ...block }, index) => {
                        switch (_template) {
                          case 'TitleBlock':
                            return (
                              <div
                                key={`post-${post.title}-${_template}-block-${index}`}
                              >
                                <Title page={post} data={block} />
                              </div>
                            );
                          case 'ButtonBlock':
                            return (
                              <div
                                key={`post-${post.title}-${_template}-block-${index}`}
                              >
                                <Button data={block} />
                              </div>
                            );
                          case 'ImageBlock':
                            return (
                              <div
                                key={`post-${post.title}-${_template}-block-${index}`}
                              >
                                <Image data={block} />
                              </div>
                            );
                          case 'FormBlock':
                            return (
                              <div
                                key={`post-${post.title}-${_template}-block-${index}`}
                              >
                                <Form form={block} />
                              </div>
                            );
                          case 'GridBlock':
                            return (
                              <div
                                key={`post-${post.title}-${_template}-block-${index}`}
                              >
                                <Grid page={post} data={block} />
                              </div>
                            );
                          case 'ContentBlock':
                            if (block.content)
                              return (
                                <div
                                  key={`post-${post.title}-container-${_template}-block-${index}`}
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
                                page={post}
                                data={block}
                              />
                            );
                          case 'SpacerBlock':
                            return <Spacer data={block} />;
                          default:
                            return true;
                        }
                      })}
                  </Card>
                </div>
                <div widths={[12]}>
                  <Comments comments={[]} />
                </div>
              </Row>
            </div>
            <div widths={[4]}>
              <Sidebar page={post} sections={sections} />
            </div>
          </Row>
        </div>
      ) : (
        <div className='container top bottom'>
          <Card>
            <PostImage
              fluid={
                post.image
                  ? post.image.childImageSharp.fluid
                  : theme.hero.image.childImageSharp.fluid // WORK TO DO
              }
            />
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostLink to='/blog'>
                <PostIcon>
                  <FontAwesomeIcon icon='arrow-left' />
                </PostIcon>{' '}
                Back to Blog
              </PostLink>
            </PostHeader>
            <PostDate>{formatDate(post.date)}</PostDate>
            <PostAuthor>
              {' - '}
              <em>By</em>&nbsp;
              <span>{author.name}</span>
            </PostAuthor>
            {categories && categories.length > 0 && (
              <PostCategories>
                {categories.map((category) => {
                  return <PostCategory>{category.name}</PostCategory>;
                })}
              </PostCategories>
            )}
            <Spacer height={48} />
            {blocks &&
              blocks.map(({ _template, ...block }, index) => {
                switch (_template) {
                  case 'TitleBlock':
                    return (
                      <div
                        key={`post-${post.title}-${_template}-block-${index}`}
                      >
                        <Title page={post} data={block} />
                      </div>
                    );
                  case 'ButtonBlock':
                    return (
                      <div
                        key={`post-${post.title}-${_template}-block-${index}`}
                      >
                        <Button data={block} />
                      </div>
                    );
                  case 'ImageBlock':
                    return (
                      <div
                        key={`post-${post.title}-${_template}-block-${index}`}
                      >
                        <Image data={block} />
                      </div>
                    );
                  case 'FormBlock':
                    return (
                      <div
                        key={`post-${post.title}-${_template}-block-${index}`}
                      >
                        <Form form={block} />
                      </div>
                    );
                  case 'GridBlock':
                    return (
                      <div
                        key={`post-${post.title}-${_template}-block-${index}`}
                      >
                        <Grid page={post} data={block} />
                      </div>
                    );
                  case 'ContentBlock':
                    if (block.content)
                      return (
                        <div
                          key={`post-${post.title}-container-${_template}-block-${index}`}
                        >
                          <Content
                            key={`post-${post.title}-${_template}-block-${index}`}
                            data={block}
                          />
                        </div>
                      );
                    break;
                  case 'SpacerBlock':
                    return <Spacer data={block} />;
                  default:
                    return true;
                }
              })}
          </Card>
        </div>
      )}
    </PostLayout>
  );
}

const Column = styled.div`
  padding: 0 12px 40px 12px;
  width: calc(100% + 24px);
  margin-left: -12px;
  padding-top: ${(props) => (props.marginTop ? '40px' : '0')};
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

const PostDate = styled.span`
  color: ${(props) => props.theme.color.black}50;
`;

const PostAuthor = styled.span`
  color: ${(props) => props.theme.color.black}50;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-top: 24px;
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

const PostImage = styled(Img)``;

const PostCategories = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px -4px 0;
`;

const PostCategory = styled.div`
  // background: ${(props) => props.theme.color.primary}20;
  color: ${(props) => props.theme.color.black};
  padding: 0 4px;
  margin: 4px;
  width: fit-content;
  font-size: 13px;
  border-radius: 4px;
  background: #f7f7f7;
  border: 1px solid #e8e8e8;
`;

const PostForm = (categories, post) => {
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
      // {
      //   label: 'Author',
      //   name: 'author',
      //   component: 'authors',
      //   authors,
      // },
      {
        label: 'Categories',
        name: 'rawJson.categories',
        component: 'categories',
        categories,
      },
      {
        label: 'Feature Image',
        name: 'image',
        component: 'image',
        parse: (filename) => `../images/${filename}`,
        uploadDir: () => '/content/images/',
        previewSrc: (formValues) => {
          if (!formValues.jsonNode || !formValues.jsonNode.image) return '';
          return formValues.jsonNode.image.childImageSharp.fluid.src;
        },
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
            name: 'sections',
            component: 'blocks',
            templates: {
              SidebarBlock,
            },
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
          GridBlock,
        },
      },
    ],
  };
};

export const postQuery = graphql`
  query($path: String!) {
    post: postsJson(draft: { eq: false }, path: { eq: $path }) {
      title
      date
      categories
      image {
        childImageSharp {
          fluid(quality: 70, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      sidebar {
        showSidebar
        sidebarSections {
          _template
          content
          name
          title
          sectionTitle
          type
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
          style
          maxNumberOfColumns
          rounded
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }

          categories
          demo
          columnSpacing
          widthOne
          widthTwo
          sidebarBlocks {
            _template
            content
            background
            name
            title
            sectionTitle
            type
            underline
            center
            recipient
            itemsToShow
            style
            maxNumberOfColumns
            rounded
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }

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
              sectionTitle
              type
              underline
              center
              recipient
              itemsToShow
              style
              maxNumberOfColumns
              rounded
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
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
                sectionTitle
                type
                underline
                center
                recipient
                itemsToShow
                style
                maxNumberOfColumns
                rounded
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
        }
      }
      blocks {
        _template
        content
        name
        title
        sectionTitle
        type
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
        style
        maxNumberOfColumns
        rounded
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }

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
          sectionTitle
          type
          underline
          center
          recipient
          itemsToShow
          style
          maxNumberOfColumns
          rounded
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }

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
            sectionTitle
            type
            underline
            center
            recipient
            itemsToShow
            style
            maxNumberOfColumns
            rounded
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }

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
    categories: settingsJson(
      fileRelativePath: { eq: "/content/settings/categories.json" }
    ) {
      categories {
        name
        id
      }
    }
    settingsJson(fileRelativePath: { eq: "/content/settings/author.json" }) {
      name
      email
    }
  }
`;
