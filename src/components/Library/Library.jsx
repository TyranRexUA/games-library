import React from 'react';
import styles from './Library.module.scss'
import Card from './Card/Card';
import Preloader from '../Preloader/Preloader';
import { dateToString } from '../../secondaryFunctions/secondaryFunctions';

const Library = ({ libraryTitle, games, isLoading }) => (
    <div className={styles.library}>
            <div className={styles.title}>
                <a href="https://rawg.io/apidocs">RAWG API OFFICIAL WEBSITE</a>
            {libraryTitle && <h1>{libraryTitle}</h1>}
            </div>

        <div className={styles.body}>

            {games.map(
                (game) => <Card
                    key={game.id}

                    gameId={game.id}

                    gameName={game.name}

                    imageSrc={game.background_image
                        ? game.background_image.replace('/media/', '/media/resize/640/-/')
                        : require('./../../img/anotherImg/noGameBg.jpg')
                    }

                    clip={game.clip}

                    parentPlatforms={game.parent_platforms &&
                        game.parent_platforms.map(parentPlatform => parentPlatform.platform)
                    }

                    screenshots={game.short_screenshots}

                    metacritic={game.metacritic}

                    released={dateToString(game.released)}

                    genres={game.genres[0] &&
                        game.genres
                    }

                />)
            }
        </div>

        {isLoading && <Preloader style={{ height: '150px', position: 'absolute' }} />}
    </div>
);

export default React.memo(Library);