import State from "./abs-state";
import GameWorld from "../game-world";
import gameStore from "../store/game-store";

export default class GameOverState extends State{

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
  }

  public mounted():void{
    // console.log( '::: GameOver state :::' );
    // console.log( 'User : ', this._user );
    gameStore.end();
  }

  public update():void{
  }
}