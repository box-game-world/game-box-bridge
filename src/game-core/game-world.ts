
import * as PIXI from 'pixi.js'
import Mountain from './mountain';

export default class GameWorld{

  private static _WIDTH:number;
  private static _HEIGHT:number;

  private _app:PIXI.Application;

  public static GET_STAGE_SIZE():{ width:number, height:number }{
    return { width:GameWorld._WIDTH, height:GameWorld._HEIGHT };
  }

  constructor( { container, width, height } ){
    GameWorld._WIDTH = width;
    GameWorld._HEIGHT = height;
    this._app = new PIXI.Application( width, height, { antialias:false, transparent:true } );
    container.appendChild( this._app.view );

    const graphics:PIXI.Graphics = new PIXI.Graphics();

    this._app.stage.addChild( graphics );

    const mountain:Mountain = new Mountain();
    this._app.stage.addChild( mountain );
    mountain.x = width - mountain.width;
    mountain.y = height - mountain.height;
  }
}