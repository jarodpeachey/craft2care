import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import get from 'lodash.get';
import { useLayoutEffect } from 'react';

export function Image({ data }) {
  const element = useRef();

  if (
    typeof data.image === 'object' &&
    data.image &&
    data.image.childImageSharp
  ) {
    return (
      <StyledImage
        ref={element}
        width={0}
        id={`styled-image-${data.image.childImageSharp.fluid}`}
        fluid={data.image.childImageSharp.fluid}
      />
    );
    // return <img src={data.image.childImageSharp.fluid.src} alt='' />;
  } else {
    console.log('Returning null');
    return null;
  }
}

const StyledImage = styled(Img)`
  overflow: hidden;
  img {
    border-radius: ${(props) => (props.rounded ? '50%' : '')};
  }
  @media (max-width: 769px) {
    max-height: 275px !important;
    object-fit: cover;
    margin: 0 auto;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    * {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    * {
      height: 100% !important;
      margin: 0 auto;
      width: auto !important;
    }
    img {
      margin-left: calc(50% - ${(props) => props.width});
    }
  }
`;

export const ImageBlock = {
  label: 'Image',
  name: 'image',
  key: 'test',
  defaultItem: {
    image: '',
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
      parse: (filename) => `../images/${filename}`,
      uploadDir: () => `/content/images/`,
      previewSrc: (formValues, fieldProps) => {
        console.log('formValues: ', formValues);
        console.log('fieldProps: ', fieldProps);
        const pathName = fieldProps.input.name.replace('rawJson', 'jsonNode');
        console.log('pathName: ', pathName);
        const imageNode = get(formValues, pathName);
        console.log('imageNode: ', imageNode);
        if (!imageNode || !imageNode.childImageSharp) return '';
        return imageNode.childImageSharp.fluid.src;
      },
    },
    {
      label: 'Rounded',
      name: 'rounded',
      component: 'toggle',
      defaultValue: false,
    },
  ],
};
