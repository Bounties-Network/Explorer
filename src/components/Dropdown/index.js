import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-pro-light/faBell';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  hide = () => {
    this.setState({ show: false });
  };

  show = () => {
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;

    const contentClass = show
      ? `${styles.content} ${styles.show}`
      : styles.content;

    return (
      <div className={styles.container}>
        <div
          className={styles.trigger}
          tabIndex="0"
          onBlur={this.hide}
          onClick={this.show}
        >
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div className={contentClass}>
          <ul>
            <li>
              <div className={styles.test}>slkjsdf</div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {};

Dropdown.defaultProps = {};

export default Dropdown;
