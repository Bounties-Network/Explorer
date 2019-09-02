import React from 'react';
import PropTypes from 'prop-types';
import styles from './MarkdownEditor.module.scss';
import showdown from 'showdown';
import { Textbox, Modal, Button } from 'components';
import { newTabExtension } from 'utils/helpers';
import intl from 'react-intl-universal';

showdown.setOption('simpleLineBreaks', true);
showdown.extension('targetBlank', newTabExtension);

const converter = new showdown.Converter({ extensions: ['targetBlank'] });
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
      value,
      textBoxClassName,
      hidePreview
    } = this.props;

    const textValue =
      typeof value === 'string' ? value : stateValue || defaultValue;
    const textBoxClass = `${styles.textArea} ${textBoxClassName}`;

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
          maxHeight={'50em'}
          error={error}
          label={label}
          value={textValue}
          disabled={disabled}
          onChange={this.onChange}
          textAreaClass={textBoxClass}
          onFocus={onFocus}
          onBlur={onBlur}
          overlay={
            !hidePreview && (
              <Button
                type="action"
                buttonType={'button'}
                icon={['far', 'eye']}
                onClick={this.showModal}
              >
                {intl.get('components.editor.preview')}
              </Button>
            )
          }
          markdownKey={true}
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
  onChange: () => {}
};

export default MarkdownEditor;
