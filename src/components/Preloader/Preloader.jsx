import React from 'react';
import styles from './Preloader.module.scss';

const Preloader = (props) => (
    <div className={styles.preloader} {...props}></div>
)


export default React.memo(Preloader);