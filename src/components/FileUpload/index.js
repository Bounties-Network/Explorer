import React from 'react';
import PropTypes from 'prop-types';
import styles from './FileUpload.module.scss';
import { Text, Button } from 'components';
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

  removeFile = e => {
    const { disabled, loading } = this.props;

    if (disabled || loading) {
      return null;
    }

    this.setState({
      filename: null,
      filesize: null
    });
    this.props.onChange(null);
  };

  render() {
    const { file, disabled, loading, filesize, filename } = this.props;
    const { filesize: filesizeDefault, filename: filenameDefault } = this.state;
    const disabledState = loading || disabled;

    let uploadStyles = styles.fileUpload;
    let iconClass = styles.icon;
    if (disabledState) {
      uploadStyles += ` ${styles.disabled}`;
      iconClass += ` ${styles.iconDisabled}`;
    }

    let filenameTextColor = 'black';
    let filesizeTextColor = 'grey';
    let iconColor = 'red';
    if (disabledState) {
      filenameTextColor = 'grey';
      filesizeTextColor = 'lightGrey';
      iconColor = 'grey';
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
                  ((
                    <Text
                      typeScale="Body"
                      className={styles.sizeText}
                      color={filesizeTextColor}
                      key={1}
                    >
                      {bytes ? `(${bytes})` : ''}
                    </Text>
                  ): null),
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
        <Button className={styles.button} disabled={disabled} loading={loading}>
          <input
            disabled={disabledState}
            className={styles.fileInput}
            type="file"
            onChange={this.handleChange}
          />
          Upload File
        </Button>
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
  onChange: PropTypes.func
};

FileUpload.defaultProps = {};

export default FileUpload;
