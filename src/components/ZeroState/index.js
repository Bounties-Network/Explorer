import React from 'react';
import PropTypes from 'prop-types';
import styles from './ZeroState.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text, Button } from 'components';

const ZeroState = props => {
  const { type, icon, action, title, text, actionText, onActionClick } = props;

  let iconType = icon;
  let iconColor = 'lightGrey';
  let titleTextColor = 'black';
  let textColor = 'grey';

  if (type === 'error') {
    titleTextColor = 'red';
  }

  return (
    <div className={styles.zeroState}>
      <div className={styles.icon}>
        <Text type="H1" color={iconColor}>
          <FontAwesomeIcon icon={icon} className={styles.iconStyles} />
        </Text>
      </div>
      <div className={styles.title}>
        <Text type="H3" color={titleTextColor}>
          {title}
        </Text>
      </div>
      <div className={styles.text}>
        <Text color={textColor}>{text}</Text>
      </div>
      {action ? (
        <div className={styles.action}>
          <Button type="primary" fitWidth onClick={onActionClick}>
            {actionText}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

ZeroState.propTypes = {
  type: PropTypes.oneOf(['zero', 'error']),
  onActionClick: PropTypes.func,
  icon: PropTypes.array,
  title: PropTypes.string,
  text: PropTypes.string,
  actionText: PropTypes.string,
  action: PropTypes.bool
};

ZeroState.defaultProps = {
  icon: ['fal', 'meh'],
  onActionClick: () => {}
};

export default ZeroState;
