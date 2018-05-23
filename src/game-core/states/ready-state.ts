import State from "./abs-state";
import GameWorld from "../game-world";
import InputManager from "../input-manager";
import { StateEnum } from "../interfaces";

export default class ReadyState extends State{

  private _inputManager:InputManager = InputManager.getIntance();

  constructor( gameWorld:GameWorld, changeCallback:Function ){
    super( gameWorld, changeCallback );
  }

  public update():void{
    if( this._inputManager.isTouched ){
      this.changeCallback( StateEnum.Aimming );
    }
  }
}