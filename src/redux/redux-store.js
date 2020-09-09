import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import libraryReducer from './libraryReducer';
import thunkMiddleWare from 'redux-thunk';
import paramsReducer from './paramsReducer';
// import { reducer as formReducer } from 'redux-form';
import filtersReducer from './filtersReducer';
import gameReducer from './gameReducer';

const reducers = combineReducers({
    library: libraryReducer,
    params: paramsReducer,
    filters: filtersReducer,
    game: gameReducer,
    //form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)))

//const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;