import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Column from './column';

const Row = ({
  standardWidth,
  breakpoints,
  spacing,
  children,
  className,
  maxColumnSize = 2,
  demo,
  vertical,
}) => {
  return (
    <Wrapper
      standardWidth={standardWidth}
      className={className || ''}
      breakpoint={breakpoints[0]}
      spacingX={spacing[0]}
      spacingY={typeof spacing[1] === 'number' ? spacing[1] : spacing[0]}
      vertical={vertical}
    >
      {React.Children.toArray(children).map((item) => {
        return item ? (
          <>
            {item.props && item.props.noGrid ? (
              <>{item}</>
            ) : (
              <Column
                demo={demo}
                maxColumnSize={maxColumnSize}
                key='column'
                breakpoints={breakpoints}
                spacingX={spacing[0]}
                spacingY={
                  typeof spacing[1] === 'number' ? spacing[1] : spacing[0]
                }
                widths={item.props.widths}
              >
                {item}
              </Column>
            )}
          </>
        ) : null;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${(props) =>
    props.vertical
      ? css`
          display: flex;
          flex-direction: column;
          margin: -${props.spacingY}px -${props.spacingX}px -${props.spacingY}px -${props.spacingX}px;
        `
      : css`
    margin: 0 -${props.spacingX}px 0 -${props.spacingX}px;
  @media (min-width: ${props.breakpoint}px) {
    display: flex;
    flex-wrap: wrap;
    ${
      props.standardWidth
        ? `
        margin: 0;
        width: 100%;
      `
        : `
        margin: 0 -${props.spacingX}px 0 -${props.spacingX}px;
    width: calc(100% + ${props.spacingX * 2}px);
      `
    }
  `}

  }
`;

Row.propTypes = {
  breakpoint: PropTypes.number,
  spacing: PropTypes.number,
};

Row.defaultProps = {
  breakpoint: 769,
  spacing: 8,
};

export default Row;
