import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GameDLCs.module.scss'

const GameDLCs = ({ DLCs, ...props }) => (
    <div className={styles.GameDLCsBlock} {...props}>
        <div className={styles.header}>
            DLCs AND EDITIONS
            </div>
        {DLCs.map(DLC => (
            <NavLink key={DLC.id} className={styles.GameDLCsBlock__item} to={`/game/${DLC.id}`}>
                {DLC.name}
            </NavLink>
        ))}
    </div>
);


export default GameDLCs;