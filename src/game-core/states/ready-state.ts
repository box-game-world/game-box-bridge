import State from "./abs-state";
import GameWorld from "../game-world";
import InputManager from "../input-manager";
import { StateEnum } from "../interfaces";
import WormholeBall from "../wormhole-ball";
import User from "../user";
import gameStore from "../store/game-store";

export default class ReadyState extends State{
  private _inputManager:InputManager = InputManager.getIntance();
  private _ball:WormholeBall;
  private _user:User;

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._ball = this.gameWorld.wormholeBall;
    this._user = this.gameWorld.user;
  }

  public mounted():void{
    // console.log( '::: Ready state :::' );
    // console.log( 'Ball : ', this._ball );
    // console.log( 'User : ', this._user );

    this._ball.x = 100;
    this._ball.y = 100;
    this._ball.hide();
    this._ball.setStatic( true );
    this._user.vector = { radian:0, length:0 };
    this.gameWorld.wormholeBallIndicator.visible = false;
    
    if( gameStore.energy <= 0 ){
      this.changeState( StateEnum.GameOver );
    } 
  }

  public update():void{
    if( this._inputManager.isTouched ){
      this.changeState( StateEnum.Aimming );
    }
  }
}