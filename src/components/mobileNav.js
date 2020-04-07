import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { bestContrast } from './style';

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const MobileNav = ({ classes, backgroundColor }) => {
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
      <MenuIcon background={backgroundColor} onClick={() => toggleNavOpen()}>
        <FontAwesomeIcon icon='bars' />
      </MenuIcon>
      <MenuOverlay open={navOpen} />
      <MenuDisplay open={navOpen}>
        <IconButton
          onClick={() => {
            toggleNavOpen();
          }}
          className={classes.closeButton}
        >
          <FontAwesomeIcon icon='times' />
        </IconButton>
        <MenuWrapper>
          <>
            {menu.menuItems.map(item => (
              <MenuItem
                key={`mobileMenuItem-${item.label.toLowerCase()}`}
                onClick={() => toggleNavOpen()}
              >
                <Link to={item.link}>{item.label}</Link>
              </MenuItem>
            ))}
            {/* <Checkout /> */}
          </>
        </MenuWrapper>
      </MenuDisplay>
    </Wrapper>
  );
};

const styles = () => ({
  closeButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    marginRight: 'auto',
    padding: '8px !important',
    fontSize: 22,
    zIndex: 1,
    width: 50,
    height: 50
  }
});

const Wrapper = styled.span`
  @media (max-width: ${props => props.theme.breakpoints.medium}px) {
    display: inline-block;
    margin-right: auto;
  }
  display: none;
`;

const MenuIcon = styled(IconButton)`
  * {
    color: ${props =>
      props.theme.header.transparent
        ? 'white'
        : bestContrast(
            hexRegex.test(props.background)
              ? props.background
              : props.theme.color.primary,
            props.theme.color.white,
            props.theme.color.black
          )};
  }
  padding: 12px !important;
  font-size: 22pxpx;
  z-index: 1;
  width: 50px !important;
  height: 50px !important;
`;

const MenuDisplay = styled.div`
  content: '';
  position: fixed;
  color: black;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  width: 75%;
  max-width: 350px;
  background: white;
  transform-origin: 0 0;
  opacity: ${props => (props.open ? 1 : 0)};
  z-index: ${props => (props.open ? '19' : '-1')};
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  transform: ${props => (props.open ? 'translateX(0%)' : 'translateX(-100%)')};
  transition: all 0.275s 0.1s;
`;

const MenuOverlay = styled.div`
  width: 200vw;
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  opacity: ${props => (props.open ? 1 : 0)};
  z-index: ${props => (props.open ? '19' : '-1')};
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  transition: all 0.275s 0.1s;
`;

const MenuWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: white;
  padding: 66px 0 76px;
`;

const MenuItem = styled.div`
  width: 100%;
  background: white;
  border-top: 1px solid #ddd;
  transition-duration: 0.3s;
  font-size: 18px;
  font-weight: 500;
  &:last-child {
    border-bottom: 1px solid #ddd;
  }
  a {
    width: 100%;
    display: block;
    text-decoration: none;
    color: inherit !important;
    padding: 16px 32px;
  }
  &:hover {
    background: #f7f7f7;
    transition-duration: 0.3s;
  }
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  width: 100%;
  margin: 0 auto;
`;

export default withStyles(styles)(MobileNav);

export const navFragment = graphql`
  fragment mobileNav on SettingsJson {
    menuItems {
      link
      label
    }
  }
`;
