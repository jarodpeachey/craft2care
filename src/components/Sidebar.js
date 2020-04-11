// import React from 'react';
// import styled, { css } from 'styled-components';

// const Sidebar = ({ sections, page }) => {
//   return (
//     <>
//       {sections &&
//         sections.map(({ _template, ...block }, index) => {
//           console.log(block);
//           switch (_template) {
//             case 'SidebarBlock':
//               return (
//                 <>
//                   {block.sidebarBlocks &&
//                     block.sidebarBlocks.map((sidebarBlock, newIndex) => {
//                       console.log(sidebarBlock);
//                       switch (sidebarBlock._template) {
//                         case 'TitleBlock':
//                           return (
//                             <Column>
//                               <Card
//                                 margin
//                                 key={`page-${page.title}-${sidebarBlock._template}-block-${newIndex}`}
//                               >
//                                 {block.sectionTitle !== null && (
//                                   <SidebarTitle>
//                                     {block.sectionTitle}
//                                   </SidebarTitle>
//                                 )}
//                                 <Title page={page} data={sidebarBlock} />
//                               </Card>
//                             </Column>
//                           );
//                         case 'ButtonBlock':
//                           return (
//                             <Column>
//                               <Card
//                                 margin
//                                 key={`page-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
//                               >
//                                 {block.sectionTitle !== null && (
//                                   <SidebarTitle>
//                                     {block.sectionTitle}
//                                   </SidebarTitle>
//                                 )}
//                                 <Button data={sidebarBlock} />
//                               </Card>
//                             </Column>
//                           );
//                         case 'PostsBlock':
//                           return (
//                             <Column>
//                               <Card
//                                 margin
//                                 key={`page-${page.title}-container-${_template}-block-${index}`}
//                               >
//                                 {block.sectionTitle !== null && (
//                                   <SidebarTitle>
//                                     {block.sectionTitle}
//                                   </SidebarTitle>
//                                 )}
//                                 <Posts data={sidebarBlock} />
//                               </Card>
//                             </Column>
//                           );
//                         case 'ImageBlock':
//                           return (
//                             <Column>
//                               <Card
//                                 margin
//                                 key={`page-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
//                               >
//                                 {block.sectionTitle !== null && (
//                                   <SidebarTitle>
//                                     {block.sectionTitle}
//                                   </SidebarTitle>
//                                 )}
//                                 <Image data={sidebarBlock} />
//                               </Card>
//                             </Column>
//                           );
//                         case 'GridBlock':
//                           return (
//                             <Column>
//                               <Card
//                                 margin
//                                 key={`page-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
//                               >
//                                 {block.sectionTitle !== null && (
//                                   <SidebarTitle>
//                                     {block.sectionTitle}
//                                   </SidebarTitle>
//                                 )}
//                                 <Grid page={page} data={sidebarBlock} />
//                               </Card>
//                             </Column>
//                           );
//                         case 'FormBlock':
//                           return (
//                             <Column>
//                               <Card
//                                 margin
//                                 key={`page-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
//                               >
//                                 {block.sectionTitle !== null && (
//                                   <SidebarTitle>
//                                     {block.sectionTitle}
//                                   </SidebarTitle>
//                                 )}
//                                 <Form form={sidebarBlock} />
//                               </Card>
//                             </Column>
//                           );
//                         case 'ContentBlock':
//                           if (sidebarBlock.content)
//                             return (
//                               <Column>
//                                 <Card
//                                   margin
//                                   key={`page-${page.title}-container-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
//                                 >
//                                   {block.sectionTitle !== null && (
//                                     <SidebarTitle>
//                                       {block.sectionTitle}
//                                     </SidebarTitle>
//                                   )}
//                                   <Content
//                                     key={`page-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
//                                     data={sidebarBlock}
//                                   />
//                                 </Card>
//                               </Column>
//                             );
//                           break;
//                         case 'ContainerBlock':
//                           return (
//                             <Container
//                               key={`page-${page.title}-${sidebarBlock._template}-sidebarBlock-${newIndex}`}
//                               id={newIndex}
//                               page={page}
//                               data={sidebarBlock}
//                             />
//                           );
//                         case 'SpacerBlock':
//                           return <Spacer data={sidebarBlock} />;
//                         default:
//                           return true;
//                       }
//                     })}
//                 </>
//               );
//             default:
//               else {
    return null;
}
//           }
//         })}
//     </>
//   );
// };

// const Column = styled.div`
//   padding: 0 12px 28px 12px;
//   width: calc(100% + 24px);
//   margin-left: -12px;
// `;

// const Card = styled.div`
//   background: white;
//   border-radius: 2px;
//   box-shadow: 2px 3px 5px 0px #e8e8e8;
//   padding: 24px;
// `;

// const SidebarTitle = styled.h3`
//   width: 100%;
//   padding-bottom: 24px;
//   border-bottom: 2px solid ${(props) => props.theme.color.primary};
// `;

// export default Sidebar;
