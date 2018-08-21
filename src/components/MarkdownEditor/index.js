import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './MarkdownEditor.module.scss';
import showdown from 'showdown';
import { DEFAULT_MARKDOWN } from 'utils/constants';
import { Textbox, Modal, Text } from 'components';

showdown.setOption('simpleLineBreaks', true);
const converter = new showdown.Converter();
converter.setFlavor('github');

class MarkdownEditor extends React.Component {
  state = {
    value: '',
    showModal: false
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  onChange = value => {
    if (typeof this.props.value !== 'string') {
      this.setState({ value });
    }
    this.props.onChange(value);
  };

  render() {
    const { value: stateValue, showModal } = this.state;
    const {
      error,
      label,
      disabled,
      onBlur,
      onFocus,
      defaultValue,
      value
    } = this.props;

    const textValue =
      typeof value === 'string' ? value : stateValue || defaultValue;

    return (
      <div className={styles.markdownEditor}>
        <Modal
          dismissable
          size={'medium'}
          fixed
          visible={showModal}
          onClose={this.hideModal}
        >
          <Modal.Header closable />
          <Modal.Body>
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(textValue)
              }}
              className="markdownContent"
            />
          </Modal.Body>
        </Modal>
        <Textbox
          error={error}
          label={label}
          value={textValue}
          disabled={disabled}
          onChange={this.onChange}
          textAreaClass={styles.textArea}
          onFocus={onFocus}
          onBlur={onBlur}
          overlay={
            <Text
              type="Small"
              className={styles.overlay}
              onClick={this.showModal}
            >
              <FontAwesomeIcon
                icon={['fal', 'eye']}
                className={styles.overlayIcon}
              />Preview
            </Text>
          }
        />
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string
};

MarkdownEditor.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  defaultValue: DEFAULT_MARKDOWN
};

export default MarkdownEditor;
