// import React, { useMemo } from 'react';
// import { graphql } from 'gatsby';
// import styled, { css } from 'styled-components';
// import {
//   Paper,
// //   Meta,
// //   MetaSpan,
// //   MetaActions,
// //   DraftBadge,
// //   EditButton,
// //   Content,
// //   Wrapper,
//    PlainText,
// } from "../components/style"
// import { Link } from 'gatsby';
// import { PageLayout } from '../components/pageLayout';
// import { TinaField, TinaForm } from '@tinacms/form-builder';
// import { Wysiwyg } from '@tinacms/fields';
// import {
//   useLocalRemarkForm,
//   useGlobalRemarkForm,
//   DeleteAction,
// } from 'gatsby-tinacms-remark';
// import { ListAuthors } from '../components/authors';
// import { useAuthors } from '../components/useAuthors';

// function Post(props) {
//   const page = props.data.markdownRemark;
//   const { isEditing, setIsEditing } = props;

//   return (
//     <PageLayout page={page}>
//       <Paper>
//         <Meta>
//           <MetaSpan>{page.frontmatter.date}</MetaSpan>
//           {page.frontmatter.authors && page.frontmatter.authors.length > 0 && (
//             <MetaSpan>
//               <em>By</em>&nbsp;
//               <ListAuthors authorIDs={page.frontmatter.authors} />
//             </MetaSpan>
//           )}
//           <MetaActions>
//             <Link to='/blog'>← Back to Blog</Link>
//           </MetaActions>
//         </Meta>
//         <h1>
//           <TinaField name='rawFrontmatter.title' Component={PlainText}>
//             {page.frontmatter.title}
//           </TinaField>
//         </h1>
//         <hr />
//         <TinaField name='rawMarkdownBody' Component={Wysiwyg}>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: page.html,
//             }}
//           />
//         </TinaField>
//         {page.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
//         {process.env.NODE_ENV !== 'production' && (
//           <EditButton
//             isEditing={isEditing}
//             onClick={() => setIsEditing((p) => !p)}
//           >
//             {isEditing ? 'Preview' : 'Edit'}
//           </EditButton>
//         )}
//       </Paper>
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
//   border-radius: 0 ${(props) => props.theme.radius.small} 0
//     ${(props) => props.theme.radius.small};
//   color: ${(props) => props.theme.color.primaryContrast};
//   background: ${(props) => props.theme.color.primary};
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
//   border-radius: ${(props) => props.theme.radius.small} 0
//     ${(props) => props.theme.radius.small} 0;
//   color: ${(props) => props.theme.color.primaryContrast};
//   background: ${(props) => props.theme.color.primary};
//   position: absolute;
//   top: 0;
//   left: 0;
//   cursor: pointer;

//   ${(props) => props.isEditing && css``}
// `;

// function RemarkForm(props) {
//   const authors = useAuthors();
//   const PostForm = useMemo(() => {
//     return {
//       actions: [DeleteAction],
//       fields: [
//         {
//           label: 'Title',
//           name: 'rawFrontmatter.title',
//           component: 'text',
//         },
//         {
//           label: 'Authors',
//           name: 'rawFrontmatter.authors',
//           component: 'authors',
//           authors: authors,
//         },
//         {
//           name: 'rawFrontmatter.draft',
//           component: 'toggle',
//           label: 'Draft',
//         },
//         {
//           label: 'Date',
//           name: 'rawFrontmatter.date',
//           component: 'date',
//         },
//         {
//           label: 'Hero Image',
//           name: 'rawFrontmatter.hero.image',
//           component: 'image',
//           parse: (filename) => `../images/${filename}`,
//           uploadDir: () => `/content/images/`,
//           previewSrc: (formValues) => {
//             if (
//               !formValues.frontmatter.hero ||
//               !formValues.frontmatter.hero.image
//             )
//               return '';
//             return formValues.frontmatter.hero.image.childImageSharp.fluid.src;
//           },
//         },
//         {
//           label: 'Body',
//           name: 'rawMarkdownBody',
//           component: 'markdown',
//         },
//       ],
//     };
//   }, []);

//   const [markdownRemark, form] = useLocalRemarkForm(
//     props.data.markdownRemark,
//     PostForm,
//   );

//   return (
//     <TinaForm form={form}>
//       {(editingProps) => {
//         return (
//           <Post
//             {...props}
//             data={{ ...props.data, markdownRemark }}
//             {...editingProps}
//           />
//         );
//       }}
//     </TinaForm>
//   );
// }

// export default RemarkForm;

// export const postQuery = graphql`
//   query($path: String!) {
//     postsJson(
//       draft: { eq: false }
//       path: { eq: $path }
//     ) {
//       id
//       frontmatter {
//         path
//         date(formatString: "MMMM DD, YYYY")
//         title
//         draft
//         authors
//   hero {
//     large
//     overlay
//     image {
//       childImageSharp {
//         fluid(quality: 70, maxWidth: 1920) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//   }
// }

//       fileRelativePath
//       rawFrontmatter
//       rawMarkdownBody
//     }
//     settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
//       ...authors
//     }
//   }
// `;
