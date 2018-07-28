import React from 'react';
import PropTypes from 'prop-types';
import styles from './FullAddressBar.module.scss';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCut from '@fortawesome/fontawesome-pro-light/faCut';

import { Text, Button } from 'components';

const DEFAULT_TEXT = 'Copy to clipboard';
const COPIED_TEXT = 'Copied';

class FullAddressBarComponent extends React.Component {
  state = {
    tooltipText: DEFAULT_TEXT
  };

  resetText = () => this.setState({ tooltipText: DEFAULT_TEXT });

  copyToClipboard = str => {
    this.setState({ tooltipText: COPIED_TEXT });
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  render() {
    const { address, copyButton } = this.props;

    return (
      <div
        className={`${styles.AddressBar}`}
        onClick={e => this.copyToClipboard(address)}
        onMouseLeave={this.resetText}
      >
        <Text color="purple" typeScale="Body" id="ethAddress">
          {address}
        </Text>
        <span className={`${styles.tooltip}`}>{this.state.tooltipText}</span>
      </div>
    );
  }
}

FullAddressBarComponent.propTypes = {
  address: PropTypes.string
};

FullAddressBarComponent.defaultProps = {
  address: '0x0000000000000000000000000000000000000000',
  copyButton: true
};

export default FullAddressBarComponent;
