// /* eslint-disable import/prefer-default-export */
// export const query = graphql`
//   query {
//     title
//     path
//     date
//     categories
//     image {
//       childImageSharp {
//         fluid(quality: 70, maxWidth: 1920) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     rounded
//     draft
//     blocks {
//       _template
//       background
//       name
//       title
//       type
//       content
//       sectionTitle
//       buttonText
//       height
//       style
//       left
//       image {
//         childImageSharp {
//           fluid(quality: 70, maxWidth: 1920) {
//             ...GatsbyImageSharpFluid_withWebp
//           }
//         }
//       }
//       right
//       rounded
//       center
//       buttonLink
//       buttonColor
//       underline
//       recipient
//       itemsToShow
//       maxNumberOfColumns
//       categories
//       demo
//       columnSpacing
//       widthOne
//       widthTwo
//       columns {
//         _template
//         background
//         name
//         title
//         type
//         content
//         sectionTitle
//         buttonText
//         height
//         style
//         left
//         image {
//           childImageSharp {
//             fluid(quality: 70, maxWidth: 1920) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//         right
//         rounded
//         center
//         buttonLink
//         buttonColor
//         underline
//         recipient
//         itemsToShow
//         maxNumberOfColumns
//         categories
//         demo
//         columnSpacing
//         widthOne
//         widthTwo
//         columnBlocks {
//           _template
//           background
//           name
//           title
//           type
//           content
//           sectionTitle
//           buttonText
//           height
//           style
//           left
//           image {
//             childImageSharp {
//               fluid(quality: 70, maxWidth: 1920) {
//                 ...GatsbyImageSharpFluid_withWebp
//               }
//             }
//           }
//           right
//           rounded
//           center
//           buttonLink
//           buttonColor
//           underline
//           recipient
//           itemsToShow
//           maxNumberOfColumns
//           categories
//           demo
//           columnSpacing
//           widthOne
//           widthTwo
//         }
//       }
//     }
//     sidebar {
//       showSidebar
//       _template
//       background
//       name
//       title
//       type
//       content
//       sectionTitle
//       buttonText
//       height
//       style
//       left
//       image {
//         childImageSharp {
//           fluid(quality: 70, maxWidth: 1920) {
//             ...GatsbyImageSharpFluid_withWebp
//           }
//         }
//       }
//       right
//       rounded
//       center
//       buttonLink
//       buttonColor
//       underline
//       recipient
//       itemsToShow
//       maxNumberOfColumns
//       categories
//       demo
//       columnSpacing
//       widthOne
//       widthTwo
//       columns {
//         _template
//         background
//         name
//         title
//         type
//         content
//         sectionTitle
//         buttonText
//         height
//         style
//         left
//         image {
//           childImageSharp {
//             fluid(quality: 70, maxWidth: 1920) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//         right
//         rounded
//         center
//         buttonLink
//         buttonColor
//         underline
//         recipient
//         itemsToShow
//         maxNumberOfColumns
//         categories
//         demo
//         columnSpacing
//         widthOne
//         widthTwo
//         columnBlocks {
//           _template
//           background
//           name
//           title
//           type
//           content
//           sectionTitle
//           buttonText
//           height
//           style
//           left
//           image {
//             childImageSharp {
//               fluid(quality: 70, maxWidth: 1920) {
//                 ...GatsbyImageSharpFluid_withWebp
//               }
//             }
//           }
//           right
//           rounded
//           center
//           buttonLink
//           buttonColor
//           underline
//           recipient
//           itemsToShow
//           maxNumberOfColumns
//           categories
//           demo
//           columnSpacing
//           widthOne
//           widthTwo
//         }
//       }
//       sidebarSections {
//         showSidebar
//         _template
//         background
//         name
//         title
//         type
//         content
//         sectionTitle
//         buttonText
//         height
//         style
//         left
//         image {
//           childImageSharp {
//             fluid(quality: 70, maxWidth: 1920) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//         right
//         rounded
//         center
//         buttonLink
//         buttonColor
//         underline
//         recipient
//         itemsToShow
//         maxNumberOfColumns
//         categories
//         demo
//         columnSpacing
//         widthOne
//         widthTwo
//         columns {
//           _template
//           background
//           name
//           title
//           type
//           content
//           sectionTitle
//           buttonText
//           height
//           style
//           left
//           image {
//             childImageSharp {
//               fluid(quality: 70, maxWidth: 1920) {
//                 ...GatsbyImageSharpFluid_withWebp
//               }
//             }
//           }
//           right
//           rounded
//           center
//           buttonLink
//           buttonColor
//           underline
//           recipient
//           itemsToShow
//           maxNumberOfColumns
//           categories
//           demo
//           columnSpacing
//           widthOne
//           widthTwo
//           columnBlocks {
//             _template
//             background
//             name
//             title
//             type
//             content
//             sectionTitle
//             buttonText
//             height
//             style
//             left
//             image {
//               childImageSharp {
//                 fluid(quality: 70, maxWidth: 1920) {
//                   ...GatsbyImageSharpFluid_withWebp
//                 }
//               }
//             }
//             right
//             rounded
//             center
//             buttonLink
//             buttonColor
//             underline
//             recipient
//             itemsToShow
//             maxNumberOfColumns
//             categories
//             demo
//             columnSpacing
//             widthOne
//             widthTwo
//           }
//         }
//         sidebarBlocks {
//           showSidebar
//           _template
//           background
//           name
//           title
//           type
//           content
//           sectionTitle
//           buttonText
//           height
//           style
//           left
//           image {
//             childImageSharp {
//               fluid(quality: 70, maxWidth: 1920) {
//                 ...GatsbyImageSharpFluid_withWebp
//               }
//             }
//           }
//           right
//           rounded
//           center
//           buttonLink
//           buttonColor
//           underline
//           recipient
//           itemsToShow
//           maxNumberOfColumns
//           categories
//           demo
//           columnSpacing
//           widthOne
//           widthTwo
//           columns {
//             _template
//             background
//             name
//             title
//             type
//             content
//             sectionTitle
//             buttonText
//             height
//             style
//             left
//             image {
//               childImageSharp {
//                 fluid(quality: 70, maxWidth: 1920) {
//                   ...GatsbyImageSharpFluid_withWebp
//                 }
//               }
//             }
//             right
//             rounded
//             center
//             buttonLink
//             buttonColor
//             underline
//             recipient
//             itemsToShow
//             maxNumberOfColumns
//             categories
//             demo
//             columnSpacing
//             widthOne
//             widthTwo
//             columnBlocks {
//               _template
//               background
//               name
//               title
//               type
//               content
//               sectionTitle
//               buttonText
//               height
//               style
//               left
//               image {
//                 childImageSharp {
//                   fluid(quality: 70, maxWidth: 1920) {
//                     ...GatsbyImageSharpFluid_withWebp
//                   }
//                 }
//               }
//               right
//               rounded
//               center
//               buttonLink
//               buttonColor
//               underline
//               recipient
//               itemsToShow
//               maxNumberOfColumns
//               categories
//               demo
//               columnSpacing
//               widthOne
//               widthTwo
//             }
//           }
//         }
//       }
//     }
//   }
// `;
