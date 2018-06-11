

import { observable, computed, action } from 'mobx';

export class GameStore{
  private static _instance:GameStore;
  
  @observable
  private _energy:number = 1000;

  @observable
  private _maxEnergy:number = 1000;

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

  private constructor(){
  }

  @action
  public chargeEnergy( value:number ):void{
    this._energy = this._energy + value > this._maxEnergy ? this._maxEnergy : this._energy + value;
  }

  @action
  public consumeEnergy( value:number ):void{
    this._energy = this._energy - value < 0 ? 0 : this._energy - value
  }
}

export default GameStore.getInstance();

