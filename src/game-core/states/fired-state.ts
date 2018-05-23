import State from "./abs-state";
import GameWorld from "../game-world";
import InputManager from "../input-manager";
import { StateEnum, Position } from "../interfaces";
import User from "../user";
import GameConfig from "../game-config";

import WormholeBallIndicator from "../wormhole-ball-indicator";
import WormholeBall from "../wormhole-ball";
import Ground from "../ground";

export default class FiredState extends State{

  private _indicator:WormholeBallIndicator;
  private _ball:WormholeBall;
  private _user:User;
  private _ground:Ground;
  private _limitY:number;

  constructor( gameWorld:GameWorld, changeCallback:Function ){
    super( gameWorld, changeCallback );
    this._indicator = this.gameWorld.wormholeBallIndicator;
    this._ball = this.gameWorld.wormholeBall;
    this._user = this.gameWorld.user;
    this._ground = this.gameWorld.ground;
    this._limitY = GameWorld.GET_STAGE_SIZE().height - this._ground.height
  }

  public update():void{
    this._indicator.update();
    if( this._ball.isCollision ){
      const targetLabel:string = this._ball.collisionTarget.label;
      if( targetLabel === 'mountain' || targetLabel === 'ground' ){
        this._ball.deactive();
        this._ball.hide();
        this._user.vector = { radian:0, length:0 };
        this._user.x = this._ball.x;
        this._user.y = this._ball.y-10;
        this.changeCallback( StateEnum.Ready );
        return;
      }
    }

    if( this._ball.y >  this._limitY ){
      console.log( 'over' );
    }
  }
}