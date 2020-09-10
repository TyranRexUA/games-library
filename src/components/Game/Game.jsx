import React from 'react';
import styles from './Game.module.scss';
import GameMedia from './GameMedia/GameMedia';
import GameInfoField from './GameInfoField/GameInfoField';
import GamesBlock from './GamesBlock/GamesBlock';
import GameDLCs from './GameDLCs/GameDLCs';
import GameStores from './GameStores/GameStores';
import ParentGame from './ParentGame/ParentGame';

const Game = ({ name, description, released, metacritic, screenshots, trailers, platforms, genres, stores, tags, similarGames, series, publishers, developers, DLCs, gameWebsite, parentGameForDLC, ...props}) => {

    const isMedia = (screenshots.length > 0 || trailers.length > 0)

    return (
        <div
            className={styles.Game}
            style={{
                background: `linear-gradient(180deg, rgba(21,21,21,0.5) 0%, rgba(21,21,21,1) calc((100vw - 30px) * 0.4)), url(${props.imageSrc ? props.imageSrc  : require('./../../img/anotherImg/noGameBg.jpg')}) 50% 0 / 100% calc((100vw - 30px) * 0.5625) no-repeat`,
            }}
        >
            <div className={styles.content__wrapper}>
                <h1>{name}</h1>

                <div className={styles.row1}>

                    {isMedia &&
                        <GameMedia screenshots={screenshots} trailers={trailers} />
                    }

                    <div className={styles.infoBlock} style={!isMedia ? { width: '100%' } : {}}>

                        <div className={styles.infoBlock__row}>
                            <span className={styles.row__name}>METACRITIC </span>
                            <span className={styles.row__value}>{metacritic}</span>
                        </div>

                        <div className={styles.infoBlock__row}>
                            <span className={styles.row__name}>RELEASED DATE </span>
                            <span className={styles.row__value}>{released}</span>
                        </div>

                        {gameWebsite
                            && <div className={styles.infoBlock__row}>
                                <span className={styles.row__name}>WEBSITE </span>
                            <a href={gameWebsite} className={styles.row__value} rel='noopener noreferrer' target='_blank'>{gameWebsite}</a>
                            </div>
                        }

                        {publishers && publishers.length > 0 && <GameInfoField items={publishers} paramName={'publishers'} />}
                        {developers && developers.length > 0 && <GameInfoField items={developers} paramName={'developers'} />}
                        {genres && genres.length > 0 && <GameInfoField items={genres} paramName={'genres'} />}
                        {platforms && platforms.length > 0 && <GameInfoField items={platforms} paramName={'platforms'} />}
                        {tags && tags.length > 0 && <GameInfoField items={tags} paramName={'tags'} />}
                    </div>
                </div>

                <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />

                <div className={styles.row2}>
                    {parentGameForDLC.length > 0 && <ParentGame parentGameForDLC={parentGameForDLC} />}
                    {DLCs.length > 0 && <GameDLCs DLCs={DLCs} />}
                    {stores && stores.length > 0 && <GameStores stores={stores} style={DLCs.length > 0 || parentGameForDLC.length > 0 ? {} : {width: '100%'} } />}

                </div>

                {series.length > 0
                    && <GamesBlock games={series} currentGameId={props.currentGameId} title={'Games in Series'} type={'series'} />
                }

            </div>

        </div>
    )
}

export default Game;