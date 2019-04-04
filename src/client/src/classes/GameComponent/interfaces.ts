import { MouseCoords } from "../GameController/interfaces";

export interface IGameComponent {
    gameBoardContext: CanvasRenderingContext2D;
    width: number;
    height: number;
    color: string;
    startingX?: number;
    startingY?: number;
}

export interface IBallUpdate {
    ballDirectionY: number;
    direction: BallDirection;
}

export interface IPongUpdate {
    boardDimensions: {
        width: number,
        height: number
    };
    mouseCoords: MouseCoords;
}

export type BallDirection = '-' | '+';