
import decomp from 'poly-decomp'
( window as any ).decomp = decomp;
import * as PIXI from 'pixi.js'
import Mountain from './mountain'
import User from './user'
import StartingBlock from './starting-block'
import { Engine, World, Bodies, Events } from 'matter-js'
import PhysicalBody from './physical-body';

export default class GameWorld{

  private static BASE_WIDTH:number = 300;
  private static BASE_HEIGHT:number = 600;

  private static RESOLUTION_WIDTH:number = 900;
  private static RESOLUTION_HEIGHT:number = 1800;

  private static STAGE_RATIO_WIDTH = GameWorld.RESOLUTION_WIDTH / GameWorld.BASE_WIDTH;
  private static STAGE_RATIO_HEIGHT = GameWorld.RESOLUTION_HEIGHT / GameWorld.BASE_HEIGHT;

  private _world:World;
  private _app:PIXI.Application;
  private _matterEngine:Engine;
  private _user:User;
  private _user2:User; 
  private _startingBlock:StartingBlock;
  private _mountain:Mountain;
  private _bodies:PhysicalBody[] = [];


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
    this._matterEngine = Engine.create();
    this._world = this._matterEngine.world;
    this._app = new PIXI.Application( GameWorld.RESOLUTION_WIDTH, GameWorld.RESOLUTION_HEIGHT, { antialias:false, backgroundColor:0xffffff} );
    const style:CSSStyleDeclaration = this._app.view.style;
    this.stage.scale.x = GameWorld.STAGE_RATIO_WIDTH;
    this.stage.scale.y = GameWorld.STAGE_RATIO_HEIGHT;
    style.width = style.height = '100%';
    container.appendChild( this._app.view );

    this._user = new User( this._world );
    this._user.x = 50;
    this._user.y = 200;
    this.addBody( this._user );

    // this._user2 = new User( this._world );
    // this._user2.x = 50;
    // this._user2.y = 200;
    // this.addBody( this._user2 );
    
    this._startingBlock = new StartingBlock( this._world );
    this._startingBlock.x = 50;
    this._startingBlock.y = 500;
    this.addBody( this._startingBlock );

    Engine.run( this._matterEngine );
    this.app.ticker.add( this.update.bind( this ) ); 
    
    Events.on( this._matterEngine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      for( let i=0, count=pairs.length ; i<count ; i+=1 ){
        const p = pairs[i];
        const bodyA = p.bodyA;
        const bodyB = p.bodyB;
        console.log( bodyA, bodyB );
      } 
  });
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