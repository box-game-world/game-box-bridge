import State from "./states/abs-state";
import GameWorld from "./game-world";
import ReadyState from "./states/ready-state";
import { stat } from "fs";
import { StateEnum } from "./interfaces";
import AimmingState from "./states/aimming-state";
import FiredState from "./states/fired-state";
import WaitingUserSleepState from "./states/waiting-user-sleep-state";
import CreateNextState from "./states/create-next";

const CREATION_SYMBOL = Symbol();

export default class GameStateManager{
  private static _instance:GameStateManager;
  private _currentState:State;
  private _readyState:ReadyState;
  private _aimmingState:AimmingState;
  private _firedState:FiredState;
  private _waitingUserSleepState:WaitingUserSleepState;
  private _createNextState:CreateNextState;

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
    const setStateCallback:Function = this._setState.bind( this );
    this._readyState = new ReadyState( this._gameWorld, setStateCallback );
    this._aimmingState = new AimmingState( this._gameWorld, setStateCallback );
    this._firedState = new FiredState( this._gameWorld, setStateCallback );
    this._waitingUserSleepState = new WaitingUserSleepState( this._gameWorld, setStateCallback );
    this._createNextState = new CreateNextState( this._gameWorld, setStateCallback );
    this._currentState = this._readyState;
  }

  private _setState( stateType:StateEnum ):void{
    let state:State|null = null;
    switch( stateType ){
      case StateEnum.Ready:  state = this._readyState; break;
      case StateEnum.Aimming:  state = this._aimmingState; break;
      case StateEnum.Fired:  state = this._firedState; break;
      case StateEnum.WaitingUserSleep:  state = this._waitingUserSleepState; break;
      case StateEnum.CreateNext:  state = this._createNextState; break;
    }

    if( state ){
      if( this._currentState ){
        this._currentState.destroyed();
      }
      this._currentState = state;
      this._currentState.mounted();
    }
  }
}