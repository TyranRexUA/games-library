import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './CardMedia.module.scss';
import { isMobile, resizeImageUrl } from '../../../../secondaryFunctions/secondaryFunctions';

const CardMedia = ({ screenshots, isHover, clip, imageSrc, ...props }) => {
    const [screenshotSrc, setScreenshotSrc] = useState(screenshots[1] && (isMobile() ? screenshots[screenshots.length - 1].image : screenshots[1].image));

    useEffect(() => {
        if (!isHover) {
            setScreenshotSrc(screenshots[1] && (isMobile() ? screenshots[screenshots.length - 1].image : screenshots[1].image))
        }
    }, [isHover, screenshots]);

    const changeScreenshotSrc = () => {
        const currentIndex = screenshots.findIndex(screenshot => screenshot.image === screenshotSrc);

        if (currentIndex === screenshots.length - 1) {
            setScreenshotSrc(screenshots[1].image)
        } else {
            setScreenshotSrc(screenshots[currentIndex + 1].image)
        }
    }

    return (
        <div className={styles.CardMedia}
            onClick={screenshots[1] && isMobile() ? changeScreenshotSrc : undefined}
        >
            {/* ЕСЛИ НА КАРТОЧКУ НАВЕДЕН КУРСОР МЫШИ И ЕСТЬ ВИДЕО ТО ПОКАЗ ВИДЕО */}
            {clip
                ? <>
                    {isHover &&
                        <video loop autoPlay playsInline muted>
                            <source src={clip.clip} type="video/mp4" />
                            <source src={clip.clips['320']} type="video/mp4" />
                            <source src={clip.clips['full']} type="video/mp4" />
                        </video>
                    }

                    {/* КАРТИНКА СО ЗНАЧКОМ ПРОИГРЫВАНИЯ */}
                    <div className={cn(styles.background, { [styles.hidden]: isHover })}
                        style={{ background: `url(${require(`./../../../../img/anotherIcons/play.svg`)}) 5% 95% / 10% no-repeat, url(${imageSrc}) 50% 0 / cover no-repeat` }} />
                </>

                : <>
                    {/* ЕСЛИ НА КАРТОЧКУ НАВЕДЕН КУРСОР МЫШИ И ЕСТь  БОЛЬШЕ 2 СКРИНШОТОВ, ТО ПОКАЗ СЛАЙДЕР*/}
                    {isHover && screenshots.length > 2 &&
                        <div className={styles.screenshotsCarousel}>

                        {screenshots.map((screenshot, index) =>
                            { return  index !== 0
                                && <div key={screenshot.id} className={cn(styles.screenshotsCarousel__item, { [styles.screenshotsCarousel__item_active]: screenshot.image === screenshotSrc } )}
                                    onMouseEnter={() => !isMobile() ? setScreenshotSrc(screenshot.image) : undefined}
                                >
                                    {/* ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ */}
                                    <img className={styles.preloadImgs} src={resizeImageUrl(screenshot.image)} alt=""/>
                                </div>
                            }
                        )}
                        <div className={styles.screenshotsCarousel__background} style={{ backgroundImage: `url(${resizeImageUrl(screenshotSrc)})`}} />
                        {/* <img src={resizeImageUrl(screenshotSrc)} alt=""/> */}
                        </div>
                    }

                    {/* КАРТИНКА БЕЗ ЗНАЧКА ПРОИГРОВАНИЯ */}
                    <div className={cn(styles.background, { [styles.hidden]: isHover && isHover && screenshots.length > 2 })} style={{ background: `url(${imageSrc}) 50% 0 / cover no-repeat` }} />
                </>
            }

        </div>
    )
};


export default React.memo(CardMedia);