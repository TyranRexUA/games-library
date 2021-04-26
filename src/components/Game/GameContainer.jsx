import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { requestGameInfo } from '../../redux/gameReducer';
import Preloader from '../Preloader/Preloader';
import CardPage from './Game';
import { dateToString } from '../../secondaryFunctions/secondaryFunctions';

class GameContainer extends React.PureComponent {
    componentDidMount() {
        this.props.requestGameInfo(this.props.match.params.gameId)
    }

    componentDidUpdate(prevProps) {
        const wasChanged = this.props.location !== prevProps.location;
        if (wasChanged) {
            this.props.requestGameInfo(this.props.match.params.gameId)
        }
    }

    render() {
        return this.props.isLoading
            ? <Preloader style={{height: '100vh'}}/>
            : <CardPage
                currentGameId={this.props.match.params.gameId}
                name={this.props.details && this.props.details.name}
                description={this.props.details && this.props.details.description}
                released={this.props.details && dateToString(this.props.details.released)}
                metacritic={this.props.details && this.props.details.metacritic}
                imageSrc={this.props.details && this.props.details.background_image}
                imageSrcAdd={this.props.details && this.props.details.background_image_additional}
                screenshots={this.props.screenshots}
                trailers={this.props.trailers}
                //similarGames={this.props.similarGames}
                series={this.props.series}
                DLCs={this.props.DLCs}
                gameWebsite={this.props.details && this.props.details.website}
                platforms={this.props.details && this.props.details.platforms}
                genres={this.props.details && this.props.details.genres}
                stores={this.props.details && this.props.details.stores}
                tags={this.props.details && this.props.details.tags}
                publishers={this.props.details && this.props.details.publishers}
                developers={this.props.details && this.props.details.developers}
                parentGame={this.props.parentGame}
            />
    }
}

const mapStateToProps = (state) => ({
    details: state.game.details,
    isLoading: state.game.isLoading,
    screenshots: state.game.screenshots,
    trailers: state.game.trailers,
    similarGames: state.game.similarGames,
    series: state.game.series,
    DLCs: state.game.DLCs,
    parentGame: state.game.parentGame
});

export default compose(
    withRouter,
    connect(mapStateToProps, { requestGameInfo })
)(GameContainer)