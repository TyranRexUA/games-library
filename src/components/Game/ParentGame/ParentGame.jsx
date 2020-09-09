import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ParentGame.module.scss';

const ParentGameForDLC = ({ parentGameForDLC, ...props }) => (
    <div className={styles.ParentGameForDLC} {...props}>
        <div className={styles.header}>
            PARENT GAME
            </div>
        {parentGameForDLC.map(game => (
            <NavLink key={game.id} className={styles.ParentGameForDLC__item} to={`/game/${game.id}`}>
                {game.name}
            </NavLink>
        ))}
    </div>
);

export default ParentGameForDLC;