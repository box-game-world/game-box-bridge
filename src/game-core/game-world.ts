
import decomp from 'poly-decomp'
( window as any ).decomp = decomp;
import * as PIXI from 'pixi.js'
import Mountain from './mountain'
import User from './user'
import StartingBlock from './starting-block'
import { Engine, World, Bodies, Events } from 'matter-js'
import PhysicalBody from './physical-body';
import InputManager from './input-manager';

export default class GameWorld{

  private static BASE_WIDTH:number = 300;
  private static BASE_HEIGHT:number = 600;

  // private static RESOLUTION_WIDTH:number = 900;
  // private static RESOLUTION_HEIGHT:number = 1800;

  // private static STAGE_RATIO_WIDTH = GameWorld.RESOLUTION_WIDTH / GameWorld.BASE_WIDTH;
  // private static STAGE_RATIO_HEIGHT = GameWorld.RESOLUTION_HEIGHT / GameWorld.BASE_HEIGHT;

  private _world:World;
  private _app:PIXI.Application;
  private _worldEngine:Engine;
  private _user:User;
  private _mountain:Mountain;
  private _bodies:PhysicalBody[] = [];

  private _gameLayer:PIXI.DisplayObject;
  private _eventLayer:PIXI.DisplayObject;
  private _bgLayer:PIXI.DisplayObject;



  public static GET_STAGE_SIZE():{ width:number, height:number }{
    return { width:GameWorld.BASE_WIDTH, height:GameWorld.BASE_HEIGHT };
  }

  public get app():PIXI.Application{
    return this._app;
  }

  public get stage():PIXI.Container{
    return this._app.stage;
  }

  public get view():HTMLCanvasElement{
    return this._app.view;
  }

  constructor( { container } ){
    this._worldEngine = Engine.create();
    this._worldEngine.enableSleeping = true;
    this._world = this._worldEngine.world;
    this._app = new PIXI.Application( GameWorld.BASE_WIDTH, GameWorld.BASE_HEIGHT, { antialias:false, backgroundColor:0xffffff, resolution:2 } );
    const style:CSSStyleDeclaration = this._app.view.style;
    // this.stage.scale.x = GameWorld.STAGE_RATIO_WIDTH;
    // this.stage.scale.y = GameWorld.STAGE_RATIO_HEIGHT;
    style.width = style.height = '100%';
    container.appendChild( this._app.view );
    this.stage.width = GameWorld.BASE_WIDTH;
    this.stage.height = GameWorld.BASE_HEIGHT;

    new InputManager( { stage:this.stage, rectangle:{ x:0, y:0, width:GameWorld.BASE_WIDTH, height:GameWorld.BASE_HEIGHT } } );
  

    this._mountain = new Mountain( this._world, true );
    this._mountain.leftTopX = 10;
    this._mountain.leftTopY = GameWorld.BASE_HEIGHT - this._mountain.height - 100;
    this.addBody( this._mountain );

    this._user = new User( this._world );
    this._user.x = this._mountain.x; 
    this._user.y = 100;
    this.addBody( this._user );

    Engine.run( this._worldEngine );
    this.app.ticker.add( this.update.bind( this ) ); 

    /*
    Events.on( this._worldEngine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      for( let i=0, count=pairs.length ; i<count ; i+=1 ){
        const p = pairs[i];
        const bodyA = p.bodyA;
        const bodyB = p.bodyB;
      } 
    });
    */
  }

  addBody( body:PhysicalBody ):void{
    this._bodies.push( body );
    this.stage.addChild( body.sprite );
  }

  update( delta:number ):void{ 
    for( let i=0, count=this._bodies.length ; i<count ; i+=1 ){
      this._bodies[ i ].update();
    }
  }
}