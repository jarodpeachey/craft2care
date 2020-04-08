import React from 'react';
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

export const CategoriesField = (props) => {
  const { input, field, form } = props;
  const [visible, setVisible] = React.useState(false);
  const categories = field.categories;
  const categoryIDs = input.value || [];

  console.log(props);

  const addCategory = React.useCallback(
    (categoryID) => {
      form.mutators.insert(field.name, 0, categoryID);
    },
    [field.name, form.mutators]
  );

  return (
    <>
      <CategoriesHeader>
        <FieldLabel>Categories</FieldLabel>
        <IconButton
          primary
          small
          onClick={() => setVisible(!visible)}
          open={visible}
        >
          <AddIcon />
        </IconButton>
        <CategoryMenu open={visible}>
          <CategoryMenuList>
            {categories.map((category) => (
              <CategoryOption
                onClick={() => {
                  addCategory(category.id);
                  setVisible(false);
                }}
              >
                {category.name}
              </CategoryOption>
            ))}
          </CategoryMenuList>
        </CategoryMenu>
      </CategoriesHeader>
      <Droppable droppableId={field.name} type={field.name}>
        {(provider) => (
          <CategoryList ref={provider.innerRef}>
            {categoryIDs.length === 0 && (
              <EmptyList>There's no categories</EmptyList>
            )}
            {categoryIDs.map((categoryID, index) => {
              const category = categories.find((category) => category.id === categoryID);
              return (
                <CategoryListItem
                  category={category}
                  form={form}
                  field={field}
                  index={index}
                ></CategoryListItem>
              );
            })}
            {provider.placeholder}
          </CategoryList>
        )}
      </Droppable>
    </>
  );
};

const CategoryListItem = ({ category, form, field, index }) => {
  const removeCategory = React.useCallback(() => {
    form.mutators.remove(field.name, index);
  }, [form, field, index]);

  return (
    <Draggable
      key={index}
      type={field.name}
      draggableId={`${field.name}.${index}`}
      index={index}
    >
      {(provider, snapshot) => (
        <ListItem
          ref={provider.innerRef}
          isDragging={snapshot.isDragging}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          <DragHandle />
          <ItemLabel>
            {category && category.name ? (
              category.name
            ) : (
              <Placeholder>Unknown Category</Placeholder>
            )}
          </ItemLabel>
          <DeleteButton onClick={removeCategory}>
            <TrashIcon />
          </DeleteButton>
        </ListItem>
      )}
    </Draggable>
  );
};

const CategoryList = styled.div`
  margin-bottom: 1.5rem;
`;

const Placeholder = styled.span`
  opacity: 0.3;
  text-transform: italic;
`;

const ItemLabel = styled.label`
  margin: 0;
  font-size: 12px;
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

const DragHandle = styled(function DragHandle({ ...styleProps }) {
  return (
    <div {...styleProps}>
      <DragIcon />
      <ReorderIcon />
    </div>
  );
})`
  margin: 0;
  flex: 0 0 auto;
  width: 2rem;
  position: relative;
  fill: inherit;
  padding: 0.75rem 0;
  transition: all 85ms ease-out;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1.25rem;
    height: 1.25rem;
    transform: translate3d(-50%, -50%, 0);
    transition: all 85ms ease-out;
  }
  svg:last-child {
    opacity: 0;
  }
`;

const DeleteButton = styled.button`
  text-align: center;
  flex: 0 0 auto;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  margin: 0;
  transition: all 85ms ease-out;
  &:hover {
    background-color: #f7f7f7;
  }
`;

const ListItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: white;
  border: 1px solid #f7f7f7;
  margin: 0 0 -1px 0;
  overflow: visible;
  line-height: 1.35;
  padding: 0;
  font-size: 14px;
  font-weight: 500;

  ${ItemLabel} {
    color: #282828;
    align-self: center;
    max-width: 100%;
  }

  svg {
    fill: #f7f7f7;
    width: 1.25rem;
    height: auto;
    transition: fill 85ms ease-out;
  }

  &:hover {
    background-color: #f6f6f9;
    cursor: grab;

    ${ItemLabel} {
      color: #0084ff;
    }
    ${DeleteButton} {
      svg {
        fill: #f7f7f7;
      }
      &:hover {
        svg {
          fill: #f7f7f7;
        }
      }
    }
    ${DragHandle} {
      svg {
        fill: #f7f7f7;
      }
      svg:first-child {
        opacity: 0;
      }
      svg:last-child {
        opacity: 1;
      }
    }
  }

  &:first-child {
    border-radius: 0.25rem 0.25rem 0 0;
  }

  &:nth-last-child(2) {
    border-radius: 0 0 0.25rem 0.25rem;
    &:first-child {
      border-radius: 3px;
    }
  }

  ${(p) =>
    p.isDragging &&
    css`
      border-radius: 3px;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.12);

      svg {
        fill: #f7f7f7;
      }
      ${ItemLabel} {
        color: #0084ff;
      }

      ${DragHandle} {
        svg:first-child {
          opacity: 0;
        }
        svg:last-child {
          opacity: 1;
        }
      }
    `};
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

const CategoryMenu = styled.div`
  min-width: 12rem;
  border-radius: 5px;
  border: 1px solid #efefef;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(0, 0, 0) scale3d(0.5, 0.5, 1);
  opacity: 0;
  pointer-events: none;
  transition: all 150ms ease-out;
  transform-origin: 100% 0;
  background-color: white;
  overflow: hidden;
  z-index: 100;
  ${(props) =>
    props.open &&
    css`
      opacity: 1;
      pointer-events: all;
      transform: translate3d(0, 2.25rem, 0) scale3d(1, 1, 1);
    `};
`;

const CategoryMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryOption = styled.button`
  position: relative;
  text-align: center;
  font-size: 12px;
  padding: 4px;
  font-weight: 500;
  width: 100%;
  background: none;
  cursor: pointer;
  outline: none;
  border: 0;
  transition: all 85ms ease-out;
  &:hover {
    background-color: #f6f6f9;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`;
