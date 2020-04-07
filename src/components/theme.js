import React from 'react';
import { mix } from 'polished';
import { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import get from 'lodash.get';
import {
  ThemeProvider as MaterialUIThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import { bestContrast } from './style';

export const ThemeContext = React.createContext();

export const Theme = ({ children }) => {
  const data = useStaticQuery(graphql`
    query ThemeQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/theme.json" }) {
        ...globalTheme
      }
    }
  `);

  const darkMode = false;

  const globalTheme = data.settingsJson || {};

  const theme = {
    isDarkMode: darkMode,
    color: {
      black: globalTheme ? globalTheme.color.black : '#000',
      white: globalTheme ? globalTheme.color.white : '#fff',
      primary: globalTheme
        ? globalTheme.color.primary
        : '#0F5564',
      primaryContrast: bestContrast(
        globalTheme ? globalTheme.color.primary : '#0F5564',
        globalTheme ? globalTheme.color.white : '#fff',
        globalTheme ? globalTheme.color.black : '#000'
      ),
      secondary: globalTheme
        ? globalTheme.color.secondary
        : '#B8A45D',
      secondaryContrast: bestContrast(
        globalTheme ? globalTheme.color.secondary : '#B8A45D',
        globalTheme ? globalTheme.color.white : '#fff',
        globalTheme ? globalTheme.color.black : '#000'
      ),
      foreground: darkMode
        ? mix(
            0.8,
            globalTheme ? globalTheme.color.white : '#fff',
            globalTheme ? globalTheme.color.black : '#000'
          )
        : globalTheme.color.black
        ? globalTheme.color.black
        : '#000',
      background: darkMode
        ? globalTheme
          ? globalTheme.color.black
          : '#000'
        : globalTheme
        ? globalTheme.color.white
        : '#fff',
      link: bestContrast(
        darkMode
          ? globalTheme
            ? globalTheme.color.black
            : '#000'
          : globalTheme
          ? globalTheme.color.white
          : '#fff',
        globalTheme.color.primary,
        globalTheme.color.secondary
      )
    },
    breakpoints: globalTheme
      ? globalTheme.breakpoints
      : {
          small: '600px',
          medium: '1200px',
          large: '1600px',
          huge: '2200px'
        },
    header: globalTheme
      ? globalTheme.header
      : {
          backgroundColor: 'Primary',
          transparent: true,
          height: 54
        },
    hero: globalTheme
      ? globalTheme.hero
      : {
          image: '../../content/images/cafe.jpg'
        }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme
      }}
    >
      <ThemeContext.Consumer>
        {({ theme }) => {
          const palette = {
            primary: {
              main: theme.color.primary
            },
            secondary: {
              main: theme.color.secondary
            },
            background: {
              default: theme.color.background
            }
          };

          const breakpoints = {
            keys: ['sm', 'md', 'lg', 'xl'],
            values: {
              sm: theme.breakpoints.small,
              md: theme.breakpoints.medium,
              lg: theme.breakpoints.large,
              xl: theme.breakpoints.huge
            }
          };

          const muiTheme = createMuiTheme({
            spacing: 4,
            palette,
            breakpoints,
            // overrides,
            typography: {
              useNextVariants: true
            }
          });
          return (
            <MaterialUIThemeProvider theme={muiTheme}>
              <ThemeProvider theme={theme}>
                <>
                  {/* <GlobalStyles /> */}
                  {children}
                </>
              </ThemeProvider>
            </MaterialUIThemeProvider>
          );
        }}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

export const globalThemeFragment = graphql`
  fragment globalTheme on SettingsJson {
    color {
      black
      white
      primary
      secondary
    }
    breakpoints {
      small
      medium
      large
      huge
    }
    header {
      backgroundColor
      transparent
      height
    }
    hero {
      image {
        childImageSharp {
          fluid(quality: 70, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

export const ThemeForm = {
  label: 'Theme',
  fields: [
    {
      label: 'Color',
      name: 'rawJson.color',
      component: 'group',
      fields: [
        {
          label: 'Black',
          name: 'black',
          component: 'color',
          colorFormat: 'hex'
        },
        {
          label: 'White',
          name: 'white',
          component: 'color',
          colorFormat: 'hex'
        },
        {
          label: 'Primary',
          name: 'primary',
          component: 'color',
          colorFormat: 'hex'
        },
        {
          label: 'Secondary',
          name: 'secondary',
          component: 'color',
          colorFormat: 'hex'
        }
      ]
    },
    {
      label: 'Breakpoints',
      name: 'rawJson.breakpoints',
      component: 'group',
      fields: [
        {
          label: 'Small',
          name: 'small',
          component: 'rangeNumber'
        },
        {
          label: 'Medium',
          name: 'medium',
          component: 'rangeNumber'
        },
        {
          label: 'Large',
          name: 'large',
          component: 'rangeNumber'
        },
        {
          label: 'Huge',
          name: 'huge',
          component: 'rangeNumber'
        }
      ]
    },
    {
      label: 'Hero',
      name: 'rawJson.hero',
      component: 'group',
      fields: [
        {
          label: 'Default Hero Image',
          name: 'defaultImage',
          component: 'image',
          parse: filename => `../images/${filename}`,
          uploadDir: () => '/content/images/',
          previewSrc: formValues => {
            if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
              return '';
            return formValues.jsonNode.hero.image.childImageSharp.fluid.src;
          }
        }
      ]
    },
    {
      label: 'Header',
      name: 'rawJson.header',
      component: 'group',
      fields: [
        {
          label: 'Transparent',
          name: 'transparent',
          component: 'toggle',
          parse(value) {
            return value || false;
          }
        },
        {
          label: 'Background Color',
          name: 'backgroundColor',
          component: 'select',
          description: 'Primary, Secondary or White',
          options: ['Primary', 'Secondary', 'White']
        },
        {
          label: 'Height',
          name: 'height',
          component: 'rangeNumber',
          parse(value) {
            return value || '';
          }
        }
      ]
    }
  ]
};
