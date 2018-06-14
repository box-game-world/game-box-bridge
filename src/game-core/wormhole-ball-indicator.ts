
import { Graphics, Sprite } from 'pixi.js';
import GameWorld from './game-world';
import WormholeBall from './wormhole-ball';
import { Rectangle } from './interfaces';


export default class WormholeBallIndicator extends Sprite{

  private _rectangle:Rectangle;
  private _target:WormholeBall;
  private _graphics:Graphics;
  private _size:number = 10;
  private _halfSize:number = 5;
  private _angleDiff:number = Math.PI/4;

  constructor(  target:WormholeBall, rectangle:Rectangle ){
    super();
    this._target = target;
    this._rectangle = rectangle;
    this._render();
    this.update();
  }

  private _render():void{
    this._graphics = new Graphics();
    this._graphics.beginFill( 0xffffff );
    this._graphics.lineStyle( 1, 0 );
    this._graphics.moveTo( 0, 0 );
    this._graphics.lineTo( this._size, 0 );
    this._graphics.lineTo( this._size, this._size );
    this._graphics.closePath();
    this._graphics.endFill();
    this._graphics.x = -this._halfSize;
    this._graphics.y = -this._halfSize;
    this.addChild( this._graphics );
  }

  public update( offsetX:number=0 ):void{
    const x:number = this._target.x;
    const y:number = this._target.y;
    let outLeft:boolean = false;
    let outRight:boolean = false;
    let outTop:boolean = false;

    if( x < this._rectangle.x - offsetX ){
      outLeft = true;
    }
    
    if( x > this._rectangle.width - offsetX ){
      outRight = true;
    }
    
    if( y < this._rectangle.y  ){
      outTop = true;
    }

    if( y > this._rectangle.height  ){
      this.visible = false;
      return;
    }

    this.visible = outLeft || outRight || outTop;
    if( this.visible ){
      let angle = 0;
      let x = 0;
      let y = 0;
      if( outRight && outTop ){
        angle = 0;
        x = this._rectangle.width - this.width;
        y = this._halfSize;
      }else if( outLeft && outTop  ){
        angle = this._angleDiff*-2;
        x = this.width;
        y = this._halfSize;
      }else if( outTop ){
        angle = this._angleDiff*-1;
        x = this._target.x;
        y = this._halfSize;
      }else if( outLeft ){
        angle = this._angleDiff*-3;
        x = this._halfSize;
        y = this._target.y;

      }else if( outRight ){
        angle = this._angleDiff;
        x = this._rectangle.width - this.width - this._halfSize;
        y = this._target.y;
      }
      this.rotation = angle;
      this.x = x;
      this.y = y;
    }else{
      this.visible = false;
    }
  }
}
