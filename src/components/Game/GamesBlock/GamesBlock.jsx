import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GamesBlock.module.scss'
//import { cutTextLength } from '../../../secondaryFunctions/secondaryFunctions';

const GamesBlock = ({ games, title, ...props }) => (
    <div className={styles.GamesBlock}>

        <div className={styles.header}>
            <h2>{title}</h2>
            {/* <NavLink
                className={styles.header__showMoreBtn}
                to={props.type === 'similar' ? `/similar/${props.currentGameId}` : `/series/${props.currentGameId}`}
                style={{ background: `gray` }}
            >
                Full List
                </NavLink> */}
        </div>

        <div className={styles.body}>
            {games.map(game => (
                <NavLink
                    key={game.id}
                    className={styles.miniCard}
                    to={`/game/${game.id}`}
                >
                    <div
                        className={styles.miniCard__media}
                        style={{ background: game.background_image ? `url(${game.background_image}) center 0 / cover no-repeat` : `url(${require('./../../../img/anotherImg/noGameBg.jpg')}) center 0 / cover no-repeat` }}
                    />
                    <div className={styles.miniCard__name}>{game.name}</div>
                </NavLink>
            ))}
        </div>

    </div>
);


export default GamesBlock;