/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { AddIcon, DragIcon, ReorderIcon, TrashIcon } from '@tinacms/icons';
import {
  padding,
  color,
  radius,
  font,
  IconButton,
  shadow,
} from '@tinacms/styles';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import { useStaticQuery } from 'gatsby';

export const CategoriesField = (props) => {
  const { input, field, form, meta } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [formVisible, setFormVisible] = React.useState(false);
  const [customCategory, setCustomCategory] = React.useState(false);
  const { allCategories } = useStaticQuery(graphql`
    query {
      allCategories: settingsJson(
        fileRelativePath: { eq: "/content/settings/categories.json" }
      ) {
        categories
      }
    }
  `);
  const postCategories = input.value || [];

  const addCategory = React.useCallback(
    (categoryID) => {
      form.mutators.insert(field.name, 0, categoryID);
    },
    [field.name, form.mutators]
  );

  useEffect(() => {
    // allCategories = field.categories;
    // postCategories = input.value || [];
    // console.log(allCategories, postCategories);
  }, []);

  // const isPostCategory = (category) => {
  //   console.log(postCategories);
  //   if (postCategories.length !== 0) {
  //     postCategories.map((postCategoryID) => {
  //       console.log(category.toLowerCase().replace(/ /g, "-"));
  //       console.log(postCategoryID);
  //       if (postCategoryID === category.toLowerCase().replace(/ /g, "-")) {
  //         console.log(`${postCategoryID} === ${category.toLowerCase().replace(/ /g, "-")}`);
  //         return true;
  //       }
  //     });
  //   }
  // };

  const unusedCategories = allCategories.categories.filter(
    (category) => !postCategories.includes(category)
  );

  const keyUpFunction = (e) => {
    searchArray(e.target.value);
  };

  const searchArray = (value) => {
    let removed = 0;

    const filter = value.toUpperCase();
    const div = document.getElementById('dropdown');
    const a = div.getElementsByClassName(`${CategoryOption.styledComponentId}`);

    for (let i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = '';
      } else {
        a[i].style.display = 'none';
        console.log('Removing');
        removed++;
      }
    }

    if (removed === a.length) {
      setCustomCategory(true);
    } else {
      setCustomCategory(false);
    }
  };

  return (
    <>
      <Wrapper>
        <CategoriesHeader>
          <FieldLabel>Categories</FieldLabel>
          <IconButton
            primary
            small
            onClick={() => setFormVisible(!formVisible)}
            open={formVisible}
          >
            <AddIcon />
          </IconButton>
        </CategoriesHeader>
        {formVisible ? (
          <>
            <Label htmFor={input.name}>{field.label || field.name}</Label>
            <Description>{field.description}</Description>
            <InputWrapper>
              <Input
                onKeyUp={keyUpFunction}
                onFocus={() => setMenuVisible(true)}
              />
              <CategoryMenu id='dropdown' open={menuVisible}>
                {!customCategory ? (
                  <>
                    <CategoryMenuList>
                      {unusedCategories.map((category) => (
                        <CategoryOption
                          key='key'
                          onClick={() => {
                            addCategory(category);
                          }}
                        >
                          {category}
                        </CategoryOption>
                      ))}
                    </CategoryMenuList>
                    <Button onClick={() => setMenuVisible(false)}>
                      Done
                    </Button>
                  </>
                ) : (
                  <>
                    <CategoryMenuList flex>
                      <p>There are no categories that match that.</p>
                      <Button onClick={() => setMenuVisible(false)} flex>
                        Done
                      </Button>
                    </CategoryMenuList>
                  </>
                )}
              </CategoryMenu>
              <Error class='field-error'>{meta.error}</Error>
            </InputWrapper>
          </>
        ) : null}
      </Wrapper>
      <CategoryList>
        {postCategories.length === 0 && (
          <EmptyList>There's no categories</EmptyList>
        )}
        {postCategories.map((category, index) => {
          const categoryForList = allCategories.categories.filter(
            (newCategory) => newCategory === category
          );

          return (
            <CategoryListItem
              key='key'
              category={categoryForList}
              form={form}
              field={field}
              index={index}
            ></CategoryListItem>
          );
        })}
      </CategoryList>
    </>
  );
};

const CategoryListItem = ({ category, form, field, index }) => {
  const removeCategory = React.useCallback(() => {
    form.mutators.remove(field.name, index);
  }, [form, field, index]);

  return (
    <ListItem>
      <ItemLabel>
        {category[0] ? (
          category[0]
        ) : (
          <Placeholder>Unknown Category</Placeholder>
        )}
      </ItemLabel>
      <DeleteButton onClick={removeCategory}>
        <TrashIcon />
      </DeleteButton>
    </ListItem>
  );
};

const Button = styled.button`
  font-size: 14px;
  display: block;
  cursor: pointer;
  background: #94e536;
  color: white;
  border-radius: 50px;
  margin-left: auto;
  border: none;
  width: ${(props) => (props.flex ? '100%' : 'fit-content')};
`;

const Placeholder = styled.span`
  opacity: 0.3;
  text-transform: italic;
`;

const CategoryList = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  margin-bottom: 16px;
`;

const ItemLabel = styled.label`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: center;
  color: inherit;
  transition: all 85ms ease-out;
  text-align: left;
  padding: 0 0.5rem;
  pointer-events: none;

  ${(props) =>
    props.error &&
    css`
      color: tomato !important;
    `};
`;

const DeleteButton = styled.button`
  svg {
    position: relative;
    top: 2px;
    font-size: 12px;
    width: 25px;
    height: 25px;
    border-radius: 50px;
    fill: tomato;
  }
  background: white;
  cursor: pointer;
  text-align: center;
  flex: 0 0 auto;
  border: 0;
  border-radius: 50px;
  margin: 4px;
  padding: 0;
  width: 30px;
  height: 30px;
  transition: all 85ms ease-out;
  :hover {
    background: tomato;
    svg {
      fill: white;
    }
  }
`;

const ListItem = styled.div`
  position: relative;
  margin: 6px;
  width: fit-content;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: white;
  flex: 1 1 0;
  border: 1px solid #edecf3;
  overflow: visible;
  padding: 0;
  font-size: 16px;
  font-weight: 500;
`;

const EmptyList = styled.div`
  text-align: center;
  border-radius: 3px;
  background-color: #f7f7f7;
  color: #f7f7f7;
  line-height: 1.35;
  padding: 0.75rem 0;
  font-size: 14px;
  font-weight: 500;
`;

const CategoriesHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const FieldLabel = styled.label`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  transition: all 85ms ease-out;
  text-align: left;

  ${(props) =>
    props.error &&
    css`
      color: tomato !important;
    `};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const CategoryMenu = styled.div`
  width: 100% !important;
  height: 0px;
  padding: 0;
  border-radius: 0.3rem;
  border: 1px solid #efefef;
  display: block;
  position: relative;
  z-index: -1;
  opacity: 0;
  display: none;
  transition: all 150ms ease-out;
  transform-origin: 100% 0;
  background-color: white;
  overflow: hidden;
  z-index: 100;
  ${(props) =>
    props.open &&
    css`
      height: fit-content !important;
      width: 100%;
      display: block;
      opacity: 1;
      padding: 8px;
      transition: all 0.25s;
    `};
`;

const CategoryMenuList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${(props) => (props.flex ? '' : '-4px -4px 12px -4px')};
  p {
    width: 100%;
    margin: 0 0 8px 0;
  }
`;

const CategoryOption = styled.button`
  margin: 4px;
  background: #f7f7f7;
  border: none;
  font-size: 15px;
  :hover {
    background: orange;
    cursor: pointer;
    color: white;
  }
`;

const Wrapper = styled.div`
  height: fit-content;
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
