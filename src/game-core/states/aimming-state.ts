import State from "./abs-state";
import GameWorld from "../game-world";
import InputManager from "../input-manager";
import { StateEnum, Position } from "../interfaces";
import User from "../user";
import GameConfig from "../game-config";
import WormholeBall from "../wormhole-ball";

export default class AimmingState extends State{

  private _inputManager:InputManager = InputManager.getIntance();
  private _user:User;
  private _ball:WormholeBall;

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._user = this.gameWorld.user;
    this._ball = this.gameWorld.wormholeBall;
  }

  public mounted():void{
    // console.log( '::: Aimming state :::' );
    // console.log( 'Ball : ', this._ball );
    // console.log( 'User : ', this._user );
    this._ball.x = this._user.x;
    this._ball.y = this._user.y;
    this._ball.resetCollision();
  }

  public update():void{
    const touchStartPosition:Position = this._inputManager.touchStartPosition;
    const touchMovePosition:Position = this._inputManager.touchMovePosition;
    const xLength:number = touchMovePosition.x - touchStartPosition.x;
    const yLength:number = touchMovePosition.y - touchStartPosition.y;
    const distance:number = ( Math.abs( xLength ) + Math.abs( yLength ) ) * 0.4;
    const radian = Math.atan2( yLength, xLength );
    this._user.vector = { radian:radian, length:distance };

    if( !this._inputManager.isTouched ){
      if( distance < GameConfig.MIN_SHOOTING_POWER ){
        this.changeState( StateEnum.Ready );
      }else{
        this.changeState( StateEnum.Fired );
      }
    }
  }
}