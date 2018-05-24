import State from "./abs-state";
import GameWorld from "../game-world";
import InputManager from "../input-manager";
import { StateEnum } from "../interfaces";
import StepManager from "../step-manager";

export default class ReadyState extends State{

  private _inputManager:InputManager = InputManager.getIntance();
  private _stepManager:StepManager = StepManager.getInstance();

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
  }

  public mounted():void{
  }

  public update():void{
    if( this._inputManager.isTouched ){
      this.changeState( StateEnum.Aimming );
    }
  }
}