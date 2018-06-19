import React from 'react';
import styles from './FileUpload.module.scss';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };

    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e) {
    const file = e.target.files[0];
    this.setState({ file }, () => this.props.onChange(this.state.file));
  }

  render() {
    const { className } = this.props;
    const { file } = this.state;

    return (
      <input
        id="contract_code"
        type="file"
        name="file"
        className={`${styles.fileUpload} ${className}`}
        onChange={e => this.handleFileUpload(e)}
      />
    );
  }
}

FileUpload.defaultProps = {
  onChange: () => {}
};

export default FileUpload;
