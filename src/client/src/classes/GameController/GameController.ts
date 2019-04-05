import GameBoard from '../GameBoard';
import { MouseCoords } from './interfaces';
import Ball from '../GameComponent/Ball';
import Pong from '../GameComponent/Pong';
import { timingSafeEqual } from 'crypto';

export default class GameController {

    ctx: CanvasRenderingContext2D;
    board: GameBoard;
    interval: any;

    ballSpeed: number;
    ballSize: number;
    ballYDeltaMultiplier: number;

    pongHeight: number;

    ball: Ball;
    pongs: Pong[];

    pings: number;

    docBody: HTMLBodyElement;
    mouseCoords: MouseCoords;

    currentFrame: number;

    pingListener: (data: {pings: number, maxBallVelocity: number}) => void;

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

        this.pongHeight = 120;

        this.currentFrame = 0;

        this.pings = 0;
        


        this.docBody = document.getElementsByTagName("body")[0];
        this.docBody.addEventListener('mousemove', (e: MouseEvent) => {
            this.mouseCoords.x = e.clientX;
            this.mouseCoords.y = e.clientY;
        })
    
    }

    public start(gameSpecs: { ballSize: number, ballSpeed: number, pongHeight: number}, pingListener: (data: {pings: number, maxBallVelocity: number}) => void) {
        this.ballSize = gameSpecs.ballSize;
        this.ballSpeed = gameSpecs.ballSpeed;
        this.ballYDeltaMultiplier = gameSpecs.ballSpeed;
        this.pongHeight = gameSpecs.pongHeight;
        this.pingListener = pingListener;
        this.currentFrame = 0;
        this.pings = 0;

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
            height: this.pongHeight,
            color: 'black',
            startingX: 0, 
            startingY: 60
        });

        const pong2 = new Pong({
            gameBoardContext: this.ctx,
            width: 5, 
            height: this.pongHeight,
            color: 'black',
            startingX: this.board.board.width - 5, 
            startingY: 60
        });

        this.pongs.push(pong1, pong2);

        this.interval = setInterval(() => { this.update() }, 20);

    }

    private ping(fn: (data: {pings: number, maxBallVelocity: number}) => void){
        fn({pings: this.pings, maxBallVelocity: this.ballSpeed});
    }

    private update(){
        this.board.clear();
        this.currentFrame++;

        this.nthFrame(200, this.currentFrame);

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

        //Ping off top
        if(this.ball.y <= 0)
            this.ball.update({
                direction: this.ball.direction,
                ballDirectionY: this.ball.ballDirectionY * -1
            });

        //Ping off bottom
        if(this.ball.height + this.ball.y >= this.board.board.height)
            this.ball.update({
                direction: this.ball.direction,
                ballDirectionY: this.ball.ballDirectionY * -1
            });

        //Collide with walls
        if(this.ball.x <= -100 || this.ball.x + this.ball.width >= this.board.board.width + 100){
            this.stop();
        }
        
        if(this.ball.crashWith(this.pongs[0])){
            this.ball.update({
                direction: '+',
                ballDirectionY: Math.random() > .5 ? (this.ballYDeltaMultiplier * 1) : (this.ballYDeltaMultiplier * -1)
            });

            this.pings++;
            this.ping(this.pingListener);
        }
        

        if(this.ball.crashWith(this.pongs[1])){
            this.ball.update({
                direction: '-',
                ballDirectionY: Math.random() > .5 ? (this.ballYDeltaMultiplier * 1) : (this.ballYDeltaMultiplier * -1)
            });
            
            this.pings++;
            this.ping(this.pingListener);
        }

    }

    private nthFrame(frameInterval: number, currentFrame: number){
        if(currentFrame % frameInterval === 0){

            this.ballSpeed += 1;
            this.ballYDeltaMultiplier += 1;

        }
    }

    private stop(){
        this.board.clear();
        clearInterval(this.interval);
    }

}