import rawgAPI from '../rawgAPI/rawgAPI';
import {setNextAC} from './paramsReducer';

const   SET_GAMES = 'library/SET_GAMES',
        TOGGLE_IS_LOADING = 'library/TOGGLE_IS_LOADING',
        TOGGLE_IS_GLOBAL_LOADING = 'library/TOGGLE_IS_GLOBAL_LOADING',
        ADD_GAMES = 'library/ADD_GAMES',
        SET_LIBRARY_TITLE = 'library/SET_LIBRARY_TITLE';

const initialState = {
    libraryTitle: '',
    isGlobalLoading: true,
    isLoading: false,
    games: [],
    //next: '',
    count: 0,
};

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAMES:
            return {...state,
                games: [...action.payload.results],
                count: action.payload.count };
        case ADD_GAMES:
            return {...state,
                games: [...state.games, ...action.payload.results],
            };
        case TOGGLE_IS_LOADING:
            return {...state,
                isLoading: action.isLoading
            };
        case TOGGLE_IS_GLOBAL_LOADING:
            return {...state,
                isGlobalLoading: action.isLoading
            };
        case SET_LIBRARY_TITLE:
            if (state.games.length === 0) {
                return {...state,
                    libraryTitle: 'Games Not Found'
                }
            } else {
                return {...state,
                    libraryTitle: action.title
                };
            }
        default: return state;
    }
}

export default gamesReducer;
const setGamesAC = (data) => ({type: SET_GAMES, payload: data});
const addGamesAC = (data) => ({type: ADD_GAMES, payload: data});
const toggleIsLoadingAC = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading});
const toggleIsGlobalLoadingAC = (isLoading) => ({type: TOGGLE_IS_GLOBAL_LOADING, isLoading});
const setLibraryTitleAC = (title) => ({type: SET_LIBRARY_TITLE, title})

// export const requestAllGames = () => {
//     return (dispatch) => {
//         dispatch(toggleIsGlobalLoadingAC());
//         rawgAPI.getGames().then(response => {
//             dispatch(setGamesAC(response));
//             dispatch(setNextAC(response.next));
//             dispatch(setLibraryTitleAC(response.seo_title));
//             dispatch(toggleIsGlobalLoadingAC());
//         })
//     }
// };

export const requestGames = (params) => {
    return async (dispatch) => {
        dispatch(toggleIsGlobalLoadingAC(true));
        let response =  await rawgAPI.getGames(params);
            dispatch(setGamesAC(response));
            dispatch(setNextAC(response.next));
            dispatch(setLibraryTitleAC(response.seo_title));
            dispatch(toggleIsGlobalLoadingAC(false));
    }
};

export const requestMoreGames = (next) => {
    return async (dispatch) => {
        dispatch(toggleIsLoadingAC(true));
        let response =  await rawgAPI.getMore(next);
            dispatch(addGamesAC(response));
            dispatch(setNextAC(response.next));
            dispatch(toggleIsLoadingAC(false));
    }
};

export const requestSimilarGames = (gameId) => {
    return async (dispatch) => {
        dispatch(toggleIsGlobalLoadingAC(true));
        let response =  await rawgAPI.getSimilarGames(gameId);
            dispatch(setGamesAC(response));
            dispatch(setLibraryTitleAC('Games like ' + response.seo_text.match(/(?<=\bgames like).+(?=\?\sLook|,\swe've)/)[0]) || response.seo_text);
            dispatch(setNextAC(response.next));
            dispatch(toggleIsGlobalLoadingAC(false));
    }
};

export const requestSeriesGames = (gameIdSeries) => {
    return async (dispatch) => {
        dispatch(toggleIsGlobalLoadingAC(true));
        let response = await rawgAPI.getSeriesGames(gameIdSeries);
        dispatch(setGamesAC(response));
        //dispatch(setLibraryTitleAC('Games like ' + response.seo_text.match(/(?<=\bgames like).+(?=\?\sLook|,\swe've)/)[0]) || response.seo_text);
        dispatch(setNextAC(response.next));
        dispatch(toggleIsGlobalLoadingAC(false));
    }
};