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
    if (this.state.activeCrop && prevState.file !== this.state.file) {
      this.readFile();
    }
  }

  onDelete = () => {
    if (this.croppie) {
      this.croppie.destroy();
      this.croppie = null;
    }

    this.setState({ activeCrop: false, src: null });
  };

  save = () => {
    this.setState({ loading: true });
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
    const { loading, disabled } = this.props;
    const { activeCrop, loading: loadingState, src } = this.state;
    const isLoading = loading || loadingState;

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
            {src ? (
              <Circle
                type="img"
                size="medium"
                input={src}
                color="lightGrey"
                border
                className={styles.circleContent}
              />
            ) : null}
            {!activeCrop && !src ? (
              <Circle
                type="text"
                size="medium"
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
                size="medium"
                color="lightGrey"
                border
                className={styles.circleContent}
              />
            ) : null}
          </div>
          <div className="col-xs-9">
            {src ? null : (
              <Button
                type="secondary"
                className={styles.upload}
                disabled={disabledState}
              >
                {activeCrop || src ? 'Replace Photo' : 'Upload New Photo'}
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
            )}
            {activeCrop ? (
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
                type="delete"
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
