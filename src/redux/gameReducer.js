import rawgAPI from '../rawgAPI/rawgAPI';

const   SET_GAME_DLCs = 'gamePage/SET_GAME_DLCs',
        SET_GAME_DETAILS = 'gamePage/SET_GAME_DETAILS',
        SET_SERIES_GAMES = 'gamePage/SET_SERIES_GAMES',
        SET_GAME_SCREENSHOTS = 'gamePage/SET_GAME_SCREENSHOTS',
        SET_GAME_STORES = 'gamePage/SET_GAME_STORES',
        SET_GAME_TRAILERS = 'gamePage/SET_GAME_TRAILERS',
        TOGGLE_IS_LOADING = 'gamePage/TOGGLE_IS_LOADING',
        SET_SIMILAR_GAMES = 'gamePage/SET_SIMILAR_GAMES';

const initialState = {
    isLoading: false,
    details: null,
    DLCs: [],
    series: [],
    screenshots: [],
    stores: [],
    trailers: [],
    similarGames: [],
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_GAME_DETAILS:
            return {
                ...state,
                details: action.payload,
            };
        case SET_GAME_SCREENSHOTS:
            return {
                ...state,
                screenshots: [...action.payload]
            };
        case SET_GAME_TRAILERS:
            return {
                ...state,
                trailers: [...action.payload]
            };
        case SET_GAME_STORES:
            return {
                ...state,
                stores: [...action.payload]
            };
        case SET_GAME_DLCs:
            return {
                ...state,
                DLCs: [...action.payload]
            };
        case SET_SERIES_GAMES:
            return {
                ...state,
                series: [...action.payload.results]
            };
        case SET_SIMILAR_GAMES:
            return {
                ...state,
                similarGames: action.payload.results
            }
        default: return state;
    }
}

export default gameReducer;
const toggleIsLoadingAC = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading });
const setGameDetails = (payload) => ({ type: SET_GAME_DETAILS, payload });
const setGameScreenshots = (payload) => ({ type: SET_GAME_SCREENSHOTS, payload });
const setGameTrailers = (payload) => ({ type: SET_GAME_TRAILERS, payload });
const setGameStores = (payload) => ({ type: SET_GAME_STORES, payload });
const setGameDLCs = (payload) => ({ type: SET_GAME_DLCs, payload });
const setGameSeries = (payload) => ({ type: SET_SERIES_GAMES, payload });
const setSimilarGames = (payload) => ({ type: SET_SIMILAR_GAMES, payload})

export const requestGameInfo = (gameId) => {
    return async (dispatch) => {
        dispatch(toggleIsLoadingAC(true));
        Promise.all([
            rawgAPI.getGameDetails(gameId).then(response => dispatch(setGameDetails(response))),
            rawgAPI.getGameScreenshots(gameId).then(response => dispatch(setGameScreenshots(response))),
            rawgAPI.getGameTrailers(gameId).then(response => dispatch(setGameTrailers(response))),
            rawgAPI.getGameStores(gameId).then(response => dispatch(setGameStores(response))),
            rawgAPI.getGameDLCs(gameId).then(response => dispatch(setGameDLCs(response))),
            rawgAPI.getSeriesGames(gameId).then(response => dispatch(setGameSeries(response))),
            rawgAPI.getSimilarGames(gameId).then(response => dispatch(setSimilarGames(response))),
        ]).then(() => dispatch(toggleIsLoadingAC(false)))
    }
};