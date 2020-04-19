/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from 'gatsby-image';
import get from 'lodash.get';
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
import { AppContext } from '../components/AppProvider';

export default function ({ data, ...props }) {
  const { theme } = useContext(ThemeContext);
  const newDate = data.post.date;

  const { breadcrumb } = useContext(AppContext);

  console.log(breadcrumb);

  const [post] = useLocalJsonForm(
    data.post,
    PostForm(data.categories.categories, newDate)
  );

  // console.log(post);

  const blocks = post.blocks ? post.blocks : [];
  console.log('ALL BLOCKS: ', blocks);
  const sections =
    post.sidebar && post.sidebar.sidebarSections
      ? post.sidebar.sidebarSections
      : [];

  const categories = ListCategories(data.post.categories);

  const { author } = data;

  console.log(post);

  return (
    <PostLayout post={post}>
      {post.sidebar &&
      post.sidebar.showSidebar &&
      sections.length > 0 &&
      sections[0].sidebarBlocks &&
      sections[0].sidebarBlocks.length > 0 ? (
        <div className='container top bottom'>
          <Row spacing={[20, 0]} breakpoints={[769]}>
            <div widths={[12]}>
              {/* {breadcrumb && ( */}
              <Card breadcrumb>
                {breadcrumb === '/' ? (
                  <>
                    <Breadcrumb>Home</Breadcrumb>
                    <BreadcrumbIcon>
                      <FontAwesomeIcon icon='chevron-right' />
                    </BreadcrumbIcon>
                    <Breadcrumb active>{post.title}</Breadcrumb>
                  </>
                ) : breadcrumb === '/blog' ? (
                  <>
                    <Breadcrumb>Blog</Breadcrumb>
                    <BreadcrumbIcon>
                      <FontAwesomeIcon icon='chevron-right' />
                    </BreadcrumbIcon>
                    <Breadcrumb active>{post.title}</Breadcrumb>
                  </>
                ) : (
                  <>
                    <Breadcrumb>Home</Breadcrumb>
                    <BreadcrumbIcon>
                      <FontAwesomeIcon icon='chevron-right' />
                    </BreadcrumbIcon>
                    <Breadcrumb active>{post.title}</Breadcrumb>
                  </>
                )}
              </Card>
              {/* )} */}
            </div>
            <div widths={[8]}>
              <Column>
                <Card>
                  {post.featuredImage.image ? (
                    <PostImage
                      fluid={
                        post.featuredImage.image.childImageSharp.fluid // WORK TO DO
                      }
                    />
                  ) : (
                    <PostImage
                      fluid={
                        theme.hero.image.childImageSharp.fluid // WORK TO DO
                      }
                    />
                  )}
                  <PostHeader>
                    <PostTitle>{post.title}</PostTitle>
                  </PostHeader>
                  <PostDate>{newDate}</PostDate>
                  {author && author.name && (
                    <PostAuthor>
                      {' - '}
                      by <span>{author.name}</span>
                    </PostAuthor>
                  )}
                  {categories && categories.length > 0 && (
                    <PostCategories>
                      {categories.map((category) => {
                        return <PostCategory>{category}</PostCategory>;
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
              </Column>
              <Comments comments={[]} />
            </div>
            <div widths={[4]}>
              <Sidebar page={post} sections={sections} />
            </div>
          </Row>
        </div>
      ) : (
        <div className='container top bottom'>
          {/* {breadcrumb && ( */}
          <Column>
            <Card breadcrumb>
              {breadcrumb === '/' ? (
                <>
                  <Breadcrumb>Home</Breadcrumb>
                  <BreadcrumbIcon>
                    <FontAwesomeIcon icon='chevron-right' />
                  </BreadcrumbIcon>
                  <Breadcrumb active>{post.title}</Breadcrumb>
                </>
              ) : breadcrumb === '/blog' ? (
                <>
                  <Breadcrumb>Blog</Breadcrumb>
                  <BreadcrumbIcon>
                    <FontAwesomeIcon icon='chevron-right' />
                  </BreadcrumbIcon>
                  <Breadcrumb active>{post.title}</Breadcrumb>
                </>
              ) : (
                <>
                  <Breadcrumb>Home</Breadcrumb>
                  <BreadcrumbIcon>
                    <FontAwesomeIcon icon='chevron-right' />
                  </BreadcrumbIcon>
                  <Breadcrumb active>{post.title}</Breadcrumb>
                </>
              )}
            </Card>
          </Column>
          {/* )} */}

          <Card>
            {post.featuredImage.image ? (
              <PostImage
                fluid={
                  post.featuredImage.image.childImageSharp.fluid // WORK TO DO
                }
              />
            ) : (
              <PostImage
                fluid={
                  theme.hero.image.childImageSharp.fluid // WORK TO DO
                }
              />
            )}
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
            </PostHeader>
            <PostDate>{formatDate(post.date)}</PostDate>
            {author && author.name && (
              <PostAuthor>
                {' - '}
                by <span>{author.name}</span>
              </PostAuthor>
            )}
            {categories && categories.length > 0 && (
              <PostCategories>
                {categories.map((category) => {
                  return <PostCategory>{category}</PostCategory>;
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
  padding: 20px 0;
`;

const Card = styled.div`
  background: white;
  box-shadow: 4px 6px 16px 1px #eee;
  border: 1px solid #ddd;
  background: white;
  padding: ${(props) => (props.breadcrumb ? '12px 24px' : '24px')};
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

const PostImage = styled(Img)`
  width: calc(100% + 48px);
  margin-left: -24px;
  margin-top: -24px;
`;

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

const Breadcrumb = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  color: ${(props) => (props.active ? props.theme.color.primary : '#666')};
`;

const BreadcrumbIcon = styled.span`
  display: inline-block;
  font-size: 15px;
  padding: 0 8px;
  top: 1px;
  color: #999;
  position: relative;
`;

const PostForm = (categories, post) => {
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
        label: 'Featured Image',
        name: 'rawJson.featuredImage',
        component: 'group',
        fields: [
          // {
          //   label: 'Show Hero',
          //   name: 'showHero',
          //   component: 'toggle',
          //   defaultValue: true
          // },
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
        ],
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
      // {
      //   name: 'rawJson.draft',
      //   component: 'toggle',
      //   label: 'Draft',
      // },
      {
        label: 'Post Content',
        name: 'rawJson.blocks',
        component: 'blocks',
        templates: {
          TitleBlock,
          ImageBlock,
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
      path
      date
      categories
      featuredImage {
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      rounded
      draft
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
