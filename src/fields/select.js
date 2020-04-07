/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';

export function AdvancedSelect({ input, field, options, meta }) {
  const selectOptions = options || field.options;

  return (
    <Wrapper>
      <Label htmFor={input.name}>{field.label || field.name}</Label>
      <Description>{field.description}</Description>
      <Select defaultValue={0} {...input}>
        {selectOptions.map(item => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>
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

const Select = styled.select`
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

const Option = styled.option`
  padding: 8px 0;
  width: fit-content;
  margin-left: auto;
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
