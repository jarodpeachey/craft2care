// import React from 'react';
// import { graphql, Link } from 'gatsby';
// import styled, { css } from 'styled-components';
// // import {
// //   Paper,
// //   Meta,
// //   MetaSpan,
// //   MetaActions,
// //   DraftBadge,
// // } from "../components/style"
// import { Paper } from '@material-ui/core';
// import { useLocalJsonForm } from 'gatsby-tinacms-json';
// import { ListAuthors, AuthorsForm } from '../components/authors';
// import { PageLayout } from '../components/pageLayout';

// export default function List({ data, pageContext }) {
//   console.log('Data in list: ', data);
//   console.log('Page context: ', pageContext);

//   const [page] = useLocalJsonForm(data.page, ListForm);

// const [authors] = useLocalJsonForm(data.authors, AuthorsForm);

// // const [authors] = useLocalJsonForm(
// //   data.post.authors,
// //   AuthorForm(data.settingsJson.authors)
// // );

// // const authors = ListAuthors(data.post.authors);

//   const { slug, limit, skip, numPages, currentPage } = pageContext;
//   const isFirst = currentPage === 1;
//   const isLast = currentPage === numPages;
//   const prevPage =
//     currentPage - 1 === 1 ? slug : `${slug}/${(currentPage - 1).toString()}`;
//   const nextPage = `${slug}/${(currentPage + 1).toString()}`;
//   page.title = isFirst ? page.title : `${page.title} - ${currentPage}`;

//   return (
//     <PageLayout page={page}>
//       <div className='container section'>
//         {data.posts &&
//           data.posts.edges.map(item => {
//             const authors = ListAuthors(item.node.authors);
//             return (
// <Paper article key={item.node.id}>
//   {item.node.draft && <DraftBadge>Draft</DraftBadge>}
//   <h2>
//     <Link to={item.node.path}>{item.node.title}</Link>
//   </h2>
//   <p>{item.node.excerpt}</p>
//   <Meta>
//     <MetaSpan>{item.node.date}</MetaSpan>
//     {authors && authors.length > 0 && (
//       <MetaSpan>
//         <em>By</em>&nbsp;
//         {authors.map(author => (
//           <span>{author.name}</span>
//         ))}
//       </MetaSpan>
//     )}
//     <MetaActions>
//       <Link to={item.node.path}>Read Article →</Link>
//     </MetaActions>
//   </Meta>
// </Paper>
//             );
//           })}
//         <ListNav>
//           {!isFirst && (
//             <Link to={prevPage} rel='prev'>
//               ← Newer
//             </Link>
//           )}
//           {!isLast && (
//             <Link to={nextPage} rel='next'>
//               Older →
//             </Link>
//           )}
//         </ListNav>
//       </div>
//     </PageLayout>
//   );
// }

// const Meta = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: flex-start;
//   a:not(:hover) {
//     text-decoration: none;
//   }
//   &:not(:last-child) {
//     margin-bottom: 2rem;
//   }
// `;

// const MetaActions = styled.span`
//   opacity: 1;
//   flex: 1 0 auto;
//   display: flex;
//   justify-content: flex-end;
// `;

// const MetaSpan = styled.span`
//   justify-self: flex-start;
//   opacity: 0.5;
//   position: relative;
//   em {
//     font-style: normal;
//     opacity: 0.5;
//   }
//   svg {
//     opacity: 0.5;
//     width: 1.4em;
//     margin-top: -0.2em;
//     &:not(:last-child) {
//       margin-right: 1em;
//     }
//   }
//   &:not(:last-child) {
//     margin-right: 1em;
//   }
//   &:not(:first-child) {
//     padding-left: 1rem;
//     &:before {
//       content: '—';
//       position: absolute;
//       opacity: 0.5;
//       left: 0;
//       transform: translate3d(-50%, 0, 0);
//     }
//   }
//   &:last-child {
//     flex: 1 0 auto;
//   }
// `;

// const DraftBadge = styled.span`
//   display: inline-block;
//   line-height: 1;
//   text-transform: uppercase;
//   font-size: 0.9rem;
//   padding: 0.5rem 0.75rem;
//   border-radius: 0 ${props => props.theme.radius.small} 0
//     ${props => props.theme.radius.small};
//   color: ${props => props.theme.color.primaryContrast};
//   background: ${props => props.theme.color.primary};
//   position: absolute;
//   top: 0;
//   right: 0;
// `;

// const EditButton = styled.button`
//   outline: none;
//   border: none;
//   display: inline-block;
//   line-height: 1;
//   text-transform: uppercase;
//   font-size: 0.9rem;
//   padding: 0.5rem 0.75rem;
//   border-radius: ${props => props.theme.radius.small} 0
//     ${props => props.theme.radius.small} 0;
//   color: ${props => props.theme.color.primaryContrast};
//   background: ${props => props.theme.color.primary};
//   position: absolute;
//   top: 0;
//   left: 0;
//   cursor: pointer;

//   ${props => props.isEditing && css``}
// `;

// const PostForm = authors => {
//   return {
//     // actions: [DeleteAction],
//     label: 'Post',
//     fields: [
//       {
//         label: 'Title',
//         name: 'rawJson.title',
//         component: 'text'
//       },
//       {
//         label: 'Authors',
//         name: 'rawJson.authors',
//         component: 'authors',
//         authors
//       },
//       {
//         name: 'rawJson.draft',
//         component: 'toggle',
//         label: 'Draft'
//       },
//       {
//         label: 'Date',
//         name: 'rawJson.date',
//         component: 'date'
//       }
//     ]
//   };
// };

// export const listQuery = graphql`
//   query listQuery($slug: String!, $skip: Int!, $limit: Int!) {
//     page: pagesJson(path: { eq: $slug }) {
//       path
//       title
//       listType
//       rawJson
//       fileRelativePath
//     }
//     posts: allPostsJson(
//       sort: { fields: id, order: DESC }
//       filter: { draft: { eq: false } }
//       skip: $skip
//       limit: $limit
//     ) {
//       edges {
//         node {
//           authors
//           id
//           path
//           title
//           draft
//         }
//       }
//     }
//     authors: settingsJson(
//       fileRelativePath: { eq: "/content/settings/authors.json" }
//     ) {
//       ...authors

//       rawJson
//       fileRelativePath
//     }
//   }
// `;

// export const ListNav = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;

//   a {
//     display: inline-block;
//     padding: 0.5rem 1rem;
//   }
// `;

// const ListForm = {
//   label: 'Page',
//   fields: [
//     {
//       label: 'Title',
//       name: 'rawJson.title',
//       component: 'text'
//     },
//     {
//       label: 'Hero',
//       name: 'rawJson.hero',
//       component: 'group',
//       fields: [
//         {
//           label: 'Headline',
//           name: 'headline',
//           component: 'text'
//         },
//         {
//           label: 'Textline',
//           name: 'textline',
//           component: 'text'
//         },
//         {
//           label: 'Image',
//           name: 'image',
//           component: 'image',
//           parse: filename => `../images/${filename}`,
//           uploadDir: () => '/content/images/',
//           previewSrc: formValues => {
//             if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
//               return '';
//             return formValues.jsonNode.hero.image.childImageSharp.fluid.src;
//           }
//         },
//         {
//           label: 'Actions',
//           name: 'ctas',
//           component: 'group-list',
//           itemProps: item => ({
//             key: item.link,
//             label: item.label
//           }),
//           fields: [
//             {
//               label: 'Label',
//               name: 'label',
//               component: 'text'
//             },
//             {
//               label: 'Link',
//               name: 'link',
//               component: 'text'
//             },
//             {
//               label: 'Primary',
//               name: 'primary',
//               component: 'toggle'
//             },
//             {
//               label: 'Arrow',
//               name: 'arrow',
//               component: 'toggle'
//             }
//           ]
//         },
//         {
//           label: 'Large',
//           name: 'large',
//           component: 'toggle'
//         }
//       ]
//     }
//   ]
// };
