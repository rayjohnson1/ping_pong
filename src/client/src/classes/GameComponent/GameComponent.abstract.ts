import { IGameComponent, IBallUpdate, IPongUpdate } from "./interfaces";

export abstract class GameComponent {

    color: string;
    width: number;
    height: number;
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    

    constructor(params: IGameComponent){

        this.ctx = params.gameBoardContext;
        this.color = params.color;
        this.width = params.width;
        this.height = params.height;
        this.x = params.startingX || 0;
        this.y = params.startingY || 0;
        
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    public abstract update(params: IBallUpdate | IPongUpdate): void;

    public crashWith (otherobj: GameComponent): boolean {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }

}