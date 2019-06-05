import React from 'react';
import PropTypes from 'prop-types';
import styles from './ZeroState.module.scss';
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
    action,
    title,
    text,
    actionText,
    onActionClick,
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
