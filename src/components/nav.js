import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { mix, transparentize } from 'polished';

import { bestContrast } from './style';

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const Nav = ({ backgroundColor }) => {
  const data = useStaticQuery(graphql`
    query navQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/menu.json" }) {
        ...nav
      }
    }
  `);

  const menu = data.settingsJson;

  return (
    <>
      <Wrapper>
        {menu.menuItems.map((item) => {
          return (
            <StyledMenuItem
              backgroundColor={backgroundColor}
              active={
                typeof window !== 'undefined'
                  ? window.location.pathname === item.link
                  : false
              }
              key={item.label}
            >
              <Link to={item.link}>{item.label}</Link>
            </StyledMenuItem>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: none;
  @media (min-width: ${(props) => props.theme.breakpoints.small}px) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    background: #fafafa;
  }
`;

const StyledMenuItem = styled.div`
  ${(props) =>
    props.theme.header.transparent &&
    css`
      color: white;
      transition-duration: 0.3s;
      font-size: 18px;
      font-weight: 500;
      a {
        width: 100%;
        height: 100%;
        display: block;
        text-decoration: none;
        color: inherit !important;
        padding: 8px 16px;
      }
      &:hover {
        transition-duration: 0.3s;
        a {
          color: ${props.theme.color.primary};
        }
      }
    `};
  ${(props) =>
    !props.theme.header.transparent &&
    css`
      color: ${props.theme.header.transparent
        ? 'white'
        : bestContrast(
            hexRegex.test(props.backgroundColor)
              ? props.backgroundColor
              : props.theme.color.primary,
            props.theme.color.white,
            props.theme.color.black
          )};
      transition-duration: 0.3s;
      font-size: 18px;
      font-weight: 500;
      a {
        width: 100%;
        height: 100%;
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 8px 16px;
      }
      &:hover {
        transition-duration: 0.3s;
        a {
          color: ${props.theme.color.primary} !important;
        }
      }
    `};
`;

export const MenuItem = {
  name: 'menuItem',
  key: 'label',
  label: 'Menu Item',
  component: 'group',
  fields: [
    { name: 'label', label: 'Label', component: 'text' },
    { name: 'link', label: 'Path', component: 'text' },
  ],
};

export const MenuForm = {
  label: 'Menu',
  fields: [
    {
      label: 'Menu Items',
      name: 'rawJson.menuItems',
      component: 'blocks',
      templates: {
        MenuItem,
      },
    },
  ],
};

export const navFragment = graphql`
  fragment nav on SettingsJson {
    menuItems {
      link
      label
    }
  }
`;

export const NavForm = {
  label: 'Menu',
  fields: [
    {
      label: 'Main Menu',
      name: 'rawJson.menuItems',
      component: 'group-list',
      itemProps: (item) => ({
        label: item.label,
      }),
      fields: [
        {
          label: 'Label',
          name: 'label',
          component: 'text',
          parse(value) {
            return value || '';
          },
        },
        {
          label: 'Link',
          name: 'link',
          component: 'text',
          parse(value) {
            return value || '';
          },
        },
        {
          label: 'Sub Menu',
          name: 'subMenu',
          component: 'group-list',
          itemProps: (item) => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: 'Label',
              name: 'label',
              component: 'text',
            },
            {
              label: 'Link',
              name: 'link',
              component: 'text',
            },
            {
              label: 'Sub Menu',
              name: 'subMenu',
              component: 'group-list',
              itemProps: (item) => ({
                key: item.link,
                label: item.label,
              }),
              fields: [
                {
                  label: 'Label',
                  name: 'label',
                  component: 'text',
                },
                {
                  label: 'Link',
                  name: 'link',
                  component: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
