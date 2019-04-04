import GameBoard from '../GameBoard';
import { MouseCoords } from './interfaces';
import Ball from '../GameComponent/Ball';
import Pong from '../GameComponent/Pong';

export default class GameController {

    ctx: CanvasRenderingContext2D;
    board: GameBoard;
    interval: any;

    ballSpeed: number;
    ballSize: number;
    ballYDeltaMultiplier: number;

    ball: Ball;
    pongs: Pong[];

    docBody: HTMLBodyElement;
    mouseCoords: MouseCoords;

    constructor(board: GameBoard){
        
        this.board = board;
        this.pongs = [];
        this.mouseCoords = {
            x: 0,
            y: 0
        }

        this.ballSpeed = 5;
        this.ballSize = 10;
        this.ballYDeltaMultiplier = 5;

        this.docBody = document.getElementsByTagName("body")[0];
        this.docBody.addEventListener('mousemove', (e: MouseEvent) => {
            this.mouseCoords.x = e.clientX;
            this.mouseCoords.y = e.clientY;
        })
    
    }

    public start() {
        this.ctx = this.board.ctx;
        this.ball = new Ball({
            gameBoardContext: this.ctx,
            width: this.ballSize,
            height: this.ballSize,
            color: 'red',
            startingX: (this.board.board.width / 2) - (this.ballSize / 2),
            startingY: (this.board.board.height / 2) - (this.ballSize / 2),
        }, this.ballSpeed, 0);
        
        const pong1 = new Pong({
            gameBoardContext: this.ctx,
            width: 5, 
            height: 60,
            color: 'black',
            startingX: 0, 
            startingY: 60
        });

        const pong2 = new Pong({
            gameBoardContext: this.ctx,
            width: 5, 
            height: 60,
            color: 'black',
            startingX: this.board.board.width - 5, 
            startingY: 60
        });

        this.pongs.push(pong1, pong2);

        this.interval = setInterval(() => { this.update() }, 20);
    }

    private update(){
        this.board.clear();

        this.ball.update({
            direction: this.ball.direction,
            ballDirectionY: this.ball.ballDirectionY
        });

        this.pongs[0].update({
            boardDimensions: {
                width: this.board.board.width,
                height: this.board.board.height,
            },
            mouseCoords: this.mouseCoords
        });

        this.pongs[1].update({
            boardDimensions: {
                width: this.board.board.width,
                height: this.board.board.height,
            },
            mouseCoords: this.mouseCoords
        });

        if(this.ball.height + this.ball.y >= this.board.board.height)
            this.ball.update({
                direction: this.ball.direction,
                ballDirectionY: this.ball.ballDirectionY * -1
            });

        if(this.ball.y <= 0)
            this.ball.update({
                direction: this.ball.direction,
                ballDirectionY: this.ball.ballDirectionY * -1
            });
        
        if(this.ball.crashWith(this.pongs[0]))
            this.ball.update({
                direction: '+',
                ballDirectionY: Math.random() > .5 ? (this.ballYDeltaMultiplier * 1) : (this.ballYDeltaMultiplier * -1)
            });
        

        if(this.ball.crashWith(this.pongs[1]))
            this.ball.update({
                direction: '-',
                ballDirectionY: Math.random() > .5 ? (this.ballYDeltaMultiplier * 1) : (this.ballYDeltaMultiplier * -1)
            });

    }

}