import State from "./abs-state";
import GameWorld from "../game-world";
import User from "../user";

export default class GameOverState extends State{
  private _user:User;

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._user = this.gameWorld.user;
  }

  public mounted():void{
    // console.log( '::: GameOver state :::' );
    // console.log( 'User : ', this._user );
  }

  public update():void{
  }
}