import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <>
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная веб-страница сейчас недоступна или ее несуществует
      </p>
    </>
  );
};
