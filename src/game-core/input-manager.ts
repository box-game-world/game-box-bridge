import * as PIXI from 'pixi.js'
import { Rectangle, Vertex, Vector, Position } from './interfaces'
import GameConfig from './game-config'

const CREATION_SYMBOL = Symbol();
export default class InputManager{
 
  private static _instance:InputManager;
  private _isTouched:boolean = false;
  private _touchStartPosition:Position = { x:0, y:0 };
  private _touchMovePosition:Position = { x:0, y:0 };
  private _touchEndPosition:Position = { x:0, y:0 };
  private _angle:number = 0;
  private _vector:Vector = { radian:0, length:0 };
  private _availableVector:boolean;
  private _initialized:boolean = false;

  public static getIntance():InputManager{
    if( !InputManager._instance ){
      InputManager._instance = new InputManager( CREATION_SYMBOL );
    }
    return InputManager._instance;
  }

  public get isTouched():boolean{
    return this._isTouched;
  }

  public get touchStartPosition():Position{
    return this._touchStartPosition;
  }

  public get touchMovePosition():Position{
    return this._touchMovePosition;
  }

  public get touchEndPosition():Position{
    return this._touchEndPosition;
  }

  public get vector():Vector{
    return this._vector;
  }

  public get availableVector():boolean{
    return this._availableVector;
  }

  constructor( symbol:Symbol ){
    if( symbol !== CREATION_SYMBOL ){
      throw new Error( 'getInstance 클래스 메소드를 이용해 객체를 생성해주세요.' );
    }
  }

  public init( data:{ stage:PIXI.Container, rectangle:Rectangle }):void{
    if( this._initialized ){ return; }
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
      this._touchStartPosition = this._touchMovePosition = event.data.global.clone();
      this._isTouched = true;
    });

    stage.on( 'touchmove', ( event:PIXI.interaction.InteractionEvent )=>{
      this._touchMovePosition = event.data.global;
    });

    stage.on( 'touchend', ( event:PIXI.interaction.InteractionEvent )=>{
      this._touchEndPosition = event.data.global.clone();
      this._isTouched = false;
    });

    this._initialized = true;
  }

  public destroy():void{
    this._initialized = false;
  }
}