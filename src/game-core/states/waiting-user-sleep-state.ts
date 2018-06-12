import State from "./abs-state";
import GameWorld from "../game-world";
import { StateEnum } from "../interfaces";
import User from "../user";
import StepManager from "../step-manager";
import WormholeBall from "../wormhole-ball";
import PhysicalBody from "../physical-body";
import { find } from 'lodash';
import Ground from "../ground";


export default class WaitingUserSleepState extends State{

  private _user:User;
  private _ball:WormholeBall;
  private _stepManager:StepManager;
  private _ground:Ground;
  private _waitingAni:boolean;
  
  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    super( gameWorld, changeStateCallback );
    this._user = this.gameWorld.user;
    this._ball = this.gameWorld.wormholeBall;
    this._ground = this.gameWorld.ground;
    this._stepManager = StepManager.getInstance();
  }

  public mounted():void{ 
    console.log( '::: Waiting user sleep state :::' );
    console.log( 'Ball : ', this._ball );
    console.log( 'User : ', this._user );
  }

  public update():void{
    const collisionQueue:PhysicalBody[] = this._user.collisionQueue;
    if( this._user.body.isSleeping && !this._waitingAni ){ 
      //map으로 변경
      if( !this._findCollisionTarget( collisionQueue, this._ground.body.id ) && this._findCollisionTarget( collisionQueue, this._stepManager.nextStep.body.id ) ){  
        this._waitingAni = true;
        this._stepManager.next().then( ()=>{
          this.changeState( StateEnum.Ready );
          this._waitingAni = false;
          this._user.resetCollision();
          this._stepManager.nextStep.resetCollision();
        });
      }else{
        this.changeState( StateEnum.Ready );
        this._user.resetCollision();
        this._stepManager.currentStep.resetCollision();
      }
    }
  }

  private _findCollisionTarget( queue:PhysicalBody[], id:string ):PhysicalBody{
    return find( queue, (item):boolean=>item && item.id && item.id === id);
  }
}

