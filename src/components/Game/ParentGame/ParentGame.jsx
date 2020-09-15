import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ParentGame.module.scss';

const ParentGame = ({ parentGame, ...props }) => (
    <div className={styles.ParentGame} {...props}>
        <div className={styles.header}>
            PARENT GAME
            </div>
        {parentGame.map(game => (
            <NavLink key={game.id} className={styles.ParentGame__item} to={`/game/${game.id}`}>
                {game.name}
            </NavLink>
        ))}
    </div>
);

export default ParentGame;