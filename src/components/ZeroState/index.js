import React from 'react';
import PropTypes from 'prop-types';
import styles from './ZeroState.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text, Button, SVGIllustration } from 'components';

const BodyText = props => {
  return (
    <Text color="defaultGrey" inline className={styles.text}>
      {props.children}
    </Text>
  );
};

const ZeroState = props => {
  const {
    type,
    icon,
    faIcon,
    action,
    title,
    text,
    actionText,
    onActionClick,
    iconColor,
    className
  } = props;

  let titleTextColor = 'black';

  if (type === 'error') {
    titleTextColor = 'red';
  }

  return (
    <div className={`${styles.zeroState} ${className}`}>
      {icon ? (
        <div className={styles.icon}>
          <SVGIllustration icon={icon} />
        </div>
      ) : null}

      {faIcon ? (
        <div className={styles.icon}>
          <Text typeScale="h2" color={iconColor}>
            <FontAwesomeIcon icon={faIcon} className={styles.iconStyles} />
          </Text>
        </div>
      ) : null}

      <div className={styles.title}>
        <Text typeScale="h4" weight="fontWeight-medium" color={titleTextColor}>
          {title}
        </Text>
      </div>
      <div>
        {typeof text === 'string' ? (
          <BodyText>{text}</BodyText>
        ) : (
          props.children
        )}
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
  className: PropTypes.string,
  onActionClick: PropTypes.func,
  icon: PropTypes.string,
  faIcon: PropTypes.array,
  iconColor: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  actionText: PropTypes.string,
  action: PropTypes.bool
};

ZeroState.defaultProps = {
  onActionClick: () => {}
};

ZeroState.BodyText = BodyText;

export default ZeroState;
