import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { bestContrast } from './style';

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const MobileMenu = ({ classes, backgroundColor }) => {
  const data = useStaticQuery(graphql`
    query mobileNavQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/menu.json" }) {
        ...mobileNav
      }
    }
  `);

  const [navOpen, setNavOpen] = useState(false);

  const toggleNavOpen = () => {
    setNavOpen(!navOpen);
  };

  const menu = data.settingsJson;

  return (
    <Wrapper>
      <MenuToggle background={backgroundColor} onClick={() => toggleNavOpen()}>
        {navOpen ? <span>Close</span> : <span>Menu</span>}
      </MenuToggle>
      <MenuDisplay open={navOpen}>
        <MenuWrapper>
          <>
            {menu.menuItems.map((item) => (
              <StyledMenuItem
                key={`mobileStyledMenuItem-${item.label}`}
                onClick={() => toggleNavOpen()}
              >
                <Link to={item.link}>{item.label}</Link>
              </StyledMenuItem>
            ))}
            {/* <Checkout /> */}
          </>
        </MenuWrapper>
      </MenuDisplay>
    </Wrapper>
  );
};

const styles = () => ({});

const Wrapper = styled.div`
  width: 100vw;
`;

const MenuToggle = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.small}px) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    background: #fafafa;
    padding: 8px 0;
    color: ${(props) =>
      props.theme.header.transparent
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
        color: ${(props) => props.theme.color.primary} !important;
      }
    }
    :hover {
      background: #f7f7f7;
      cursor: pointer;
    }
  }
  display: none;
`;

const StyledMenuItem = styled.div`
  text-align: center;
  a {
    width: 100%;
    color: ${(props) => props.theme.color.black};
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    justify-content: center;
    height: 100%;
    text-align: center;
    display: block;
    text-decoration: none;
    padding: 16px 0;
    transition: background 0.3s;
    &:hover {
      transition: background 0.3s;
      background: ${(props) => props.theme.color.primary}20;
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

const MenuDisplay = styled.div`
  -webkit-transition: max-height 0.35s;
  -moz-transition: max-height 0.35s;
  -ms-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
  background: #e5feff;
  overflow: hidden;
  max-height: 0;
  ${(props) =>
    props.open &&
    css`
      max-height: 500px;
      -webkit-transition: max-height 0.6s;
      -moz-transition: max-height 0.6s;
      -ms-transition: max-height 0.6s;
      -o-transition: max-height 0.6s;
      transition: max-height 0.6s;
      border-bottom: 1px solid #e8e8e8;
    `};
`;

const MenuWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: white;
  padding: 0;
`;

export default MobileMenu;

export const navFragment = graphql`
  fragment mobileNav on SettingsJson {
    menuItems {
      link
      label
    }
  }
`;
