import React from 'react';
import { Croppie } from 'croppie/croppie';
import '../../styles/Croppie.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Circle, Button } from 'components';
import styles from './Cropper.module.scss';

class Cropper extends React.Component {
  constructor(props) {
    super(props);
    this.croppieImg = React.createRef();
    this.croppieInput = React.createRef();
    this.state = {
      src: props.src,
      activeCrop: false,
      fileName: 'image',
      // used to force react to reload input component
      nonce: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activeCrop &&
      this.state.file &&
      prevState.file !== this.state.file
    ) {
      this.readFile();
    }
  }

  onDelete = e => {
    e.preventDefault();

    if (this.croppie) {
      this.croppie.destroy();
      this.croppie = null;
    }

    this.props.onDelete();
    this.setState({
      activeCrop: false,
      src: null,
      nonce: this.state.nonce + 1
    });
  };

  save = e => {
    e.preventDefault();

    this.croppie
      .result({
        type: 'blob',
        size: 'viewport',
        quality: 0.75,
        circle: true
      })
      .then(blob => {
        blob.name = this.state.file.name;
        this.props.onChange(blob);

        if (this.croppie) {
          this.croppie.destroy();
          this.croppie = null;
        }

        this.setState({ activeCrop: false });
      });
  };

  readFile = () => {
    const file = this.croppieInput.current.files[0];

    if (!this.croppie) {
      this.croppie = new Croppie(this.croppieImg.current, {
        viewport: {
          type: 'circle',
          width: '100',
          height: '100'
        },
        boundary: {
          width: '150',
          height: '150'
        }
      });
    }
    const reader = new FileReader();
    reader.onload = e => {
      this.croppie.bind({ url: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  onInputChange = e => {
    this.setState({ activeCrop: true, src: null, file: e.target.files[0] });
  };

  render() {
    const { loading, disabled, src: propsSrc } = this.props;
    const {
      activeCrop,
      loading: loadingState,
      src: srcState,
      nonce
    } = this.state;
    const isLoading = loading || loadingState;

    const src = propsSrc || srcState;
    const disabledState = isLoading || disabled;

    let inputStyle = styles.input;
    let croppieClass = styles.croppie;
    if (!activeCrop || isLoading) {
      croppieClass += ` ${styles.inactive}`;
    }

    if (disabledState) {
      inputStyle += ` ${styles.disabledInput}`;
    }

    return (
      <div className={styles.cropper}>
        <div className={`${styles.contentWrapper} row middle-xs`}>
          <div className="col-xs-3">
            <div className={croppieClass} ref={this.croppieImg} />
            {src && !activeCrop && !loading ? (
              <Circle
                type="img"
                size="large"
                input={src}
                color="lightGrey"
                border
                className={styles.circleContent}
              />
            ) : null}
            {!activeCrop && !src && !isLoading ? (
              <Circle
                type="text"
                size="large"
                input={<FontAwesomeIcon icon={['fal', 'camera']} />}
                textColor="darkGrey"
                color="lightGrey"
                border
                className={styles.circleContent}
              />
            ) : null}
            {isLoading ? (
              <Circle
                type="loading"
                size="large"
                color="lightGrey"
                border
                className={styles.circleContent}
              />
            ) : null}
          </div>
          <div className="col-xs-9">
            <Button className={styles.upload} disabled={disabledState}>
              Upload New Photo
              <input
                key={nonce}
                type="file"
                accept="image/*"
                onChange={this.onInputChange}
                className={inputStyle}
                ref={this.croppieInput}
                disabled={disabledState}
              />
            </Button>
            {activeCrop || isLoading ? (
              <Button
                type="action"
                className={styles.saveButton}
                loading={isLoading}
                onClick={this.save}
              >
                Save
              </Button>
            ) : null}
            {activeCrop || src ? (
              <Button
                type="link-destructive"
                onClick={this.onDelete}
                disabled={disabledState}
              >
                Delete
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Cropper;
