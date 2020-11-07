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
        rounded={data.rounded}
        maxWidth={data.maxWidth}
        src={data.image.childImageSharp.fluid.src}
      />
    );
    // return <img src={data.image.childImageSharp.fluid.src} alt='' />;
  } else {
    console.log('Returning null');
    return null;
  }
}

const StyledImage = styled.img`
  border-radius: ${(props) => (props.rounded ? '500px' : '0')} !important;
  max-width: ${(props) => props.maxWidth}px;
  height: auto;
  width: 100%;
  margin: 36px auto;
  display: block;
`;

export const ImageBlock = {
  label: 'Image',
  name: 'image',
  key: 'test',
  defaultItem: {
    image: '',
  },
  fields: [
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
      label: 'Max Width',
      name: 'maxWidth',
      component: 'rangeNumber',
      defaultValue: 700,
      min: 0,
      max: 700,
    },
    {
      label: 'Rounded',
      name: 'rounded',
      component: 'toggle',
      defaultValue: false,
    },
  ],
};
