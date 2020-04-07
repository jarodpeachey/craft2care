/* eslint-disable react/jsx-fragments */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import BackgroundImage from 'gatsby-background-image';
import { Link } from 'gatsby';
import { Button } from '@material-ui/core';

export const Hero = ({ title, theme, hero, headerHeight }) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  return (
    <>
      {hero.image || theme.hero.image ? (
        <Wrapper heroHeight={hero.height}>
          <Background
            Tag='section'
            fluid={
              hero.image
                ? hero.image.childImageSharp.fluid
                : theme.hero.image.childImageSharp.fluid
            }
            fadeIn='soft'
            style={{
              height: '100% !important',
              width: '100% !important'
            }}
          >
            {hero.overlay && <Overlay color={hero.overlayColor} />}
            <div className='container'>
              <Content
                center={hero.center}
                headerHeight={headerHeight}
                large={hero.large}
              >
                {hero.headline ? (
                  <Headline
                    noTextLine={typeof hero.textLine !== 'string'}
                    color={
                      hero.headlineColor === 'primary'
                        ? props => props.theme.color.primary
                        : hero.headlineColor === 'secondary'
                        ? props => props.theme.color.secondary
                        : hexRegex.test(hero.headlineColor)
                        ? hero.headlineColor
                        : props => props.theme.color.white
                    }
                  >
                    {hero.headline}
                  </Headline>
                ) : (
                  <Headline
                    noTextLine={typeof hero.textLine !== 'string'}
                    color={
                      hero.headlineColor === 'primary'
                        ? props => props.theme.color.primary
                        : hero.headlineColor === 'secondary'
                        ? props => props.theme.color.secondary
                        : hexRegex.test(hero.headlineColor)
                        ? hero.headlineColor
                        : props => props.theme.color.white
                    }
                  >
                    {title}
                  </Headline>
                )}
                {hero.textline && (
                  <Textline
                    textcolor={
                      hero.textlineColor === 'primary'
                        ? props => props.theme.color.primary
                        : hero.textlineColor === 'secondary'
                        ? props => props.theme.color.secondary
                        : hexRegex.test(hero.textlineColor)
                        ? hero.textlineColor
                        : '#f7f7f7'
                    }
                  >
                    {hero.textline}
                  </Textline>
                )}
                {hero.ctas && (
                  <Actions>
                    {Object.keys(hero.ctas).map(key => {
                      return (
                        <Link
                          key={`hero-cta-${key}`}
                          className='no-underline'
                          to={hero.ctas[key].link}
                        >
                          <Button
                            variant='contained'
                            color={
                              hero.ctas[key].backgroundColor === 'secondary'
                                ? 'secondary'
                                : 'primary'
                            }
                          >
                            {hero.ctas[key].label}
                          </Button>
                        </Link>
                      );
                    })}
                  </Actions>
                )}
              </Content>
            </div>
          </Background>
          {/* <Background>
        {hero.overlay && <Overlay />}
        {hero.image && (
          <BackgroundImage fluid={hero.image.childImageSharp.fluid} />
        )}
      </Background> */}
        </Wrapper>
      ) : (
        <h1>Test</h1>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  opacity: 0.3;
  z-index: -1;
`;

const Wrapper = styled.div`
  height: ${props =>
    props.heroHeight < 250 ? '250px' : `${props.heroHeight}px`};
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

const Content = styled.div`
  text-align: ${props => (props.center ? 'center' : null)};
  display: block;
  padding-top: ${props => props.headerHeight}px;
`;

const Background = styled(BackgroundImage)`
  // background-size: cover !important;
  // background-repeat: no-repeat !important;
  // background-attachment: fixed !important;
  height: 100% !important;
  width: 100% !important;
  max-height: 100% !important;
  max-width: 100% !important;
  // display: flex !important;
  // align-items: center !important;
  // justify-content: center !important;
  display: flex !important;
  align-items: center !important;
  background-color: ${props => transparentize(0.1, props.theme.color.primary)};
`;

export const Headline = styled.h2`
  font-size: 2.6em;
  margin-bottom: ${props => (props.noTextLine ? '0' : null)};
  line-height: 1.2;
  color: ${props => props.color};
  word-spacing: 1px;
  font-weight: 700;
  text-transform: none;
`;

export const Textline = styled.p`
  font-size: 1.3rem;
  line-height: 1.2;
  color: ${props => props.textcolor};
  word-spacing: 1px;
  font-weight: 500;
  text-transform: none;
  padding-bottom: 0.3rem;
`;

export const Actions = styled.div`
  padding-bottom: 0.5rem;
  > * {
    margin-right: 1rem;
  }
`;
