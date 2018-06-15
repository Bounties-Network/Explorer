import React from 'react';
import styles from './Loading.module.scss';

const Loading = props => {
  const { className } = props;

  return (
    <div className={`${styles.spinner} ${className}`}>
      <div className={`${styles.bounce1}`} />
      <div className={`${styles.bounce2}`} />
      <div className={`${styles.bounce3}`} />
    </div>
  );
};

export default Loading;
