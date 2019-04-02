import React from 'react';

export default class GameController {

    ctx: CanvasRenderingContext2D;
    board: GameBoard;
    interval: any;

    player: GameComponent;

    constructor(board: GameBoard){
        
        this.board = board;

        
    
    }

    public start() {
        this.ctx = this.board.ctx;

        this.player = new GameComponent(this.ctx, 20, 20, 'red', 0, 0);

        this.interval = setInterval(() => { this.update() }, 20);
    }

    private update(){
        this.board.clear();
        this.player.update();
    }

}

export class GameBoard {

    public ctx: CanvasRenderingContext2D;
    public board: HTMLCanvasElement;

    constructor(board: React.RefObject<HTMLCanvasElement>){
        
        this.board = board.current!;
        this.ctx = this.board.getContext('2d')!;

        this.board.width = 480;
        this.board.height = 270;
    
    }

    clear(){
        this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    }

}

export class GameComponent {

    width: number;
    height: number;
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    

    constructor(gameBoardContext: CanvasRenderingContext2D, width: number, height: number, color: string, startingX: number = 0, startingY: number = 0){

        this.ctx = gameBoardContext;
        this.width = width;
        this.height = height;
        this.x = startingX;
        this.y = startingY;
        
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // this._width = width;
        // this._height = height;
        // this._curX = startingX;
        // this._curY = startingY;

    }

    public update(){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}