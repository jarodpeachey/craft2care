import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { mix } from 'polished';
import slugify from 'react-slugify';
import Row from '../components/grid/row';
import { withStyles } from '@material-ui/styles';

function Form({ form, classes }) {
  if (form && form.fields && form.fields.length > 0) {
    return (
      <StyledForm
        name='contact'
        action='/.netlify/functions/handleForm'
        method='POST'
      >
        <Row spacing={[18]} breakpoints={[769]}>
          {form.fields.map((field) => {
            if (field.inputType === 'textarea') {
              return (
                <div widths={[12]}>
                  <TextField
                    className={form.style === 'dark' ? classes.input : null}
                    fullWidth
                    rows={8}
                    variant='outlined'
                    label={field.label}
                    multiline
                    name={slugify(field.label)}
                    id={slugify(field.label)}
                  ></TextField>
                </div>
              );
            } else {
              return (
                <div widths={[6]}>
                  {' '}
                  <TextField
                    className={form.style === 'dark' ? classes.input : null}
                    label={field.label}
                    fullWidth
                    variant='outlined'
                    id={slugify(field.label)}
                    name={slugify(field.label)}
                    type={field.inputType}
                    autoCorrect='off'
                    autoComplete={field.autocomplete || ''}
                  />
                </div>
              );
            }
          })}
          <ButtonWrapper widths={[12]}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              value='Submit'
            >
              Submit
            </Button>
          </ButtonWrapper>
        </Row>
      </StyledForm>
    );
  }

  return null;
}

const styles = (theme) => ({
  input: {
    background: '#f7f7f7 !important',
  },
  button: {
    marginLeft: 'auto',
  },
});

const base = {
  name: 'customInput',
  key: 'label',
  component: 'group',
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
    { name: 'label', label: 'Label', component: 'text' },
    { name: 'inputType', label: 'Input Type', component: 'text' },
    { name: 'autocomplete', label: 'Autocomplete', component: 'text' },
  ],
};

export const customInputBlock = {
  label: 'Custom Input',
  ...base,
};

export const nameInputBlock = {
  label: 'Name Input',
  defaultItem: {
    label: 'Name',
    inputType: 'text',
    autocomplete: 'name',
  },
  ...base,
};

export const emailInputBlock = {
  label: 'Email Input',
  defaultItem: {
    label: 'Email',
    inputType: 'text',
    autocomplete: 'email',
  },
  ...base,
};

export const phoneInputBlock = {
  label: 'Phone Input',
  defaultItem: {
    label: 'Phone',
    inputType: 'text',
    autocomplete: 'tel',
  },
  ...base,
};

export const companyInputBlock = {
  label: 'Company Input',
  defaultItem: {
    label: 'Company',
    inputType: 'text',
    autocomplete: 'organization',
  },
  ...base,
};

export const messageInputBlock = {
  label: 'Message Input',
  defaultItem: {
    label: 'Message',
    inputType: 'textarea',
    autocomplete: '',
  },
  ...base,
};

export const FormBlock = {
  label: 'Form',
  key: 'name',
  name: 'form',
  component: 'group',
  defaultItem: {
    name: 'Form',
    recipient: '',
    fields: [],
  },
  fields: [
    { name: 'name', label: 'Name', component: 'text', defaultValue: 'Form' },
    {
      name: 'recipient',
      label: 'Recipient',
      description: 'Form is sent to custom backend',
      component: 'text',
    },
    {
      label: 'Style',
      name: 'style',
      component: 'select',
      options: [
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Light',
          value: 'light',
        },
      ],
      defaultValue: 'dark',
    },
    {
      label: 'Fields',
      name: 'fields',
      component: 'blocks',
      templates: {
        customInputBlock,
        nameInputBlock,
        emailInputBlock,
        phoneInputBlock,
        companyInputBlock,
        messageInputBlock,
      },
    },
  ],
};

export const StyledForm = styled.form`
  width: 100%;
`;

export const FormField = styled.div`
  input,
  textarea {
    position: relative;
    line-height: 2.25rem;
    font-size: 1rem;
    padding: 0 0.625rem;
    border-radius: 3px;
    border: none;
    width: 100%;
    color: ${(props) => props.theme.color.foreground};
    background-color: ${(props) =>
      mix(0.95, props.theme.color.background, props.theme.color.foreground)};

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${(props) => props.theme.color.secondary};
    }
  }

  textarea {
    line-height: 1.5;
    padding: 0.5rem 0.625rem;
    resize: vertical;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  ${(p) =>
    p.wide &&
    css`
      @media (min-width: ${(props) => props.theme.breakpoints.medium}px) {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    `};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default withStyles(styles)(Form);
