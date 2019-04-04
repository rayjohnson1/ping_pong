import { GameComponent } from "./GameComponent.abstract";
import { BallDirection, IGameComponent, IBallUpdate } from "./interfaces";

export default class Ball extends GameComponent {

    ballDirectionX: number;
    ballDirectionY: number;
    direction: BallDirection;

    constructor(params: IGameComponent, ballDirectionX: number, ballDirectionY: number){
        super(params);

        this.ballDirectionX = ballDirectionX;
        this.ballDirectionY = ballDirectionY;
        this.direction = '+';
    }

    public update(params: IBallUpdate): void{

        const { 
            ballDirectionY,
            direction
        } = params;

        this.direction = direction;
        this.ballDirectionY = ballDirectionY;
        this.ctx.fillStyle = this.color;
        if(this.direction === '+')
            this.ctx.fillRect(this.x += this.ballDirectionX, this.y += this.ballDirectionY, this.width, this.height);
        else
            this.ctx.fillRect(this.x -= this.ballDirectionX, this.y += this.ballDirectionY, this.width, this.height);

    }

}