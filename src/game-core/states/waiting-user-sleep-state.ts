import State from "./abs-state";
import GameWorld from "../game-world";
import { StateEnum } from "../interfaces";
import User from "../user";
import StepManager from "../step-manager";
import WormholeBall from "../wormhole-ball";


export default class WaitingUserSleepState extends State{

  private _user:User;
  private _ball:WormholeBall;
  private _stepManager:StepManager;
  private _waitingAni:boolean;
  
  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._user = this.gameWorld.user;
    this._ball = this.gameWorld.wormholeBall;
    this._stepManager = StepManager.getInstance();
  }

  public mounted():void{
    console.log( '::: Waiting user sleep state :::' );
    console.log( 'Ball : ', this._ball );
    console.log( 'User : ', this._user );
  }

  public update():void{
    if( this._user.isCollision && this._user.collisionTarget.label === 'ground' ){
      console.log( 'game over' );
    }else{
      if( this._user.body.isSleeping && !this._waitingAni){
        if( this._user.collisionTarget === this._stepManager.nextStep.body ){
          this._waitingAni = true;
          this._stepManager.next().then( ()=>{
            this.changeState( StateEnum.Ready );
            this._waitingAni = false;
          });
        }else{
          this.changeState( StateEnum.Ready );
        }
      }
    }
  }
}