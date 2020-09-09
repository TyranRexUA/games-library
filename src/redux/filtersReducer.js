import rawgAPI from '../rawgAPI/rawgAPI';

const   TOGGLE_TAGS_IS_LOADING = 'filters/TOGGLE_TAGS_IS_LOADING',
        TOGGLE_PUBLISHERS_IS_LOADING = 'filters/TOGGLE_PUBLISHERS_IS_LOADING',
        TOGGLE_DEVELOPERS_IS_LOADING = 'filters/TOGGLE_DEVELOPERS_IS_LOADING',
        SET_PLATFORMS = 'filters/SET_PLATFORMS',
        SET_GENRES = 'filters/SET_GENRES',
        SET_STORES = 'filters/SET_STORES',
        SET_TAGS = 'filters/SET_TAGS',
        ADD_TAGS = 'filters/ADD_TAGS',

        SET_PUBLISHERS = 'filters/SET_PUBLISHERS',
        ADD_PUBLISHERS = 'filters/ADD_PUBLISHERS',

        SET_DEVELOPERS = 'filters/SET_DEVELOPERS',
        ADD_DEVELOPERS = 'filters/ADD_DEVELOPERS',

        SET_YEARS = 'filters/SET_YEARS';

const initialState = {
    platforms: {
        next: null,
        platformsArray: null
    },
    genres: {
        next: null,
        genresArray: null
    },
    stores: {
        next: null,
        storesArray: null
    },
    tags: {
        isLoading: false,
        next: null,
        tagsArray: null
    },
    publishers: {
        isLoading: false,
        next: null,
        publishersArray: null,
    },
    developers: {
        isLoading: false,
        next: null,
        developersArray: null,
    },
    years: null,
};

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_TAGS_IS_LOADING:
            return {...state,
                tags: {...state.tags,
                    isLoading: action.isLoading
                }
            };
        case TOGGLE_PUBLISHERS_IS_LOADING:
            return {
                ...state,
                publishers: {...state.publishers,
                    isLoading: action.isLoading
                }
            };
        case TOGGLE_DEVELOPERS_IS_LOADING:
            return {
                ...state,
                developers: {...state.developers,
                    isLoading: action.isLoading
                }
            };
        case SET_PLATFORMS:
            return {...state,
                platforms: {
                    next: action.payload.next,
                    platformsArray: [...action.payload.results]
                }
            };
        case SET_GENRES:
            return {...state,
                genres: {
                    next: action.payload.next,
                    genresArray: [...action.payload.results]
                }
            };
        case SET_STORES:
            return {...state,
                stores: {
                    next: action.payload.next,
                    storesArray: [...action.payload.results]
                }
            };
        case SET_TAGS:
            return {...state,
                tags: {
                    next: action.payload.next,
                    tagsArray: [...action.payload.results]
                }
            };
        case ADD_TAGS:
            return {
                ...state,
                tags: {
                    next: action.payload.next,
                    tagsArray: [...state.tags.tagsArray, ...action.payload.results]
                }
            };
        case SET_PUBLISHERS:
            return {
                ...state,
                publishers: {
                    next: action.payload.next,
                    publishersArray: [...action.payload.results]
                }
            };
        case ADD_PUBLISHERS:
            return {
                ...state,
                publishers: {
                    next: action.payload.next,
                    publishersArray: [...state.publishers.publishersArray, ...action.payload.results]
                }
            };
        case SET_DEVELOPERS:
            return {
                ...state,
                developers: {
                    next: action.payload.next,
                    developersArray: [...action.payload.results]
                }
            };
        case ADD_DEVELOPERS:
            return {
                ...state,
                developers: {
                    next: action.payload.next,
                    developersArray: [...state.developers.developersArray, ...action.payload.results]
                }
            };
        case SET_YEARS:
            return {...state,
                years: [...action.payload]
            };
        default: return state;
    }
}

export default filtersReducer;

const toggleTagsIsLoading = (isLoading) => ({ type: TOGGLE_TAGS_IS_LOADING, isLoading });
const togglePublishersIsLoading = (isLoading) => ({ type: TOGGLE_PUBLISHERS_IS_LOADING, isLoading });
const toggleDevelopersIsLoading = (isLoading) => ({ type: TOGGLE_DEVELOPERS_IS_LOADING, isLoading });

const setPlatformsAC = (data) => ({type: SET_PLATFORMS, payload: data});
const setGenresAC = (data) => ({type: SET_GENRES, payload: data});
const setStoresAC = (data) => ({type: SET_STORES, payload: data});
const setYearsAC = (data) => ({type: SET_YEARS, payload: data});

const setTagsAC = (data) => ({type: SET_TAGS, payload: data });
const addTagsAC = (data) => ({type: ADD_TAGS, payload: data});

const setPublishersAC = (data) => ({ type: SET_PUBLISHERS, payload: data });
const addPublishersAC = (data) => ({ type: ADD_PUBLISHERS, payload: data });

const setDevelopersAC = (data) => ({ type: SET_DEVELOPERS, payload: data });
const addDevelopersAC = (data) => ({ type: ADD_DEVELOPERS, payload: data });

export const requestPlatforms = () => {
    return async (dispatch) => {
        let response = await rawgAPI.getPlatforms()
            dispatch(setPlatformsAC(response));
    }
};

export const requestGenres = () => {
    return async (dispatch) => {
        let response = await rawgAPI.getGenres()
            dispatch(setGenresAC(response));
    }
};

export const requestStores = () => {
    return async (dispatch) => {
        let response = await rawgAPI.getStores();
            dispatch(setStoresAC(response));
    }
};


export const requestTags = () => {
    return async (dispatch) => {
        let response = await rawgAPI.getTags();
        dispatch(setTagsAC(response));
    }
};

export const requestMoreTags = (next) => {
    return async (dispatch) => {
        dispatch(toggleTagsIsLoading(true));
        let response = await rawgAPI.getMore(next);
        dispatch(addTagsAC(response));
        dispatch(toggleTagsIsLoading(false));
    }
};


export const requestPublishers = () => {
    return async (dispatch) => {
        let response = await rawgAPI.getPublishers();
        dispatch(setPublishersAC(response));
    }
};

export const requestMorePublishers = (next) => {
    return async (dispatch) => {
        dispatch(togglePublishersIsLoading(true));
        let response = await rawgAPI.getMore(next);
        dispatch(addPublishersAC(response));
        dispatch(togglePublishersIsLoading(false));
    }
};

export const requestDevelopers = () => {
    return async (dispatch) => {
        let response = await rawgAPI.getDevelopers();
        dispatch(setDevelopersAC(response));
    }
};

export const requestMoreDevelopers = (next) => {
    return async (dispatch) => {
        dispatch(toggleDevelopersIsLoading(true));
        let response = await rawgAPI.getMore(next);
        dispatch(addDevelopersAC(response));
        dispatch(toggleDevelopersIsLoading(false));
    }
};


export const requestYears = () => {
    return async (dispatch) => {
        let response = await rawgAPI.getYears();
            dispatch(setYearsAC(response));
    }
};