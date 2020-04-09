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
import { Posts } from '../blocks/posts';
// import { useAuthors } from '../components/useAuthors';

export default function (props) {
  console.log(props);

  // console.log(post);

  return (
    <PageLayout noEdit>
      <div className='container top bottom p-relative'>
        <Title
          data={{
            center: true,
            underline: true,
            title: props.data.categories.categories.filter(
              (category) => category.id === props.pageContext.category
            )[0].name,
          }}
        />
        <Posts
          data={{
            itemsToShow: 999999,
            maxNumberOfColumns: 3,
            // title: props.data.categories.categories.filter(
            //   (category) => category.id === props.pageContext.category
            // )[0].name,
            categories: [
              props.data.categories.categories.filter(
                (category) => category.id === props.pageContext.category
              )[0].id,
            ],
          }}
        />
      </div>
    </PageLayout>
  );
}

export const postQuery = graphql`
  query {
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
