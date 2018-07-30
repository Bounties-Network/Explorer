import React from 'react';
import PropTypes from 'prop-types';
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
      activeCrop: false
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

  onInputChange = e => {
    this.setState({ activeCrop: true, src: null, file: e.target.files[0] });
  };

  onDelete = () => {
    if (this.croppie) {
      this.croppie.destroy();
      this.croppie = null;
    }

    this.props.onDelete();
    this.setState({ activeCrop: false, src: null });
  };

  save = () => {
    this.setState({ activeCrop: false });

    this.croppie
      .result({
        type: 'blob',
        size: 'viewport',
        quality: 0.75,
        circle: true
      })
      .then(blob => {
        this.props.onChange(blob);

        if (this.croppie) {
          this.croppie.destroy();
          this.croppie = null;
        }
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

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { loading, disabled, src } = this.props;
    const { activeCrop, src: srcState } = this.state;

    const currentSrc = src || srcState;
    const disabledState = loading || disabled;

    let inputStyle = styles.input;
    let croppieClass = styles.croppie;
    if (!activeCrop || loading) {
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

            {currentSrc && !activeCrop && !loading ? (
              <Circle
                type="img"
                size="large"
                input={currentSrc}
                color="lightGrey"
                border
                className={styles.circleContent}
              />
            ) : null}

            {!activeCrop && !currentSrc && !loading ? (
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

            {loading ? (
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
              {activeCrop || currentSrc ? 'Replace Photo' : 'Upload New Photo'}
              <input
                type="file"
                className="upload"
                accept="image/*"
                onChange={this.onInputChange}
                className={inputStyle}
                ref={this.croppieInput}
                disabled={disabledState}
              />
            </Button>

            {activeCrop || loading ? (
              <Button
                type="action"
                className={styles.saveButton}
                loading={loading}
                onClick={this.save}
              >
                Save
              </Button>
            ) : null}
            {activeCrop || currentSrc ? (
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
