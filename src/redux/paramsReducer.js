const   SET_PARAMS = 'params/SET_PARAMS',
        SET_NEXT = 'params/SET_NEXT',
        SET_PLATFORMS_PARAMS = 'params/SET_PLATFORMS_PARAMS',
        SET_GENRES_PARAMS = 'params/SET_GENRES_PARAMS',
        SET_DATES_PARAMS = 'params/SET_DATES_PARAMS',
        SET_STORES_PARAMS = 'params/SET_STORES_PARAMS',
        SET_TAGS_PARAMS = 'params/SET_TAGS_PARAMS',
        SET_PUBLISHERS_PARAMS = 'params/SET_PUBLISHERS_PARAMS',
        SET_DEVELOPERS_PARAMS = 'params/SET_DEVELOPERS_PARAMS',
        SET_SEARCH_PARAMS = 'params/SET_SEARCH_PARAMS';

const initialState = {
    next: '',
    params: {
        // tags: 'singleplayer'
    // dates: '1960-01-01,1969-12-31',
    // search: "Game of Thrones",
    }
};

const paramsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PARAMS:
            return {next: '',
                params: {...action.payload}
            };
        case SET_NEXT:
            return {...state,
                next: action.next
            };
        case SET_PLATFORMS_PARAMS:
            return {...state,
                params:{...state.params, platforms: action.platforms}
            };
        case SET_GENRES_PARAMS:
            return {...state,
                params:{...state.params, genres: action.genres}
            };
        case SET_STORES_PARAMS:
                return {...state,
                    params:{...state.params, stores: action.stores}
                };
        case SET_DATES_PARAMS:
            return {...state,
                params:{...state.params, dates: action.dates}
            };
        case SET_TAGS_PARAMS:
            return {...state,
                params: { ...state.params, tags: action.tags }
            };
        case SET_PUBLISHERS_PARAMS:
            return {
                ...state,
                params: { ...state.params, publishers: action.publishers }
            };
        case SET_DEVELOPERS_PARAMS:
            return {
                ...state,
                params: { ...state.params, developers: action.developers }
            };
        case SET_SEARCH_PARAMS: {
            return {...state,
                params:{...state.params, search: action.search}
            };
        }
        default: return state;
    }
}

export default paramsReducer;
export const setParamsAC = (data) => ({type: SET_PARAMS, payload: data});
export const setNextAC = (next) => ({type: SET_NEXT, next});
export const setPlatformsParamsAC = (platforms) => ({type: SET_PLATFORMS_PARAMS, platforms});
export const setGenresParamsAC = (genres) => ({type: SET_GENRES_PARAMS, genres});
export const setDatesParamsAC = (dates) => ({type: SET_DATES_PARAMS, dates});
export const setStoresParamsAC = (stores) => ({type: SET_STORES_PARAMS, stores});
export const setSearchParamsAC = (search) => ({type: SET_SEARCH_PARAMS, search});
export const setTagsParamsAC = (tags) => ({ type: SET_TAGS_PARAMS, tags })
export const setPublishersParamsAC = (publishers) => ({ type: SET_PUBLISHERS_PARAMS, publishers })
export const setDevelopersParamsAC = (developers) => ({ type: SET_DEVELOPERS_PARAMS, developers })