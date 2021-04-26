import React from 'react';
import styles from './CardHiddenInfo.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { fromObjToURL } from '../../../../secondaryFunctions/secondaryFunctions';

const CardHiddenInfo = ({ released, genres, gameId, ...props }) => (
    <div className={styles.CardHiddenInfo}>

        <div className={cn(styles.released, styles.infoField)}>
            <span className={styles.infoField__title}>Release Date: </span>
            <div className={styles.infoField__general}>{released}</div>
        </div>

        {genres &&
            <div className={cn(styles.genres, styles.infoField)}>
                <span className={styles.infoField__title}>Genres: </span>
                <div className={styles.infoField__general}>
                    {genres.map((genre, index, arr) => index !== arr.length - 1
                        ? <span key={genre.id}><NavLink to={`/filter/${fromObjToURL({ genres: genre.id.toString() })}`} className={styles.navLink}>{genre.name}</NavLink>, </span>
                        : <span key={genre.id}><NavLink to={`/filter/${fromObjToURL({ genres: genre.id.toString() })}`} className={styles.navLink}>{genre.name}</NavLink></span>)}
                </div>
            </div>
        }

        {/* <NavLink className={styles.showMoreButton} to={`/similar/${gameId}`} >Show more like this</NavLink> */}

        {/* {props.tags &&
                <div>Tags: {props.tags.map((tag, index) => index === 0 ? `${tag} ` : `/ ${tag} `)}</div>
            } */}
    </div>
);


export default React.memo(CardHiddenInfo);