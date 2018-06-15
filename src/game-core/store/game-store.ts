

import { observable, computed, action } from 'mobx';
import { StateEnum } from '../interfaces';

export class GameStore{
  private static _instance:GameStore;
  
  @observable
  private _energy:number;

  @observable
  private _maxEnergy:number;

  @observable
  private _step:number;

  @observable
  private _state:StateEnum;

  @observable
  private _isLiving:boolean;

  public static getInstance():GameStore{
    return this._instance || ( this._instance = new this() );
  }

  @computed
  public get energy():number{
    return this._energy;
  }

  @computed
  public get maxEnergy():number{
    return this._maxEnergy;
  }

  @computed
  public get step():number{
    return this._step;
  }

  @computed
  public get state():StateEnum{
    return this._state;
  }

  @computed
  public get isLiving():boolean{
    return this._isLiving;
  }

  public set isLiving( value:boolean){
    this._isLiving = value;
  }

  private constructor(){
    this.init();
  }

  @action
  public init():void{
    this._energy = 1000;
    this._maxEnergy = 1000;
    this._step = 0;
    this._isLiving = true;
  }

  @action
  public chargeEnergy( value:number ):void{
    this._energy = this._energy + value > this._maxEnergy ? this._maxEnergy : this._energy + value;
  }

  @action
  public consumeEnergy( value:number ):void{
    this._energy = this._energy - value < 0 ? 0 : this._energy - value
  }

  @action
  public nextStep():void{
    this._step++;
  }

  @action
  public changeState( state:StateEnum ):void{
    this._state = state;
  }
}

export default GameStore.getInstance();

