import State from "./states/abs-state";
import GameWorld from "./game-world";
import ReadyState from "./states/ready-state";
import { stat } from "fs";
import { StateEnum } from "./interfaces";
import AimmingState from "./states/aimming-state";
import FiredState from "./states/fired-state";

const CREATION_SYMBOL = Symbol();

export default class GameStateManager{
  private static _instance:GameStateManager;
  private _currentState:State;
  private _readyState:ReadyState;
  private _aimmingState:AimmingState;
  private _firedState:FiredState;

  private _gameWorld:GameWorld;
  private _initialized:boolean = false

  public static getInstance():GameStateManager{
    if( !GameStateManager._instance ){
      GameStateManager._instance = new GameStateManager( CREATION_SYMBOL );
    }
    return GameStateManager._instance;
  }

  constructor( symbol:Symbol ){
    if( symbol !== CREATION_SYMBOL ){
      throw new Error( 'getInstance 클래스 메소드를 이용해 객체를 생성해주세요.' );
    }
  }

  public init( gameWorld:GameWorld ):void{
    this._gameWorld = gameWorld;
    this._initStates();
    this._initialized = true;
  }

  public update():void{
    this._currentState.update();
  }

  private _initStates():void{
    const setStateCallback:Function = this._setState.bind( this )
    this._readyState = new ReadyState( this._gameWorld, setStateCallback );
    this._aimmingState = new AimmingState( this._gameWorld, setStateCallback );
    this._firedState = new FiredState( this._gameWorld, setStateCallback );
    this._currentState = this._readyState;
  }

  private _setState( state:StateEnum ):void{
    switch( state ){
      case StateEnum.Ready: 
        this._currentState = this._readyState;
        break;

      case StateEnum.Aimming: 
        this._currentState = this._aimmingState;
        break;

      case StateEnum.Fired: 
        this._currentState = this._firedState;
        break;
    }
  }
}