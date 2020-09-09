import React from 'react';
import './App.scss';
import LibraryContainer from './components/Library/LibraryContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import FiltersContainer from './components/Filters/FiltersContainer';
import NotFound404 from './components/NotFound404/NotFound404';
import GameContainer from './components/Game/GameContainer';
//const GameContainer = React.lazy(() => import('./components/Game/GameContainer'));

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

                    // <Suspense fallback={
                    //     <div
                    //         style={{
                    //             background: `url(${require('./img/preloader/preloader.svg')}) 50% 50% / contain no-repeat`, width: '100%', height: '100%'
                    //         }}
                    //     />

                    // }>
                    //     <GameContainer />
                    // </Suspense>

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

    // return (
    //     <div className='appContainer'>
    //         <Switch>
    //             <Route path='/filter/:data' render={() => <FiltersContainer />} />
    //             <Route path='/404/' render={()=> <NotFound404 />} />
    //             <Route path='*' render={() => <FiltersContainer />} />
    //         </Switch>
    //         <div className='main'>
    //             <Switch>
    //                 <Route exact path='/' render={() => <LibraryContainer />} />
    //                 <Route path='/similar/:gameId' render={() => <LibraryContainer />} />
    //                 <Route path='/series/:gameIdSeries' render={() => <LibraryContainer />} />
    //                 <Route path='/filter/:data' render={() => <LibraryContainer />} />
    //                 <Route path='/game/:gameId' render={() => {
    //                     return (
    //                         <Suspense fallback={
    //                             <div
    //                                 style={{
    //                                     background: `url(${require('./img/preloader/preloader.svg')}) 50% 50% / contain no-repeat`, width: '100%', height: '100%'
    //                                 }}
    //                             />

    //                         }>
    //                             <GameContainer />
    //                         </Suspense>
    //                     )
    //                 }} />
    //                 <Route path='*' render={() => <Redirect to={'/404/'} />} />
    //             </Switch>
    //         </div >
    //     </div >
    // );
}

export default App;
