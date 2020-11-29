import React from 'react';
import styles from './NotFound404.module.scss'
import { NavLink } from 'react-router-dom';

const NotFound404 = () => (
    <div className={styles.NotFound404}>
        <div className={styles.contentWrapper}>
            <div className={styles.title}>404</div>
            <div>whoops! <span>NOT FOUND</span></div>
            <NavLink className={styles.mainPageBtn} to='/' >
                MAIN PAGE
            </NavLink>
        </div>
    </div>
)

export default React.memo(NotFound404);