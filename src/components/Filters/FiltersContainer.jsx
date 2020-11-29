import React from 'react';
import { connect } from 'react-redux';
import { requestPlatforms, requestGenres, requestStores, requestYears, requestTags, requestPublishers, requestDevelopers, requestMoreDevelopers, requestMoreTags, requestMorePublishers } from '../../redux/filtersReducer';
import { setParamsAC, setPlatformsParamsAC, setGenresParamsAC, setDatesParamsAC, setSearchParamsAC, setStoresParamsAC, setTagsParamsAC, setPublishersParamsAC, setDevelopersParamsAC } from '../../redux/paramsReducer';
import Filters from './Filters';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { fromURLtoObj, fromObjToURL, isMobile } from '../../secondaryFunctions/secondaryFunctions';

class FiltersContainer extends React.PureComponent {
    state = {
        isActive: false
    }
    componentDidMount() {
        this.props.requestPlatforms();
        this.props.requestGenres();
        this.props.requestStores();
        this.props.requestYears();
        this.props.requestTags();
        this.props.requestPublishers();
        this.props.requestDevelopers();

        if (this.props.match.params.data) {
            this.props.setParamsAC(fromURLtoObj(this.props.match.params.data))
        }

        window.addEventListener('unhandledrejection', this.to404Page)
    };

    componentDidUpdate(prevProps, prevState) {
        const locationWasChanged = this.props.location !== prevProps.location;

        if (locationWasChanged && this.props.match.params.data) {
            this.props.setParamsAC(fromURLtoObj(this.props.match.params.data))
        }
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.to404Page)
    }

    to404Page = (e) => {
        if (e.reason.response.status === 404) this.props.history.push('/404');
    }

    setSearchParams = (event) => {
        this.props.setSearchParamsAC(event.target.value)
    }

    searchLink = (e) => {
        e.preventDefault();
        if (this.props.searchValue) {
            this.toggleIsActive(false);
            this.props.history.push(`/filter/${fromObjToURL({ search: this.props.searchValue })}`);
        }
    }

    toggleIsActive = (isActive) => {
        if (isActive) {
            if (isMobile()) {
                document.body.classList.add('lockMobile')
            } else {
                document.body.classList.add('lock')
            }
        } else {
            if (isMobile()) {
                document.body.classList.remove('lockMobile')
            } else {
                document.body.classList.remove('lock');
            }
        }
        this.setState({ isActive })
    }

    render() {
        return <Filters
            isActive={this.state.isActive}
            toggleIsActive={this.toggleIsActive}
            searchLink={this.searchLink}

            searchValue={this.props.searchValue}
            setSearchParams={this.setSearchParams}

            platforms={this.props.platforms}
            activePlatform={this.props.activePlatform}
            setPlatformsParams={this.props.setPlatformsParamsAC}


            genres={this.props.genres}
            activeGenre={this.props.activeGenre}
            setGenresParams={this.props.setGenresParamsAC}


            stores={this.props.stores}
            activeStore={this.props.activeStore}
            setStoresParams={this.props.setStoresParamsAC}


            dates={this.props.dates}
            activeDate={this.props.activeDate}
            setDatesParams={this.props.setDatesParamsAC}


            params={this.props.allParams}
            setParams={this.props.setParamsAC}

            tags={this.props.tags}
            activeTag={this.props.activeTag}
            setTagsParams={this.props.setTagsParamsAC}
            nextTags={this.props.nextTags}
            getMoreTags={this.props.requestMoreTags}
            tagsIsLoading={this.props.tagsIsLoading}


            publishers={this.props.publishers}
            activePublisher={this.props.activePublisher}
            setPublishersParams={this.props.setPublishersParamsAC}
            nextPublishers={this.props.nextPublishers}
            getMorePublishers={this.props.requestMorePublishers}
            publishersIsLoading={this.props.publishersIsLoading}

            developers={this.props.developers}
            activeDeveloper={this.props.activeDeveloper}
            setDevelopersParams={this.props.setDevelopersParamsAC}
            nextDevelopers={this.props.nextDevelopers}
            getMoreDevelopers={this.props.requestMoreDevelopers}
            developersIsLoading={this.props.developersIsLoading}

            onSubmit={this.onSubmit} />
    }
}

const mapStateToProps = (state) => ({
    searchValue: state.params.params.search,
    allParams: state.params.params,

    platforms: state.filters.platforms.platformsArray,
    activePlatform: state.params.params.platforms,


    genres: state.filters.genres.genresArray,
    activeGenre: state.params.params.genres,

    stores: state.filters.stores.storesArray,
    activeStore: state.params.params.stores,

    dates: state.filters.years,
    activeDate: state.params.params.dates,

    tags: state.filters.tags.tagsArray,
    activeTag: state.params.params.tags,
    nextTags: state.filters.tags.next,
    tagsIsLoading: state.filters.tags.isLoading,

    publishers: state.filters.publishers.publishersArray,
    activePublisher: state.params.params.publishers,
    nextPublishers: state.filters.publishers.next,
    publishersIsLoading: state.filters.publishers.isLoading,

    developers: state.filters.developers.developersArray,
    activeDeveloper: state.params.params.developers,
    nextDevelopers: state.filters.developers.next,
    developersIsLoading: state.filters.developers.isLoading,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
        setParamsAC,
        setSearchParamsAC,
        requestPlatforms, setPlatformsParamsAC,
        requestGenres, setGenresParamsAC,
        requestStores, setStoresParamsAC,
        requestTags, requestMoreTags, setTagsParamsAC,
        requestPublishers, requestMorePublishers, setPublishersParamsAC,
        requestDevelopers, requestMoreDevelopers, setDevelopersParamsAC,
        requestYears, setDatesParamsAC
    })
)(FiltersContainer)
