import React from 'react';
import PropTypes from 'prop-types';
import styles from './FullAddressBar.module.scss';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCut from '@fortawesome/fontawesome-pro-light/faCut';

import { Text, Button } from 'components';

const FullAddressBarComponent = props => {
  const { address, copyButton } = props;

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Address copied: ', str);
    alert('Address copied: ' + str);
  };

  return (
    <div
      className={`${styles.AddressBar}`}
      onClick={e => copyToClipboard(address)}
    >
      <Text color="purple" typeScale="Body" id="ethAddress">
        {address}
      </Text>
      <span className={`${styles.tooltip}`}>Copy to clipboard</span>
    </div>
  );
};

FullAddressBarComponent.propTypes = {
  address: PropTypes.string
};

FullAddressBarComponent.defaultProps = {
  address: '0x0000000000000000000000000000000000000000',
  copyButton: true
};

export default FullAddressBarComponent;
