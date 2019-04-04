import { GameComponent } from "./GameComponent.abstract";
import { IGameComponent, IPongUpdate } from "./interfaces";

export default class Pong extends GameComponent {

    constructor(params: IGameComponent){
        super(params);
    }

    public update(params: IPongUpdate){

        const {
            boardDimensions,
            mouseCoords
        } = params;

        this.ctx.fillStyle = this.color;

        this.x = this.x;
        this.y = mouseCoords.y - (this.height / 2)

        if(this.y / 2 > boardDimensions.height)
            this.ctx.fillRect(this.x, boardDimensions.height - this.height, this.width, this.height);
        else if(this.y < 0)
            this.ctx.fillRect(this.x, 0, this.width, this.height);
        else
            this.ctx.fillRect(this.x, this.y, this.width, this.height);

    }

}