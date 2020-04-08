/* eslint-disable react/jsx-fragments */
/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useLocalJsonForm, useGlobalJsonForm } from 'gatsby-tinacms-json';
import { SEO } from './seo';
import { ThemeContext , ThemeForm } from './theme';
// import { Hero } from "./hero"
import { removeNull } from './helpers';
import { NavForm } from './NavBar';
import { AuthorsForm } from './authors';
import { CategoriesForm } from './categories';
import { Hero } from './hero';
import { AppContext } from './AppProvider';
import LoginModal from './account/LoginModal';
import SignupModal from './account/SignupModal';

const merge = require('lodash.merge');

export const PageLayout = ({ page, children, isPost }) => {
  const data = useStaticQuery(graphql`
    query PageLayoutQuery {
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
      authors: settingsJson(
        fileRelativePath: { eq: "/content/settings/authors.json" }
      ) {
        ...authors

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
    setShowSignupModal
  } = useContext(AppContext);

  const [nav] = useLocalJsonForm(data.nav, NavForm);
  const [globalTheme] = useLocalJsonForm(data.theme, ThemeForm);
  const [site] = useGlobalJsonForm(data.site, SiteForm);
  const [categories] = useLocalJsonForm(data.categories, CategoriesForm);
  const [authors] = useLocalJsonForm(data.authors, AuthorsForm);

  const themeContext = React.useContext(ThemeContext);
  const {theme} = themeContext;
  const pageTitle =
    page && page.title ?
      page.title :
      page && page.frontmatter && page.frontmatter.title ?
      page.frontmatter.title :
      '';

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  if (page && page.hero) {
    const pageHero = page.hero;
    const mergedHero = pageHero ?
      merge({}, theme.hero, removeNull(pageHero)) :
      theme.hero;

    return (
      <>
        {pageTitle && <SEO title={pageTitle} />}
        {page.hero.showHero ? (
          <>
            <Hero
              title={pageTitle}
              hero={mergedHero}
              headerHeight={theme.header.height}
              theme={theme}
            />
          </>
        ) : null}
        <PageWrapper showHero={page.hero.showHero}>
          <>{children}</>
          {showLoginModal && (
            <LoginModal
              pathname={window.location.pathname}
              show={showLoginModal}
              toggleFunction={closeLoginModal}
            />
          )}
          {showSignupModal && (
            <SignupModal
              pathname={window.location.pathname}
              show={showSignupModal}
              toggleFunction={closeSignupModal}
            />
          )}
        </PageWrapper>
      </>
    );
  } else {
    return (
      <>
        {pageTitle && <SEO title={pageTitle} />}
        <PageWrapper padding>
          <div>{children}</div>
        </PageWrapper>
      </>
    );
  }
};

const SiteForm = {
  label: 'Site',
  fields: [
    {
      label: 'Logo',
      name: 'rawJson.logo',
      component: 'text',
      parse (value) {
        return value || '';
      }
    },
    {
      label: 'Title',
      name: 'rawJson.title',
      component: 'text',
      parse (value) {
        return value || '';
      }
    },
    {
      label: 'Description',
      name: 'rawJson.description',
      component: 'text',
      parse (value) {
        return value || '';
      }
    },
    {
      label: 'Author',
      name: 'rawJson.author',
      component: 'text',
      parse (value) {
        return value || '';
      }
    }
  ]
};

const PageWrapper = styled.div`
  padding: 0;
`;
