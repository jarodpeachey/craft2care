/* eslint-disable react/jsx-fragments */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import Helmet from 'react-helmet';
import slugify from 'react-slugify';
import {
  faShoppingCart,
  faArrowRight,
  faArrowLeft,
  faTrash,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './style.css';
import { JsonCreatorPlugin } from 'gatsby-tinacms-json';
import { withPlugin } from 'tinacms';
import { Theme } from './theme';
import { Footer } from './footer';
import Header from './header';
import { formatDate } from '../utils/formatDate';

library.add(
  faShoppingCart,
  faArrowRight,
  faArrowLeft,
  faTrash,
  faBars,
  faTimes
);

const MasterLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query MasterLayoutQuery {
      site: settingsJson(
        fileRelativePath: { eq: "/content/settings/site.json" }
      ) {
        title
        description
      }
    }
  `);

  return (
    <>
      <Helmet>
        <script src='https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js'></script>
      </Helmet>
      <Theme>
        <SiteWrapper>
          <Header siteTitle={data.site.title} siteDescription={data.site.description} />
          {children}
          <Footer />
        </SiteWrapper>
      </Theme>
    </>
  );
};

const SiteWrapper = styled.div`
  background: #f7f7f7;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 100vh;
`;

const CreatePageButton = new JsonCreatorPlugin({
  label: 'New Page',
  filename(form) {
    const slug = slugify(form.title.toLowerCase());
    return `content/pages/${slug}.json`;
  },
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
    { name: 'path', label: 'Path', component: 'text', required: true },
  ],
  data(form) {
    return {
      title: form.title,
      path: `/${form.path || slugify(form.title.toLowerCase())}`,
      blocks: [
        {
          content:
            'Welcome to my new page! Add sections in the sidebar to make me your own.',
          center: false,
          _template: 'ContentBlock',
        },
      ],
      hero: {
        headline: form.title,
        center: true,
        overlay: true,
        overlayColor: '#867E7E',
        height: 120,
      },
      draft: false,
      authors: [],
    };
  },
});

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const CreatePostButton = new JsonCreatorPlugin({
  label: 'New Post',
  filename(form) {
    const slug = slugify(form.title.toLowerCase());
    return `content/posts/${slug}.json`;
  },
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  data(form) {
    return {
      title: form.title,
      path: `/blog/${replaceAll(form.title.toLowerCase(), ' ', '-')}`,
      date: formatDate(new Date()),
      blocks: [
        {
          content:
            'Welcome to my new post! Add sections in the sidebar to make me your own.',
          center: false,
          _template: 'ContentBlock',
        },
      ],
      hero: {
        headline: form.title,
        center: true,
        overlay: true,
        overlayColor: '#867E7E',
        height: 120,
      },
      draft: false,
      authors: [],
    };
  },
});

export default withPlugin(MasterLayout, [CreatePostButton, CreatePageButton]);

export const Site = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  > ${Header} {
    flex: 0 0 auto;
  }
  > ${Footer} {
    flex: 0 0 auto;
  }
  > * {
    flex: 1 0 auto;
  }
  ${(props) =>
    props.theme.hero.parallax &&
    css`
      height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
      perspective: 1px;
      perspective-origin: top;
      scrollbar-width: none;
      -ms-overflow-style: none;
      ::-webkit-scrollbar {
        display: none;
      }
    `}
`;
