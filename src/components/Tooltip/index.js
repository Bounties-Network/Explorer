import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/pro-light-svg-icons';

const ARROW_OFFSET = '40px';
const ICON_SIZE = '1rem';

const calcTooltipPosition = (align, width) => {
  let x = `calc(${width} * -0.5 + 50%);`;

  if (align === 'left') {
    x = `calc(-1 * ${ARROW_OFFSET})`;
  }
  if (align === 'right') {
    x = `calc(${width} * -1 + ${ARROW_OFFSET})`;
  }

  return `left: ${x};`;
};

const calcArrowPosition = (align, width, offset = '0px') => {
  let x = `calc(50% + ${offset} - ${ICON_SIZE} * 0.5);`;

  if (align === 'left') {
    x = `calc(${ARROW_OFFSET} + ${offset});`;
  }
  if (align === 'right') {
    x = `calc(${width} - ${ARROW_OFFSET} + ${offset});`;
  }

  return `left: ${x};`;
};

const Container = styled.div`
  position: relative;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.brandBlue};
  width: 1rem;
`;

const TooltipContainer = styled.div`
  position: absolute;
  padding: ${props => props.theme.mSpacing};
  border-radius: ${props => props.theme.baseBorderRadius};

  visibility: hidden;
  text-align: center;

  width: ${props => props.width};

  /* background color should be lighten($brand-blue, 33%) */
  background-color: #f2f7ff;
  color: ${props => props.theme.brandBlue};

  z-index: 1;
  top: 25px;
  ${({ align, width }) => calcTooltipPosition(align, width)} opacity: 0;
  transition: opacity 0.3s;

  border: solid ${props => props.theme.brandBlue};
  border-width: 1px;

  &::after {
    content: '';
    position: absolute;

    top: -14px;
    ${({ align, width }) => calcArrowPosition(align, width)} border-width: 7px;
    border-style: solid;
    border-color: transparent transparent #d1e3fe transparent;
  }

  &::before {
    content: '';
    position: absolute;

    top: -16px;
    ${({ align, width }) =>
      calcArrowPosition(align, width, '-1px')} border-width: 8px;
    border-style: solid;
    border-color: transparent transparent ${props => props.theme.brandBlue}
      transparent;
  }
`;

const Tooltip = props => {
  const { className, children, icon, width, align } = props;

  return (
    <Container className={className}>
      <Icon icon={icon} />
      <TooltipContainer
        typeScale="Small"
        className="tooltip"
        width={width}
        align={align}
      >
        {children}
      </TooltipContainer>
    </Container>
  );
};

Tooltip.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.arrayOf(PropTypes.string),
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  width: PropTypes.string
};

Tooltip.defaultProps = {
  icon: faQuestionCircle,
  position: 'bottom',
  align: 'center',
  width: '120px'
};

export default Tooltip;
