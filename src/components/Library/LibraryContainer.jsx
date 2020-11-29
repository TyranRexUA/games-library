import React from 'react';
import { connect } from 'react-redux';
import Library from './Library';
import { requestMoreGames, requestSimilarGames, requestGames, requestSeriesGames } from './../../redux/libraryReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from '../Preloader/Preloader';
import { fromURLtoObj } from '../../secondaryFunctions/secondaryFunctions';

class LibraryContainer extends React.PureComponent {
    refreshLibrary = () => {
        if (this.props.match.params.gameId) {
            this.props.requestSimilarGames(this.props.match.params.gameId).then(()=> {
                if (this.props.games.length < 20 && this.props.next) {
                    this.props.requestMoreGames(this.props.next)
                }
            })
        } else if (this.props.match.params.gameIdSeries) {
            this.props.requestSeriesGames(this.props.match.params.gameIdSeries).then(() => {
                if (this.props.games.length < 20 && this.props.next) {
                    this.props.requestMoreGames(this.props.next)
                }
            })
        } else {
            this.props.requestGames(fromURLtoObj(this.props.match.params.data));
        }
    }

    componentDidMount() {
        this.refreshLibrary();
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.showMoreGames);
    }

    componentDidUpdate(prevProps)  {
        const locationWasChanged = this.props.location !== prevProps.location;

        if (locationWasChanged) {
            window.scrollTo(0, 0);
            this.refreshLibrary();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.showMoreGames);
    }

    showMoreGames = () => {
        if (!this.props.isLoading && !this.props.isGlobalLoading) {
            if (window.pageYOffset > (document.documentElement.scrollHeight - document.documentElement.clientHeight - 150) && this.props.next) {
                this.props.requestMoreGames(this.props.next);
            }
        }
    }
    render() {
        return this.props.isGlobalLoading
            ? <Preloader style={{height: '100vh'}}/>
            : <Library games={this.props.games} libraryTitle={this.props.libraryTitle} showMoreGames={this.showMoreGames} isLoading={this.props.isLoading} lock={this.props.lock}/>
    }
};

const mapStateToProps = (state) => ({
    games: state.library.games,
    params: state.params.params,
    next: state.params.next,
    isLoading: state.library.isLoading,
    isGlobalLoading: state.library.isGlobalLoading,
    libraryTitle: state.library.libraryTitle,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { requestMoreGames, requestSimilarGames, requestGames, requestSeriesGames })
)(LibraryContainer)