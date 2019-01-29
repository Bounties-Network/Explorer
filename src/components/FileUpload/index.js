import React from 'react';
import PropTypes from 'prop-types';
import styles from './FileUpload.module.scss';
import buttonStyles from 'components/Button/Button.module.scss';
import { Loader, Text } from 'components';
import { bytesToSize } from 'utils/helpers';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class FileUpload extends React.Component {
  state = {
    filename: null,
    filesize: null
  };

  handleChange = e => {
    const file = e.target.files[0];
    this.setState({
      filename: file.name,
      filesize: file.size
    });
    this.props.onChange(file);
  };

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }

  removeFile = e => {
    const { disabled, loading } = this.props;

    if (disabled || loading) {
      return null;
    }

    this.setState({
      filename: null,
      filesize: null
    });

    if (this.props.onChange) {
      this.props.onChange(null);
    }

    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  render() {
    const { disabled, loading, filesize, filename } = this.props;
    const { filesize: filesizeDefault, filename: filenameDefault } = this.state;
    const disabledState = loading || disabled;

    let iconClass = styles.icon;
    if (disabledState) {
      iconClass += ` ${styles.iconDisabled}`;
    }

    let filenameTextColor = 'black';
    let filesizeTextColor = 'defaultGrey';
    let iconColor = 'red';
    if (disabledState) {
      filenameTextColor = 'lightGrey';
      filesizeTextColor = 'lightGrey';
      iconColor = 'lightGrey';
    }
    let bytes = '';
    const hasFileSize = filesize || filesizeDefault;
    if (hasFileSize) {
      bytes = bytesToSize(filesize || filesizeDefault);
    }

    return (
      <div className={styles.fileUpload}>
        <div className={styles.fileLabel}>
          <div className={styles.fileInfo}>
            <Text
              typeScale="Body"
              className={styles.nameText}
              color={filenameTextColor}
            >
              {filename || filenameDefault}
            </Text>
            {filenameDefault || filename
              ? [
                  <Text
                    typeScale="Body"
                    className={styles.sizeText}
                    color={filesizeTextColor}
                    key={1}
                  >
                    {bytes ? `(${bytes})` : ''}
                  </Text>,
                  <Text typeScale="Body" color={iconColor} key={2}>
                    <FontAwesomeIcon
                      icon={['fal', 'times']}
                      className={iconClass}
                      onClick={this.removeFile}
                    />
                  </Text>
                ]
              : null}
          </div>
        </div>
        <span
          className={[
            styles.button,
            buttonStyles.button,
            buttonStyles.default,
            disabled ? buttonStyles.disabled : null
          ].join(' ')}
        >
          <div className={loading ? buttonStyles.childwrapper : ''}>
            Upload file
          </div>
          {loading && <Loader className={buttonStyles.loader} />}

          <input
            type="file"
            onChange={this.handleChange}
            className={styles.fileInput}
          />
        </span>
      </div>
    );
  }
}

FileUpload.props = {
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  filename: PropTypes.string,
  filesize: PropTypes.string,
  onChange: PropTypes.func,
  onUnmount: PropTypes.func
};

FileUpload.defaultProps = {};

export default FileUpload;
