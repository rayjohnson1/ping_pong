import React from 'react';

export default class GameBoard {

    public ctx: CanvasRenderingContext2D;
    public board: HTMLCanvasElement;

    constructor(board: React.RefObject<HTMLCanvasElement>){
        
        this.board = board.current!;
        this.ctx = this.board.getContext('2d')!;

        this.board.width = 600;
        this.board.height = 600;
    
    }

    clear(){
        this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    }

}