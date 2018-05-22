
import { Graphics, Rectangle, Sprite } from 'pixi.js';
import GameWorld from './game-world';
import WormholeBall from './wormhole-ball';
import { SIGPROF } from 'constants';
import { IgnorePlugin } from 'webpack';

export default class WormholeBallIndicator extends Sprite{

  private _rectangle:Rectangle;
  private _wormholeBall:WormholeBall;
  private _graphics:Graphics;
  private _size:number = 10;
  private _halfSize:number = 5;
  private _angleDiff:number = Math.PI/4;

  constructor( wormholeBall:WormholeBall ){
    super();
    this._wormholeBall = wormholeBall;
    this._init();
    this._render();
    this.update();
  }

  private _init():void{
    const stageSize:{ width:number, height:number } = GameWorld.GET_STAGE_SIZE();
    this._rectangle = new Rectangle(0, 0, stageSize.width, stageSize.height );
  }

  private _render():void{
    this._graphics = new Graphics();
    this._graphics.beginFill( 0xff9900 );
    this._graphics.moveTo( 0, 0 );
    this._graphics.lineTo( this._size, 0 );
    this._graphics.lineTo( this._size, this._size );
    this._graphics.closePath();
    this._graphics.endFill();
    this._graphics.x = -this._halfSize;
    this._graphics.y = -this._halfSize;
    this.addChild( this._graphics );
  }

  public update():void{
    const x:number = this._wormholeBall.x;
    const y:number = this._wormholeBall.y;
    let outLeft:boolean = false;
    let outRight:boolean = false;
    let outTop:boolean = false;
    let outBottom:boolean = false;

    if( x < this._rectangle.x ){
      outLeft = true;
    }
    
    if( x > this._rectangle.width ){
      outRight = true;
    }
    
    if( y < this._rectangle.y  ){
      outTop = true;
    }

    if( y > this._rectangle.height  ){
      outBottom = true;
    }

    if( outLeft || outRight || outTop || outBottom ){
      this.visible = true;
      let angle = -this._angleDiff;
      if( outTop ){
        this.y = this._halfSize + 5;
      }else if( outBottom ){
        this.y = this._rectangle.height
      }else{
        this.y = this._wormholeBall.y - this._halfSize;
      }

      if( outLeft ){
        this.x = this._halfSize;
      }else if( outRight ){
        this.x = this._rectangle.width - this._halfSize;
      }else{
        this.x = this._wormholeBall.x;
      }

      this.rotation = angle;
    }else{
      this.visible = false;
    }
  }
}
