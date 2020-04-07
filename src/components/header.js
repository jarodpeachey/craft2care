import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { Nav } from './nav';
import { ThemeContext } from './theme';
import AccountMenu from './AccountMenu';
import MobileNav from './mobileNav';
import { withStyles } from '@material-ui/core/styles';
import { bestContrast } from './style';

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const Header = ({ isSignedIn, siteTitle, classes, ...styleProps }) => {
  const [headerScrolled, setHeaderState] = useState(false);

  console.log(isSignedIn);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 78) {
        setHeaderState(true);
      } else {
        setHeaderState(false);
      }
    });
  });

  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        let backgroundColor = '#fff';

        if (theme.header.transparent) {
          backgroundColor = headerScrolled
            ? transparentize(0.3, theme.color.primary)
            : 'transparent';
        } else if (theme.header.backgroundColor.toLowerCase() === 'primary') {
          backgroundColor = theme.color.primary;
        } else if (theme.header.backgroundColor.toLowerCase() === 'secondary') {
          backgroundColor = theme.color.secondary;
        } else if (theme.header.backgroundColor.toLowerCase() === 'white') {
          backgroundColor = theme.color.white;
        }

        return (
          <Wrapper scrolled={headerScrolled} backgroundColor={backgroundColor}>
            <Flex className='container header'>
              <MobileNav backgroundColor={backgroundColor} />
              <SiteTitle
                isSignedIn={isSignedIn}
                backgroundColor={backgroundColor}
              >
                <Link to='/' className='no-underline'>
                  {siteTitle}
                </Link>
              </SiteTitle>
              <Nav backgroundColor={backgroundColor} />
              <AccountMenu
                isSignedIn={isSignedIn}
                backgroundColor={backgroundColor}
              />
            </Flex>
          </Wrapper>
        );
      }}
    </ThemeContext.Consumer>
  );
};

const Wrapper = styled.div`
  transition-duration: 0.3s;
  background: ${(props) => props.backgroundColor};
  top: 0;
  left: auto;
  right: 0;
  position: fixed;
  width: 100%;
  display: flex;
  z-index: 1100;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
  box-shadow: ${(props) =>
    props.scrolled
      ? '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
      : null};
  backdrop-filter: ${(props) => (props.scrolled ? 'blur(8px)' : null)};
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: ${(props) => props.theme.breakpoints.medium}px) {
    justify-content: flex-start;
  }
`;

const SiteTitle = styled.h1`
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
  text-decoration: none !important;
  border: none !important;
  font-weight: 500 !important;
  margin: 0 auto;
  @media (min-width: 769px) {
    margin: 0;
  }
  @media (max-width: 769px) {
    left: ${(props) => (props.isSignedIn ? '25px' : '0')};
    font-size: 32px;
    position: relative;
    a {
      font-size: 32px;
    }
  }
  a {
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
    text-decoration: none !important;
    border: none !important;
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const styles = () => ({
  appBar: {
    backdropFilter: 'blur(8px)',
  },
});

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default withStyles(styles)(Header);