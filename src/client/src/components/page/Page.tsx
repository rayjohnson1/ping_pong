import React, { Component } from 'react';
import GameController, { GameComponent, GameBoard } from '../../classes/GameController';

export default class Page extends Component<{}> {

    private _gameController: GameController;
    private _gameBoardRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: {}){
        super(props);

        this._gameBoardRef = React.createRef();
        
    }

    componentDidMount(){

        const gameBoard: GameBoard = new GameBoard(this._gameBoardRef as React.RefObject<HTMLCanvasElement>);

        this._gameController = new GameController(gameBoard);
        this._gameController.start();
    }

    render() {
        return (
            <div className={`page`}>
                <canvas ref={this._gameBoardRef} id={`game-board`} style={{border: "1px solid #d3d3d3", background: "#f1f1f1"}}></canvas>
            </div>
        )
    }

}
