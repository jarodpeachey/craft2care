/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
import styled, { css } from 'styled-components';
import React, { useContext } from 'react';
// import { postsContext } from '../components/postsProvider';
import { useStaticQuery, Link } from 'gatsby';
import { Paper } from '@material-ui/core';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from 'gatsby-image';
import Row from '../components/grid/row';
// import { ListAuthors, AuthorsForm } fro../components/authorors';
import { DraftBadge } from '../components/style';
import { ThemeContext } from '../components/theme';
import { ListCategories } from '../components/categories';
import { shortenText } from '../utils/shortenText';
import { Button } from './button';
import { Spacer } from './spacer';
import { Title } from './title';
import { Content } from './content';

let globalCategories = [];

export function Posts({ page, data }) {
  const { theme } = useContext(ThemeContext);

  const { posts, categories, author } = useStaticQuery(graphql`
    query postsQuery {
      posts: allPostsJson(
        sort: { fields: id, order: DESC }
        filter: { draft: { eq: false }, title: { ne: "Dummy" } }
      ) {
        edges {
          node {
            categories
            id
            path
            blocks {
              _template
              content
            }
            title
            draft
            featuredImage {
              image {
                childImageSharp {
                  fluid(quality: 70, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
      categories: settingsJson(
        fileRelativePath: { eq: "/content/settings/categories.json" }
      ) {
        categories
      }
      author: settingsJson(
        fileRelativePath: { eq: "/content/settings/author.json" }
      ) {
        name
      }
    }
  `);

  globalCategories = categories.categories;

  const rowProps = {
    maxColumnSize: 3,
    breakpoints: [769, 960],
    spacing: [12],
  };
  let widths = [{}];

  if (data.itemsToShow === 1) {
    widths = [12];
  } else if (data.itemsToShow === 2) {
    widths = [6];
  } else if (data.itemsToShow === 3) {
    widths = [6, 4];
  } else if (data.itemsToShow === 4 || data.itemsToShow === 5) {
    widths = [6, 4];
  } else if (data.itemsToShow >= 6) {
    widths = [6, 4, 12 / data.maxNumberOfColumns];
  }

  if (posts.edges.length === 1) {
    widths = [12];
  }

  // const [authors] = useLocalJsonForm(data.authors, AuthorsForm);

  const isPostForDisplay = () => {
    const newArray = [];
    posts.edges.map(({ node }) => {
      if (
        data.categories &&
        data.categories.length > 0 &&
        node.categories &&
        node.categories.length > 0
      ) {
        data.categories.map((category) => {
          if (node.categories.includes(category)) {
            newArray.push(node);
          }
        });
      } else {
        newArray.push(node);
      }
    });

    return newArray;
  };

  // const postsToDisplay = posts.edges.filter(({ node }) =>
  //   isPostForDisplay(node)
  // );

  const postsToDisplay = isPostForDisplay();

  // const postsToUse = allCategories.categories.filter(
  //   (category) => !postCategories.includes(category.toLowerCase().replace(/ /g, "-"))
  // );

  if (data && postsToDisplay && postsToDisplay.length > 0) {
    return (
      <>
        {data.style === 'Grid' ? (
          <Row {...rowProps}>
            {postsToDisplay.map((post, index) => {
              console.log(post);
              let excerpt = '';
              post.blocks.map((block) => {
                if (block._template === 'ContentBlock') {
                  excerpt = shortenText(block.content, 100);
                }
              });
              // const authors = ListAuthors(post.authors);
              const categories = ListCategories(post.categories);
              if (index < data.itemsToShow) {
                return (
                  <div
                    className='full-height'
                    key={`product-${index}`}
                    widths={widths}
                  >
                    <Card key={post.id}>
                      <PostImage
                        fluid={
                          post.featuredImage.image
                            ? post.featuredImage.image.childImageSharp.fluid
                            : theme.hero.image.childImageSharp.fluid
                        }
                      />
                      {/* {post.draft && <DraftBadge>Draft</DraftBadge>} */}
                      <CardContent>
                        <PostTitle>
                          <Link to={post.path}>{post.title}</Link>
                        </PostTitle>
                        {/* <p>{post.excerpt}</p> */}
                        <PostMeta>
                          <PostDate>{post.date}</PostDate>
                          <PostAuthor>
                            by <span>{author.name}</span>
                          </PostAuthor>
                          {categories && categories.length > 0 && (
                            <PostCategories>
                              {categories.map((category) => {
                                return (
                                  <PostCategory>
                                    <Link
                                      className='no-underline'
                                      to={`/category/${category
                                        .toLowerCase()
                                        .replace(/ /g, '-')}`}
                                    >
                                      {category}
                                    </Link>
                                  </PostCategory>
                                );
                              })}
                            </PostCategories>
                          )}
                          <PostExcerpt>{excerpt}</PostExcerpt>
                          <Spacer height={24} />
                          <Button
                            data={{
                              center: true,
                              buttonText: 'Read More',
                              type: 'button',
                              buttonColor: 'primary',
                              buttonLink: post.path,
                            }}
                          />
                          <Spacer height={24} />
                        </PostMeta>
                      </CardContent>
                    </Card>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </Row>
        ) : (
          <div>
            {postsToDisplay.map((post, index) => {
              let excerpt = '';
              post.blocks.map((block) => {
                if (block._template === 'ContentBlock') {
                  excerpt = shortenText(block.content, 100);
                }
              });
              if (index < data.itemsToShow) {
                return (
                  <Link className='no-underline' to={post.path}>
                    {/* {post.draft && <DraftBadge>Draft</DraftBadge>} */}
                    <ListTitle>{post.title}</ListTitle>
                    <ListExcerpt>{excerpt}</ListExcerpt>
                    {index < data.itemsToShow - 1 ||
                      (index < postsToDisplay.length - 1 && <ListSeperator />)}
                  </Link>
                );
              } else {
                return null;
              }
            })}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Spacer height={24} />
      <Title
        data={{
          title: 'Aw, snap!',
          center: true,
          type: 'h1',
        }}
      />
      <Content
        data={{
          center: true,
          content:
            'There are no posts under this category! But fear not, you can explore the rest of the site!',
        }}
      />
      <Spacer height={24} />
      <Button
        data={{
          buttonText: 'Explore',
          buttonColor: 'primary',
          buttonLink: '/',
          center: true,
        }}
      />
      <Spacer height={64} />
    </>
  );
}

const Card = styled.div`
  background: white;
  box-shadow: 4px 6px 16px 1px #eee;
  border: 1px solid #ddd;
  display: block;
  margin: 0 auto;
  background: white;
  border-radius: 3px;
  height: fit;
  color: black;
  transition-duration: 0.25s;
`;

const CardContent = styled.div`
  padding: 18px;
`;

const PostImage = styled(Img)``;

const PostTitle = styled.h2`
  margin-bottom: 0;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.black};
  }
  :hover {
    a {
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

const PostMeta = styled.div``;

const PostDate = styled.div``;

const PostAuthor = styled.div`
  font-size: 16px;
`;

const PostCategories = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -4px;
`;

const PostCategory = styled.div`
  // background: ${(props) => props.theme.color.primary}20;
  color: ${(props) => props.theme.color.black} !important;
  a {
    color: ${(props) => props.theme.color.black} !important;
  }
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.color.primary} !important;
    a {
      color: ${(props) => props.theme.color.primary} !important;
    }
  }
  padding: 0 4px;
  margin: 4px;
  width: fit-content;
  font-size: 13px;
  border-radius: 4px;
  background: #f7f7f7;
  border: 1px solid #e8e8e8;
`;

const PostExcerpt = styled.p`
  margin: 12px 0;
  color: ${(props) => props.theme.color.black};
`;

const PostIcon = styled.span`
  position: relative;
  top: 1px;
  margin-left: 8px;
`;

const PostLink = styled.div`
  width: 100%;
  margin-top: 16px;
  text-align: right;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.black};
    :hover {
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

const ListFlex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

const ListTitle = styled.div`
  font-weight: bold;
`;

const ListExcerpt = styled.p`
  color: ${(props) => props.theme.color.black}80;
  font-size: 15px;
  line-height: 1.4em;
`;

const ListSeperator = styled.div`
  width: 30%;
  background: ${(props) => props.theme.color.primary};
  margin: 8px 0;
  height: 2px;
`;

const ListImage = styled(Img)``;

export const PostsBlock = {
  label: 'Posts Grid',
  name: 'posts',
  defaultItem: {
    itemsToShow: 3,
  },
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
    {
      label: 'Style',
      name: 'style',
      component: 'select',
      options: ['List', 'Grid'],
    },
    {
      label: 'Add Categories',
      name: 'categories',
      component: 'categories',
      globalCategories,
    },
    { name: 'itemsToShow', label: 'Items To Show', component: 'rangeNumber' },
    {
      name: 'maxNumberOfColumns',
      label: 'Max Number Of Columns',
      component: 'rangeNumber',
      max: 4,
      min: 2,
      defaultValue: 4,
    },
  ],
};
