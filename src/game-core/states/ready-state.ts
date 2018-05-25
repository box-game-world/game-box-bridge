import State from "./abs-state";
import GameWorld from "../game-world";
import InputManager from "../input-manager";
import { StateEnum } from "../interfaces";
import StepManager from "../step-manager";
import WormholeBall from "../wormhole-ball";
import User from "../user";

export default class ReadyState extends State{

  private _inputManager:InputManager = InputManager.getIntance();
  private _stepManager:StepManager = StepManager.getInstance();
  private _ball:WormholeBall;
  private _user:User;

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._ball = this.gameWorld.wormholeBall;
    this._user = this.gameWorld.user;
  }

  public mounted():void{
    console.log( '::: Ready state :::' );
    console.log( 'Ball : ', this._ball );
    console.log( 'User : ', this._user );
    this._ball.deactive();
    this._ball.hide();
    this._ball.x = this._user.x;
    this._ball.y = this._user.y;
    this._user.vector = { radian:0, length:0 };
  }

  public update():void{
    if( this._inputManager.isTouched ){
      this.changeState( StateEnum.Aimming );
    }
  }
}