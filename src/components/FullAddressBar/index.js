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
    <div className={`${styles.FullAddressBar}`}>
      <div className={`${styles.AddressBar}`}>
        <Text color="purple" style="BodySmall" id="ethAddress">
          {address}
        </Text>
      </div>
      {copyButton && (
        <div style={{ marginLeft: '5px' }}>
          <Button
            size="icon"
            style="secondary"
            onClick={e => copyToClipboard(address)}
          >
            <FontAwesomeIcon icon={faCut} />
          </Button>
        </div>
      )}
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
