import React, { useState } from 'react';
import styles from './GameMedia.module.scss'

const GameMedia = (props) => {
    const [mediaSrc, setMediaSrc] = useState([]);
    const [mediaType, setMediaType] = useState(null);

    return (
        <div className={styles.GameMedia}>

            <div className={styles.showcase}>

                {
                    (mediaType === 'mp4' &&
                        <video autoPlay controls src={mediaSrc[0]}>
                            <source src={mediaSrc[1]} type="video/mp4" />
                        </video>
                    )

                    || (mediaType === 'jpg' &&
                        <img src={mediaSrc[0]} alt='' />
                    )

                    || (mediaType === null && props.trailers[0] &&
                        <video autoPlay muted controls src={props.trailers[0].data.max}>
                            <source src={props.trailers[0].data['480']} type="video/mp4" />
                        </video>
                    )

                    || (mediaType === null && props.screenshots[0] &&
                        <img src={props.screenshots[0].image} alt='' />
                    )
                }
            </div>

            <div className={styles.body}>

                {props.trailers.map(trailer =>
                    <div
                        className={styles.body__item}
                        key={trailer.preview}
                        style={{ background: `url(${require(`./../../../img/anotherIcons/play.svg`)}) 50% 50% / 30% no-repeat, url(${trailer.preview}) center / cover no-repeat` }}
                        onClick={
                            () => {
                                setMediaSrc([trailer.data.max, trailer.data['480']]);
                                setMediaType('mp4');
                            }
                        }
                    />
                )}
                {props.screenshots.map(screen =>
                    <div
                        className={styles.body__item}
                        key={screen.image}
                        style={{ background: `url(${screen.image}) center / cover no-repeat` }}
                        onClick={
                            () => {
                                setMediaSrc([screen.image]);
                                setMediaType('jpg')
                            }
                        }
                    />
                )}

            </div>

        </div>
    )
}

export default React.memo(GameMedia);