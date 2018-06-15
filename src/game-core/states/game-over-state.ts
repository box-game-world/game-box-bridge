import State from "./abs-state";
import GameWorld from "../game-world";
import User from "../user";
import gameStore from "../store/game-store";

export default class GameOverState extends State{
  private _user:User;

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._user = this.gameWorld.user;
  }

  public mounted():void{
    // console.log( '::: GameOver state :::' );
    // console.log( 'User : ', this._user );
    gameStore.isLiving = false;
  }

  public update():void{
  }
}