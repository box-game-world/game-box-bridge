import State from "./abs-state";
import GameWorld from "../game-world";
import { StateEnum } from "../interfaces";
import User from "../user";


export default class CreateNextState extends State{

  private _user:User;
  
  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._user = this.gameWorld.user;
  }

  public mounted():void{
    console.log( '??@@' );
  }

  public update():void{
  }
}