import State from "./states/abs-state";
import GameWorld from "./game-world";
import ReadyState from "./states/ready-state";
import { StateEnum } from "./interfaces";
import AimmingState from "./states/aimming-state";
import FiredState from "./states/fired-state";
import WaitingUserSleepState from "./states/waiting-user-sleep-state";
import GameOverState from "./states/game-over-state";
import gameStore from "./store/game-store";

const CREATION_SYMBOL = Symbol();

export default class GameStateManager{
  private static _instance:GameStateManager;
  private _currentState:State;
  private _readyState:ReadyState;
  private _aimmingState:AimmingState;
  private _firedState:FiredState;
  private _waitingUserSleepState:WaitingUserSleepState;
  private _gameOverState:GameOverState;
  

  private _gameWorld:GameWorld;

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
    this._gameOverState = new GameOverState( this._gameWorld, setStateCallback );
    this._currentState = this._readyState;
    this._currentState.mounted();
  }

  private _setState( stateType:StateEnum ):void{
    let state:State|null = null;
    switch( stateType ){
      case StateEnum.Ready:  state = this._readyState; break;
      case StateEnum.Aimming:  state = this._aimmingState; break;
      case StateEnum.Fired:  state = this._firedState; break;
      case StateEnum.WaitingUserSleep:  state = this._waitingUserSleepState; break;
      case StateEnum.GameOver:  state = this._gameOverState; break;
    }

    if( state ){
      gameStore.changeState( stateType );
      if( this._currentState ){
        this._currentState.destroyed();
      }
      this._currentState = state;
      this._currentState.mounted();
    }
  }
}