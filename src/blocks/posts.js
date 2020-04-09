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
import { ListAuthors, AuthorsForm } from '../components/authors';
import { DraftBadge } from '../components/style';
import { ThemeContext } from '../components/theme';
import { ListCategories } from '../components/categories';

let globalCategories = [];

export function Posts({ page, data }) {
  console.log(data);
  const { theme } = useContext(ThemeContext);

  const { posts, settingsJson } = useStaticQuery(graphql`
    query postsQuery {
      posts: allPostsJson(
        sort: { fields: id, order: DESC }
        filter: { draft: { eq: false } }
      ) {
        edges {
          node {
            authors
            categories
            id
            path
            title
            draft
            hero {
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
      settingsJson(
        fileRelativePath: { eq: "/content/settings/categories.json" }
      ) {
        categories {
          name
          id
        }
      }
    }
  `);

  globalCategories = settingsJson.categories;

  console.log(globalCategories);

  let rowProps = {};
  let columnProps = {};

  if (data.itemsToShow === 1) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576],
      spacing: [12],
    };
    columnProps = {
      widths: [12],
    };
  } else if (data.itemsToShow === 2) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576],
      spacing: [12],
    };
    columnProps = {
      widths: [6],
    };
  } else if (data.itemsToShow === 3) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576, 769],
      spacing: [12],
    };
    columnProps = {
      widths: [6, 4],
    };
  } else if (data.itemsToShow === 4 || data.itemsToShow === 5) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576, 769, 960],
      spacing: [12],
    };
    columnProps = {
      widths: [6, 4, 3],
    };
  } else if (data.itemsToShow >= 6) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576, 769, 960],
      spacing: [12],
    };
    columnProps = {
      widths: [6, 4, 12 / data.maxNumberOfColumns],
    };
  }

  // const [authors] = useLocalJsonForm(data.authors, AuthorsForm);

  const isPostForDisplay = () => {
    const newArray = [];
    posts.edges.map(({ node }) => {
      if (data.categories && data.categories.length > 0) {
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

  console.log(postsToDisplay);

  // const postsToUse = allCategories.categories.filter(
  //   (category) => !postCategories.includes(category.id)
  // );

  return (
    <>
      <Row {...rowProps}>
        {postsToDisplay.map((post, index) => {
          const authors = ListAuthors(post.authors);
          const categories = ListCategories(post.categories);
          if (index < data.itemsToShow) {
            console.log(post.hero.image);
            console.log(theme.hero);
            return (
              <div
                className='full-height'
                key={`product-${index}`}
                {...columnProps}
              >
                <Link className='no-underline' to={post.path}>
                  <Card key={post.id}>
                    <PostImage
                      fluid={
                        post.hero.image
                          ? post.hero.image.childImageSharp.fluid
                          : theme.hero.image.childImageSharp.fluid // WORK TO DO
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
                        {authors && authors.length > 0 && (
                          <PostAuthors>
                            by <span>{authors[0].name}</span>
                          </PostAuthors>
                        )}
                        {categories && categories.length > 0 && (
                          <PostCategories>
                            {categories.map((category) => {
                              return (
                                <PostCategory>{category.name}</PostCategory>
                              );
                            })}
                          </PostCategories>
                        )}
                        <PostLink>
                          Read More
                          <PostIcon>
                            <FontAwesomeIcon icon='arrow-right' />
                          </PostIcon>
                        </PostLink>
                      </PostMeta>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          } else {
            return null;
          }
        })}
      </Row>
    </>
  );
}

const Card = styled.div`
  display: block;
  margin: 0 auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  height: fit;
  color: black;
  transition-duration: 0.25s;
  img,
  source,
  picture {
    transition: all 0.25s linear 0ms !important;
  }
  &:hover {
    img,
    source,
    picture {
      transform: scale(1.05);
      transition: all 0.25s linear 0ms !important;
    }
    transition-duration: 0.25s;
    color: ${(props) => props.theme.color.primary} !important;
    h4,
    small {
      color: ${(props) => props.theme.color.primary} !important;
    }
  }
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
`;

const PostMeta = styled.div``;

const PostDate = styled.div``;

const PostAuthors = styled.div`
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
  color: ${(props) => props.theme.color.black};
  padding: 0 4px;
  margin: 4px;
  width: fit-content;
  font-size: 13px;
  border-radius: 4px;
  background: #f7f7f7;
  border: 1px solid #e8e8e8;
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
    color: ${(props) => props.theme.color.primary};
  }
`;

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
