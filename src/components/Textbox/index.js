import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PlainTextarea from 'react-textarea-autosize';
import { ThemeProvider } from 'styled-components';
import { Text } from 'components';

// Delete below once refactored to reference theme.js from root
// eslint-disable-next-line import/no-webpack-loader-syntax
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/variables.scss');

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TextareaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  /* added this to avoid bug where the top and right :active border disappeared */
  /* padding: ${props => props.theme.baseSpacing}; */
  /* margin: ${props => -props.theme.baseSpacing}; */
`;

const TextareaInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Overlay = styled.div`
  position: absolute;
  top: ${props => props.theme.baseSpacing};
  right: ${props => props.theme.baseSpacing};
  margin-top: ${props => props.theme.sSpacing};
  margin-right: ${props => props.theme.sSpacing};
`;

const Textarea = styled(PlainTextarea)`
  resize: ${props => (props.resizable === 'true' ? 'vertical' : 'none')};
  flex-grow: 1;
  width: 100%;

  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`};

  overflow: auto;
  background-color: ${props => props.theme.baseInputBackground};
  border: ${props => props.theme.baseBorder};
  border-radius: ${props => props.theme.baseBorderRadius};
  font-size: ${props => props.theme.bodyFontSize};
  font-family: inherit;
  padding: ${props => props.theme.mSpacing};

  ${props =>
    props.error &&
    `
    border: 1px solid ${props => props.theme.brandDestructive};
    box-shadow: ${props.theme.brandInputBoxDestructiveShadow};
    outline: none
  `} ${props =>
    props.disabled &&
    `
      background-color: ${props.theme.brandNearWhite};
      border: none;

      &::placeholder {
        color: ${props.theme.brandLightGrey};
      }
  `}


  &::placeholder {
    color: ${props => props.theme.brandGrey};
  }

  &:focus {
    border: 1px solid ${props => props.theme.brandBlue};
    background: ${props => props.theme.brandWhite};
    box-shadow: ${props => props.theme.brandInputBoxShadow};
    outline: none;
  }
`;

const MarkdownKey = styled.div`
  background-color: ${props => props.theme.brandWhite};
  border: ${props => props.theme.baseBorder};
  border-bottom-right-radius: ${props => props.theme.baseBorderRadius};
  border-bottom-left-radius: ${props => props.theme.baseBorderRadius};
  display: none;
  align-items: center;
  padding: ${props => props.theme.baseSpacing} ${props => props.theme.mSpacing};

  > * {
    margin-right: ${props => props.theme.mSpacing};
  }

  @media only screen and (min-width: 56.25em) {
    display: flex;
  }
`;

const CodeExample = styled(Text)`
  background-color: ${props => props.theme.brandNearWhite};
  border: ${props => props.theme.baseBorder};
  border-radius: 4px;
  padding: ${props => props.theme.sSpacing};
  line-height: 1;
`;

const LabelText = styled(Text)`
  color: ${props => (props.error ? props.theme.brandRed : null)};
`;

const ErrorFragmentContainer = styled.div`
  margin-top: ${props => props.theme.baseSpacing};
`;

const ErrorFragment = ({ error }) => (
  <React.Fragment>
    {error && (
      <ErrorFragmentContainer>
        <Text typeScale="Small" color="red">
          {error}
        </Text>
      </ErrorFragmentContainer>
    )}
  </React.Fragment>
);

class Textbox extends React.Component {
  state = { text: '' };

  onTextareaChange = e => {
    const { value } = e.target;
    if (typeof this.props.value !== 'string') {
      this.setState({ text: value });
    }
    this.props.onChange(value);
  };

  render() {
    const {
      className,
      error,
      resizable,
      maxHeight,
      minHeight,
      optional,
      label,
      disabled,
      placeholder,
      overlay,
      markdownKey,
      value,
      maxLength,
      onFocus,
      onBlur,
      autoFocus
    } = this.props;

    const { text: textStateValue } = this.state;
    const textValue = typeof value === 'string' ? value : textStateValue;

    return (
      <ThemeProvider theme={theme}>
        <Container className={className}>
          <TextareaInfo>
            {label && (
              <LabelText inputLabel error={!!error}>
                {optional ? label + ' (Optional)' : label}
              </LabelText>
            )}
            {maxLength && (
              <LabelText inputLabel error={!!error}>
                {textValue.length} / {maxLength}
              </LabelText>
            )}
          </TextareaInfo>
          <TextareaContainer>
            <Textarea // style related props
              error={error}
              resizable={resizable.toString()}
              maxHeight={maxHeight}
              minHeight={minHeight} // regular props
              placeholder={placeholder}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              value={textValue}
              onChange={this.onTextareaChange}
              autoFocus={autoFocus}
            />
            {overlay ? <Overlay>{overlay}</Overlay> : null}
          </TextareaContainer>
          <ErrorFragment error={error} />
        </Container>
      </ThemeProvider>
    );
  }
}

Textbox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  resizable: PropTypes.bool,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  markdownKey: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  maxHeight: PropTypes.string,
  minHeight: PropTypes.string
};

Textbox.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  resizable: true,
  minHeight: '100px',
  markdownKey: false
};

export default Textbox;
