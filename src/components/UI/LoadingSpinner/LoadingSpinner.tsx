import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = (): JSX.Element => {
  return (
    <div className={styles['lds-roller']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
