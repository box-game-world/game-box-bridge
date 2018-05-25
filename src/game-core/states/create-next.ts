import State from "./abs-state";
import GameWorld from "../game-world";
import { StateEnum } from "../interfaces";
import User from "../user";
import WormholeBall from "../wormhole-ball";


export default class CreateNextState extends State{

  private _user:User;
  private _ball:WormholeBall;

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._user = this.gameWorld.user;
    this._ball = this.gameWorld.wormholeBall;
  }

  public mounted():void{
    console.log( '::: Create next state :::' );
    console.log( 'Ball : ', this._ball );
    console.log( 'User : ', this._user );
  }

  public update():void{
  }
}