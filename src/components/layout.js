// /* eslint-disable react/jsx-fragments */
// import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
// import styled, { css } from 'styled-components';
// import Helmet from 'react-helmet';
// import TinaLayoutComponent from './tinaLayout';
// import { Theme } from './theme';
// import { Footer } from './footer';
// import Header from './header';
// import { Spacer } from '../blocks/spacer';
// import AppProvider from './AppProvider';

// const userSignedIn = true;

// const Layout = ({ children, pageContext }) => {
//   console.log(pageContext.layout);
//   console.log('Children: ', children);

//   const data = useStaticQuery(graphql`
//     query defaultLayoutQuery {
//       site: settingsJson(
//         fileRelativePath: { eq: "/content/settings/site.json" }
//       ) {
//         title
//       }
//     }
//   `);

//   if (pageContext.layout && pageContext.layout === 'noLayout') {
//     return (
//       <AppProvider>
//         <Theme>
//           <>
//             <Header isSignedIn={userSignedIn} siteTitle={data.site.title} />
//             <Spacer height={58} />
//             {children}
//             <Footer />
//           </>
//         </Theme>
//       </AppProvider>
//     );
//   } else {
//     return (
//       <TinaLayoutComponent isSignedIn={userSignedIn}>
//         {children}
//       </TinaLayoutComponent>
//     );
//   }
// };

// const SiteWrapper = styled.div`
//   // background: #f1f1f1;
//   // display: flex;
//   // justify-content: space-between;
//   // flex-direction: column;
//   // min-height: 100vh;
//   // max-height: 100vh;
//   // height: 100vh;
// `;

// export const Site = styled.div`
//   position: relative;
//   display: flex;
//   min-height: 100vh;
//   height: 100vh;
//   flex-direction: column;
//   justify-content: space-between;
//   > * {
//     flex: 1 0 auto;
//   }
// `;

// export default Layout;
