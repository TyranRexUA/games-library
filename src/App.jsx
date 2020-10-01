import React from 'react';
import './App.scss';
import LibraryContainer from './components/Library/LibraryContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import FiltersContainer from './components/Filters/FiltersContainer';
import NotFound404 from './components/NotFound404/NotFound404';
import GameContainer from './components/Game/GameContainer';

const mainBody = (
    <>
        <LibraryContainer />
        <FiltersContainer />
    </>
)

const App = (props) => {

    return (
        <div className='appContainer'>
            <Switch>
                <Route exact path='/' render={() => mainBody} />
                <Route path='/similar/:gameId' render={() => mainBody} />
                <Route path='/series/:gameIdSeries' render={() => mainBody} />
                <Route path='/filter/:data' render={() => mainBody} />
                <Route path='/game/:gameId' render={() =>

                    <>
                        <GameContainer />
                        <LibraryContainer />
                        <FiltersContainer />
                    </>

                } />
                <Route path='/404' render={() => <NotFound404 />} />
                <Route path='*' render={() => <Redirect to='/404' />} />
            </Switch>
        </div >
    );

}

export default App;
