import React, { Component } from 'react';
import GameController from '../../classes/GameController/GameController';
import GameBoard from '../../classes/GameBoard';

interface IGameMode {
    ballSize: number;
    ballSpeed: number;
    pongHeight: number;
}

type SelectedGameMode = 'beginner' | 'intermediate' | 'expert' | 'custom';

interface IState {
    gameModeSettings: {
        [gameMode: string]: IGameMode,
        beginner: IGameMode,
        intermediate: IGameMode,
        expert: IGameMode
    };
    selectedGameMode: SelectedGameMode;
    currentGameStats: {
        pings: number,
        ballVelocity: number
    };
}

export default class Page extends Component<{}, IState> {

    private _gameController: GameController;
    private _gameBoardRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: {}){
        super(props);

        this._gameBoardRef = React.createRef();

        this.state = {
            gameModeSettings: {
                beginner: {
                    ballSize: 30,
                    ballSpeed: 6,
                    pongHeight: 160
                },
                intermediate: {
                    ballSize: 20,
                    ballSpeed: 10,
                    pongHeight: 120
                },
                expert: {
                    ballSize: 10,
                    ballSpeed: 15,
                    pongHeight: 80
                }
            },
            selectedGameMode: 'beginner',
            currentGameStats: {
                pings: 0,
                ballVelocity: 0
            }
        }
        
    }

    componentDidMount(){

        const gameBoard: GameBoard = new GameBoard(this._gameBoardRef as React.RefObject<HTMLCanvasElement>);
        this._gameController = new GameController(gameBoard);
        
    }

    handleBeginnerClick = (e: React.MouseEvent) => {
        e.preventDefault();
        this.setState({ selectedGameMode: 'beginner' });
    }

    handleIntermediateClick = (e: React.MouseEvent) => {
        e.preventDefault();
        this.setState({ selectedGameMode: 'intermediate' });
    }

    handleExpertClick = (e: React.MouseEvent) => {
        e.preventDefault();
        this.setState({ selectedGameMode: 'expert' });
    }

    handleBeginGameClick = (e: React.MouseEvent) => {
        e.preventDefault();
        this.setState({
            currentGameStats: {
                pings: 0,
                ballVelocity: 0
            }
        })
        this._gameController.start(this.state.gameModeSettings[this.state.selectedGameMode], this.countPings);
    }

    countPings = (data: {pings: number, maxBallVelocity: number}) => {
        this.setState({ currentGameStats: { pings: data.pings, ballVelocity: data.maxBallVelocity } });
    }

    render() {
        return (
            <div className={`page`}>
                <div className={`grid`}>
                    <div className={`game-screen__side-bar`}>
                        <h1>Ping Pong</h1>
                        <div className={`card`}>
                            <div className={`card__title`}>
                                Game Mode
                            </div>
                            <div className={`card__body`}>
                                <div className={`modes`}>
                                    <button className={`game-mode-btn ${this.state.selectedGameMode === 'beginner' ? 'selected' : ''}`} onClick={this.handleBeginnerClick}>Beginner</button>
                                    <button className={`game-mode-btn ${this.state.selectedGameMode === 'intermediate' ? 'selected' : ''}`} onClick={this.handleIntermediateClick}>Intermediate</button>
                                    <button className={`game-mode-btn ${this.state.selectedGameMode === 'expert' ? 'selected' : ''}`} onClick={this.handleExpertClick}>Expert</button>
                                </div>
                                <div className={``}>
                                    <p>Ball Size: {this.state.gameModeSettings[this.state.selectedGameMode].ballSize}</p>
                                    <p>Ball Speed: {this.state.gameModeSettings[this.state.selectedGameMode].ballSpeed}</p>
                                    <p>Pong Heights: {this.state.gameModeSettings[this.state.selectedGameMode].pongHeight}</p>
                                </div>
                            </div>
                            <div className={`card__footer`}>
                                <button onClick={this.handleBeginGameClick}>Start Game</button>
                            </div>
                        </div>
                        {/* <div className={`card`}>
                            <div className={`card__title`}>
                                Customize Your Game!
                            </div>
                            <div className={`card__body`}>
                                <div className={`customize-grid`}>
                                    <div>
                                        <label>Ball Size</label>
                                        <input type={`number`} min={`10`} max={`40`} />
                                    </div>
                                    <div>
                                        <label>Ball Speed</label>
                                        <input type={`number`} min={`10`} max={`40`} />
                                    </div>
                                    <div>
                                        <label>Pong Height</label>
                                        <input type={`number`} min={`10`} max={`40`} />
                                    </div>
                                </div>
                            </div>
                            <div className={`card__footer`}>
                                <button>Start Game</button>
                            </div>
                        </div> */}
                        <div className={`card`}>
                            <div className={`card__title`}>
                                Game Stats
                            </div>
                            <div className={`card__body`}>
                                <div className={`customize-grid`}>
                                    <input type={`text`} placeholder={`username`} />
                                    <p>Pings: {this.state.currentGameStats.pings}</p>
                                    <p>Max Ball Velocity: {this.state.currentGameStats.ballVelocity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`game-screen__game-view`}>
                        <canvas ref={this._gameBoardRef} id={`game-board`} style={{border: "1px solid #d3d3d3", background: "#f1f1f1"}}></canvas>
                    </div>
                </div>
            </div>
        )
    }

}
