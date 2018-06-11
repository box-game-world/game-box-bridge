import State from "./abs-state";
import GameWorld from "../game-world";
import InputManager from "../input-manager";
import { StateEnum, Position } from "../interfaces";
import User from "../user";
import GameConfig from "../game-config";

import WormholeBallIndicator from "../wormhole-ball-indicator";
import WormholeBall from "../wormhole-ball";
import Ground from "../ground";
import StepManager from "../step-manager";
import { find } from 'lodash';
import PhysicalBody from "../physical-body";
import gameStore from "../store/game-store";


export default class FiredState extends State{

  private _indicator:WormholeBallIndicator;
  private _ball:WormholeBall;
  private _user:User;
  private _ground:Ground;
  private _limitY:number;
  private _stepManager:StepManager;

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._indicator = this.gameWorld.wormholeBallIndicator;
    this._ball = this.gameWorld.wormholeBall;
    this._user = this.gameWorld.user;
    this._ground = this.gameWorld.ground;
    this._limitY = GameWorld.GET_STAGE_SIZE().height - this._ground.height;
    this._stepManager = StepManager.getInstance();
  }

  public mounted():void{
    
    this._ball.show();
    this._ball.wakeup();
    this._ball.setStatic( false );
    this._ball.setVector( this._user.vector );
    // console.log( '::: Fired state :::' );
    // console.log( 'Ball : ', this._ball );
    // console.log( 'User : ', this._user );
  }

  public update():void{
    this._indicator.update();
    if( this._ball.isCollision ){
      const targetQueue:PhysicalBody[] = this._ball.collisionQueue;
      if( this._findCollisionTarget( targetQueue, 'step') || this._findCollisionTarget( targetQueue, 'ground') ){
        gameStore.consumeEnergy( 100 );
        this._moveUser();
        this.changeState( StateEnum.WaitingUserSleep );
        return;
      }
    }

    if( this._ball.y >  this._limitY ){
      gameStore.consumeEnergy( 100 );
      this.changeState( StateEnum.Ready );
    }
  }

  private _findCollisionTarget( queue:PhysicalBody[], label:string ):PhysicalBody{
    return find( queue, (item):boolean=>item && item.label && item.label === label);
  }

  private _moveUser():void{
    this._ball.hide();
    this._user.vector = { radian:0, length:0 };
    this._user.x = this._ball.x;
    this._user.y = this._ball.y - 20;
    this._user.wakeup();
  }
}