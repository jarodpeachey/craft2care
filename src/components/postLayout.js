/* eslint-disable react/jsx-fragments */
/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useLocalJsonForm, useGlobalJsonForm } from 'gatsby-tinacms-json';
import { SEO } from './seo';
import { ThemeContext, ThemeForm } from './theme';
// import { Hero } from "./hero"
import { removeNull } from './helpers';
import { NavForm } from './nav';
import { AuthorForm } from './author';
import { CategoriesForm } from './categories';
import { Hero } from './hero';
import { AppContext } from './AppProvider';
import LoginModal from './account/LoginModal';
import SignupModal from './account/SignupModal';

const merge = require('lodash.merge');

export const PostLayout = ({ post, children, isPost }) => {
  const data = useStaticQuery(graphql`
    query PostLayoutQuery {
      nav: settingsJson(
        fileRelativePath: { eq: "/content/settings/menu.json" }
      ) {
        ...nav

        rawJson
        fileRelativePath
      }
      theme: settingsJson(
        fileRelativePath: { eq: "/content/settings/theme.json" }
      ) {
        ...globalTheme

        rawJson
        fileRelativePath
      }
      categories: settingsJson(
        fileRelativePath: { eq: "/content/settings/categories.json" }
      ) {
        ...categories

        rawJson
        fileRelativePath
      }
      author: settingsJson(
        fileRelativePath: { eq: "/content/settings/author.json" }
      ) {
        name
        email

        rawJson
        fileRelativePath
      }
      site: settingsJson(
        fileRelativePath: { eq: "/content/settings/site.json" }
      ) {
        logo
        title
        description
        author

        rawJson
        fileRelativePath
      }
    }
  `);

  const {
    showLoginModal,
    showSignupModal,
    setShowLoginModal,
    setShowSignupModal,
  } = useContext(AppContext);

  const [nav] = useLocalJsonForm(data.nav, NavForm);
  const [globalTheme] = useLocalJsonForm(data.theme, ThemeForm);
  const [site] = useGlobalJsonForm(data.site, SiteForm);
  const [categories] = useLocalJsonForm(data.categories, CategoriesForm);
  const [author] = useLocalJsonForm(data.author, AuthorForm);

  const themeContext = React.useContext(ThemeContext);
  const { theme } = themeContext;
  const postTitle =
    post && post.title
      ? post.title
      : post && post.frontmatter && post.frontmatter.title
      ? post.frontmatter.title
      : '';


  return (
    <>
      {postTitle && <SEO title={postTitle} />}
      <PostWrapper padding>
        <div>{children}</div>
      </PostWrapper>
    </>
  );
};

const SiteForm = {
  label: 'Site',
  fields: [
    {
      label: 'Logo',
      name: 'rawJson.logo',
      component: 'text',
      parse(value) {
        return value || '';
      },
    },
    {
      label: 'Title',
      name: 'rawJson.title',
      component: 'text',
      parse(value) {
        return value || '';
      },
    },
    {
      label: 'Description',
      name: 'rawJson.description',
      component: 'text',
      parse(value) {
        return value || '';
      },
    },
    {
      label: 'Author',
      name: 'rawJson.author',
      component: 'text',
      parse(value) {
        return value || '';
      },
    },
  ],
};

const PostWrapper = styled.div`
  padding: 0;
`;
