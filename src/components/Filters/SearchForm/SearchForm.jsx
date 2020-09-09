import React from 'react';
import styles from './SearchForm.module.scss';

const SearchForm = ({ searchLink, setSearchParams, searchValue }) => (
    <form onSubmit={ searchLink } className={styles.searchForm}>
        <input
            className={styles.search} type="text"
            onChange={ setSearchParams }
            value={ searchValue ? searchValue : '' }
            placeholder='Search' />
        <button type="submit" />
    </form>
);

export default SearchForm;