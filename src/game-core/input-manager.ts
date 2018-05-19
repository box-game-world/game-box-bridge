import * as PIXI from 'pixi.js'
import { Rectangle, Vertex, Vector } from './interfaces'
import GameStatus from './game-status';


export default class InputManager{

  private _isTouched:boolean = false;
  private _touchStartPosition:Vertex = { x:0, y:0 };
  private _touchMovePosition:Vertex = { x:0, y:0 };
  private _touchEndPosition:Vertex = { x:0, y:0 };
  private _angle:number = 0;
  private _vector:Vector = { radian:0, length:0 };
  private _availableVector:boolean;

  public get isTouched():boolean{
    return this._isTouched;
  }

  public get touchStartPosition():Vertex{
    return this._touchStartPosition;
  }

  public get touchMovePosition():Vertex{
    return this._touchMovePosition;
  }

  public get touchEndPosition():Vertex{
    return this._touchEndPosition;
  }

  public get vector():Vector{
    return this._vector;
  }

  public get availableVector():boolean{
    return this._availableVector;
  }

  constructor( data:{stage:PIXI.Container, rectangle:Rectangle }  ){
    const area:PIXI.Graphics = new PIXI.Graphics();
    const stage:PIXI.Container = data.stage;
    const rectangle:Rectangle = data.rectangle;
    
    stage.addChildAt( area, 0 ); 
    area.beginFill( 0xff9900 );
    area.drawRect( rectangle.x, rectangle.y, rectangle.width, rectangle.height );
    area.endFill();
    area.alpha = 0;

    stage.interactive = true;
    stage.on( 'touchstart', ( event:PIXI.interaction.InteractionEvent )=>{
      this._touchStartPosition = event.data.global.clone();
    });

    stage.on( 'touchmove', ( event:PIXI.interaction.InteractionEvent )=>{
      this._touchMovePosition = event.data.global;
      const xLength:number = this.touchMovePosition.x - this._touchStartPosition.x;
      const yLength:number = this.touchMovePosition.y - this._touchStartPosition.y;
      const distance:number = ( Math.abs( xLength ) + Math.abs( yLength ) ) * 0.4;
      this._vector.radian = Math.atan2( yLength, xLength );
      this._vector.length = distance;
    });

    stage.on( 'touchend', ( event:PIXI.interaction.InteractionEvent )=>{
      GameStatus.AVAILABLE_FIRE = true;
    })

  }
}