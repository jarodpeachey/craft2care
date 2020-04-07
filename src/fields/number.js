/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';

export function RangeNumberField({ input, meta, field }) {
  let inputValue = null;

  if (typeof input.value !== 'number') {
    inputValue = 0;
  }

  const newInput = {
    value: inputValue || input.value,
    ...input
  };

  return (
    <Wrapper>
      <Label htmFor={input.name}>{field.label || field.name}</Label>
      <Description>{field.description}</Description>
      <Input type='number' defaultValue={0} {...newInput} />
      <Error class='field-error'>{meta.error}</Error>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  -webkit-letter-spacing: 0.01em;
  -moz-letter-spacing: 0.01em;
  -ms-letter-spacing: 0.01em;
  letter-spacing: 0.01em;
  line-height: 1.35;
  color: #433e52;
  margin-bottom: 0.5rem;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`;

const Description = styled.div`
  max-width: 100%;
  white-space: normal;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 0.3rem;
  background: #ffffff;
  font-size: 0.9375rem;
  line-height: 1.35;
  position: relative;
  background-color: #ffffff;
  -webkit-transition: all 85ms ease-out;
  transition: all 85ms ease-out;
  border: 1px solid #edecf3;
  width: 100%;
  margin: 0;
  outline: none;
  box-shadow: 0 0 0 2px transparent;
`;

const Error = styled.div`
  display: block;
  text-align: right;
  font-size: 0.8125rem;
  font-weight: 400;
  -webkit-letter-spacing: 0.01em;
  -moz-letter-spacing: 0.01em;
  -ms-letter-spacing: 0.01em;
  letter-spacing: 0.01em;
  line-height: 1.35;
  color: tomato;
  margin-bottom: 0.5rem;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  margin-top: 6px;
`;