/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
import styled, { css } from 'styled-components';
import React from 'react';
// import { postsContext } from '../components/postsProvider';
import { useStaticQuery, Link } from 'gatsby';
import Row from '../components/grid/row';
import { Paper } from '@material-ui/core';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { ListAuthors, AuthorsForm } from '../components/authors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DraftBadge } from "../components/style";

export function Posts({ page, data }) {
  const { posts } = useStaticQuery(graphql`
    query postsQuery {
      posts: allPostsJson(
        sort: { fields: id, order: DESC }
        filter: { draft: { eq: false } }
      ) {
        edges {
          node {
            authors
            id
            path
            title
            draft
          }
        }
      }
    }
  `);

  let rowProps = {};
  let columnProps = {};

  if (data.itemsToShow === 1) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576],
      spacing: [12]
    };
    columnProps = {
      widths: [12]
    };
  } else if (data.itemsToShow === 2) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576],
      spacing: [12]
    };
    columnProps = {
      widths: [6]
    };
  } else if (data.itemsToShow === 3) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576, 769],
      spacing: [12]
    };
    columnProps = {
      widths: [6, 4]
    };
  } else if (data.itemsToShow === 4 || data.itemsToShow === 5) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576, 769, 960],
      spacing: [12]
    };
    columnProps = {
      widths: [6, 4, 3]
    };
  } else if (data.itemsToShow >= 6) {
    rowProps = {
      maxColumnSize: 12 / data.maxNumberOfColumns,
      breakpoints: [576, 769, 960],
      spacing: [12]
    };
    columnProps = {
      widths: [6, 4, 12 / data.maxNumberOfColumns]
    };
  }

  const [authors] = useLocalJsonForm(data.authors, AuthorsForm);

  return (
    <>
      <Row {...rowProps}>
        {posts.edges.map(({ node }, index) => {
          const authors = ListAuthors(node.authors);
          if (index < data.itemsToShow) {
            return (
              <div
                className='full-height'
                key={`product-${index}`}
                {...columnProps}
              >
                <Link className='no-underline' to={node.path}>
                  <Card key={node.id}>
                    {node.draft && <DraftBadge>Draft</DraftBadge>}
                    <PostTitle>
                      <Link to={node.path}>{node.title}</Link>
                    </PostTitle>
                    {/* <p>{node.excerpt}</p> */}
                    <PostMeta>
                      <PostDate>{node.date}</PostDate>
                      {authors && authors.length > 0 && (
                        <PostAuthors>
                          by{' '}
                          {authors.map(author => (
                            <span>{author.name}</span>
                          ))}
                        </PostAuthors>
                      )}
                      <PostLink>
                        Read Article
                        <PostIcon>
                          <FontAwesomeIcon icon='arrow-right' />
                        </PostIcon>
                      </PostLink>
                    </PostMeta>
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
  padding: 18px;
  display: block;
  margin: 0 auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  height: fit;
  color: black;
  transition-duration: 0.25s;
  &:hover {
    transform: scale(1.02);
    transition-duration: 0.25s;
    color: ${props => props.theme.color.primary} !important;
    h4,
    small {
      color: ${props => props.theme.color.primary} !important;
    }
  }
`;

const PostTitle = styled.h2`
  margin-bottom: 0;
  a {
    text-decoration: none;
    color: ${props => props.theme.color.black};
  }
`;

const PostMeta = styled.div``;

const PostDate = styled.div``;

const PostAuthors = styled.div`
  font-size: 16px;
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
    color: ${props => props.theme.color.primary};
  }
`;

export const PostsBlock = {
  label: 'Posts Grid',
  name: 'posts',
  defaultItem: {
    itemsToShow: 3
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
    { name: 'itemsToShow', label: 'Items To Show', component: 'rangeNumber' },
    {
      name: 'maxNumberOfColumns',
      label: 'Max Number Of Columns',
      component: 'rangeNumber',
      max: 4,
      min: 2,
      defaultValue: 4
    }
  ]
};
