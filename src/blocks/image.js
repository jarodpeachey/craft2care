import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import get from 'lodash.get';

export function Image({ data }) {
  return (
    data.image &&
    data.image.childImageSharp && (
      <ImageWrapper>
        <Img fluid={data.image.childImageSharp.fluid} />
      </ImageWrapper>
    )
  );
}

const ImageWrapper = styled.div`
  overflow: hidden;
`;

export const ImageBlock = {
  label: 'Image',
  name: 'image',
  key: 'test',
  defaultItem: {
    image: ''
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
    {
      label: 'Image',
      name: 'image',
      component: 'image',
      parse: filename => `../images/${filename}`,
      uploadDir: () => `/content/images/`,
      previewSrc: (formValues, fieldProps) => {
        const pathName = fieldProps.input.name.replace('rawJson', 'jsonNode');
        const imageNode = get(formValues, pathName);
        if (!imageNode || !imageNode.childImageSharp) return '';
        return imageNode.childImageSharp.fluid.src;
      }
    }
  ]
};
