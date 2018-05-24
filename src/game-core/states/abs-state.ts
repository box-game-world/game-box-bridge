import GameWorld from "../game-world";


export default abstract class State {
  private _gameWorld:GameWorld;
  private _changeStateCallback:Function; 

  public get gameWorld():GameWorld{
    return this._gameWorld;
  }

  public get changeState():Function{
    return this._changeStateCallback;
  }

  public mounted():void{

  }

  public destroyed():void{
    
  }

  constructor( gameWorld:GameWorld, changeStateCallback:Function ){
    this._gameWorld = gameWorld;
    this._changeStateCallback = changeStateCallback;
  }

  public abstract update():void;
}