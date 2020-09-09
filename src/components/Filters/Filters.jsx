import React from 'react';
import styles from './Filters.module.scss';
import FieldSet from './FieldSet/FieldSet';
import { NavLink } from 'react-router-dom';
import { fromObjToURL, clearObject } from '../../secondaryFunctions/secondaryFunctions';
import cn from 'classnames';
import SearchForm from './SearchForm/SearchForm';

const Filters = ({ isActive, ...props }) => (
    <>
        <div className={cn(styles.Filters, { [styles.active]: isActive })}>

            <div className={cn(styles.body, { [styles.hidden]: !isActive })}>
                <SearchForm searchLink={props.searchLink} setSearchParams={props.setSearchParams} searchValue={props.searchValue} />

                {/* PLATFORMS FILTER */}
                <FieldSet title='Platforms' filtersIsActive={isActive} items={props.platforms} changeParams={props.setPlatformsParams} activeItem={props.activePlatform} />

                {/* GENRES FILTER */}
                <FieldSet title='Genres' filtersIsActive={isActive} items={props.genres} changeParams={props.setGenresParams} activeItem={props.activeGenre} />

                {/* STORES FILTER */}
                <FieldSet title='Stores' filtersIsActive={isActive} items={props.stores} changeParams={props.setStoresParams} activeItem={props.activeStore} />

                {/* TAGS FILTER */}
                <FieldSet title='Tags' filtersIsActive={isActive} items={props.tags} changeParams={props.setTagsParams} activeItem={props.activeTag} next={props.nextTags} getMoreItems={props.getMoreTags} isLoading={props.tagsIsLoading} />

                {/* PUBLISHERS FILTER */}
                <FieldSet title='Publishers' filtersIsActive={isActive} items={props.publishers} changeParams={props.setPublishersParams} activeItem={props.activePublisher} next={props.nextPublishers} getMoreItems={props.getMorePublishers} isLoading={props.publishersIsLoading} />

                {/* DEVELOPERS FILTER */}
                <FieldSet title='Developers' filtersIsActive={isActive} items={props.developers} changeParams={props.setDevelopersParams} activeItem={props.activeDeveloper} next={props.nextDevelopers} getMoreItems={props.getMoreDevelopers} isLoading={props.developersIsLoading} />

                {/* TAGS FILTER */}
                <FieldSet title='Released Dates' filtersIsActive={isActive} groups={props.dates} changeParams={props.setDatesParams} activeItem={props.activeDate} />

                <div className={styles.buttonsGroup}>
                    <NavLink
                        className={styles.buttonsGroup__item}
                        to={Object.keys(clearObject(props.params)).length !== 0 ? `/filter/${fromObjToURL(props.params)}` : '/'}
                        onClick={() => props.toggleIsActive(false)}
                    >
                        Apply
                        </NavLink>
                    <div className={styles.buttonsGroup__item} onClick={() => props.setParams({})}>Clear Values</div>
                </div>

            </div>

        </div>

        <NavLink
            to='/'
            className={styles.homeBtn}
            onClick={() => {
                props.setParams({});
                props.toggleIsActive(false);
            }
            }
        />

        <div
            className={cn(styles.Filters__btn, { [styles.Filters__btn_active]: isActive })}
            onClick={() => props.toggleIsActive(!isActive)}
        >
            <img src={require('./../../img/anotherIcons/arrow-right.svg')} alt="" />
        </div>
    </>
)

export default Filters;
