import GameWorld from "../game-world";


export default abstract class State {
  private _gameWorld:GameWorld;
  private _changeCallback:Function; 

  public get gameWorld():GameWorld{
    return this._gameWorld;
  }

  public get changeCallback():Function{
    return this._changeCallback;
  }

  constructor( gameWorld:GameWorld, changeCallback:Function ){
    this._gameWorld = gameWorld;
    this._changeCallback = changeCallback;
  }

  public abstract update():void;
}