import React, { useState } from 'react';
import cn from 'classnames';
// import preloader from './../../../img/preloader/preloader.svg';
import styles from './Card.module.scss';
import CardHiddenInfo from './CardHiddenInfo/CardHiddenInfo';
import CardMedia from './CardMedia/CardMedia';
import { NavLink } from 'react-router-dom';
import { cutTextLength } from '../../../secondaryFunctions/secondaryFunctions';
import { isMobile } from './../../../secondaryFunctions/secondaryFunctions';

const Card = ({ screenshots, parentPlatforms, metacritic, released, genres, tags, gameName, gameId, imageSrc, clip }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className={cn(styles.Card, { [styles.fullCardMobile]: isHover && isMobile(), [styles.fullCard]: isHover && !isMobile() })}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <CardMedia imageSrc={imageSrc} clip={clip} screenshots={screenshots} isHover={isHover} />

            <div className={styles.info}>

                {parentPlatforms
                    && <div className={styles.info__platforms}>
                        {parentPlatforms.map(parentPlatform =>
                            <img src={require(`./../../../img/parentPlatformsIcons/white/${parentPlatform.slug}.svg`)} key={parentPlatform.id} height='18px' alt='' />
                        )}
                    </div>
                }

                {metacritic &&
                    <div className={styles.info__metacritic}>
                        {metacritic}
                    </div>
                }

                <div className={styles.info__title}><NavLink to={`/game/${gameId}`}><h2>{cutTextLength(gameName, 60)}</h2></NavLink></div>

                {isHover &&
                    <CardHiddenInfo released={released} genres={genres} tags={tags} gameName={gameName} gameId={gameId} />}

            </div>
        </div>
    )
}
export default Card;