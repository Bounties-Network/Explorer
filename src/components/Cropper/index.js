import React from 'react';
import { Croppie } from 'croppie/croppie';
import '../../styles/Croppie.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Circle, Button } from 'components';
import buttonStyles from 'components/Button/Button.module.scss';
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
    this.removeCroppie(e);
    this.props.onDelete();
    this.setState({ src: null });
  };

  removeCroppie = e => {
    e.preventDefault();

    if (this.croppie) {
      this.croppie.destroy();
      this.croppie = null;
    }

    this.setState({
      activeCrop: false,
      nonce: this.state.nonce + 1
    });
  };

  save = e => {
    e.preventDefault();
    e.persist();

    const small = this.croppie.result({
      type: 'blob',
      size: { width: 64, height: 64 },
      quality: 0.5,
      format: 'png',
      circle: true
    });

    const large = this.croppie.result({
      type: 'blob',
      size: { width: 300, height: 300 },
      quality: 0.75,
      format: 'png',
      circle: true
    });

    Promise.all([small, large]).then(([smallBlob, largeBlob]) => {
      smallBlob.name = this.state.file.name;
      largeBlob.name = this.state.file.name;

      this.props.onChange(smallBlob, largeBlob);
      this.removeCroppie(e);
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
        },
        enableExif: true
      });
    }
    const reader = new FileReader();
    reader.onload = e => {
      this.croppie.bind({
        url: e.target.result,
        orientation: 1
      });
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
        <div className={styles.contentWrapper}>
          <div className={styles.croppieWrapper}>
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
          <div className={styles.buttonWrapper}>
            <span
              className={[
                styles.upload,
                buttonStyles.button,
                buttonStyles.default,
                disabledState ? buttonStyles.disabled : null
              ].join(' ')}
            >
              Upload New Photo
              <input
                key={nonce}
                type="file"
                accept="image/*"
                onChange={this.onInputChange}
                className={`upload ${inputStyle}`}
                ref={this.croppieInput}
                disabled={disabledState}
              />
            </span>
            {activeCrop || isLoading ? (
              <Button
                buttonType="button"
                type="action"
                className={styles.saveButton}
                loading={isLoading}
                onClick={this.save}
              >
                Crop
              </Button>
            ) : null}
            {src &&
              !activeCrop && (
                <Button
                  buttonType="button"
                  type="link-destructive"
                  onClick={this.onDelete}
                  disabled={disabledState}
                >
                  Delete
                </Button>
              )}
            {activeCrop && (
              <Button
                buttonType="button"
                type="link-destructive"
                onClick={this.removeCroppie}
                disabled={disabledState}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Cropper;
