
import decomp from 'poly-decomp'
( window as any ).decomp = decomp;
import * as PIXI from 'pixi.js'
import Mountain from './mountain'
import User from './user'
import {Engine, Render, World, Bodies } from 'matter-js'





export default class GameWorld{

  private static _WIDTH:number = 600;
  private static _HEIGHT:number = 1200;

  private _app:PIXI.Application;
  private _matterEngine:Engine;
  private _matterRender:Render;
  private _user:User;
  private _mountain:Mountain;

  /*
  private _g1:PIXI.Graphics;
  private _g2:PIXI.Graphics;
  private _b1:Bodies;
  private _b2:Bodies;
  */

  public static GET_STAGE_SIZE():{ width:number, height:number }{
    return { width:GameWorld._WIDTH, height:GameWorld._HEIGHT };
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
    this._app = new PIXI.Application( GameWorld._WIDTH, GameWorld._HEIGHT, { antialias:false, backgroundColor:0xffffff} );
    const style:CSSStyleDeclaration = this._app.view.style;
    style.width = style.height = '100%';
    container.appendChild( this._app.view );
    
    this._user = new User();
    this._user.x = 20;
    this._user.y = 30;
    this.addChild( this._user );
    
    World.add( this._matterEngine.world, [ this._user.createBodies() ]);
    Engine.run( this._matterEngine );
    this.app.ticker.add( this.update.bind( this ) ); 

   
    /*
    this._g1 = new PIXI.Graphics();
    this._g2 = new PIXI.Graphics();
    this._b1 =  Bodies.fromVertices(200, 100, [ 
      { x:0, y:0},
      { x:100, y:0},
      { x:100, y:100},
      { x:0, y:100},
    ] );
    this._b2 =  Bodies.rectangle(0, 800, 1000, 30, { isStatic:true });
    console.log( this._b1 )
    this.addChild( this._g1 );
    this.addChild( this._g2 );

    this._matterEngine = Engine.create();
    
    World.add( this._matterEngine.world, [ this._b1, this._b2 ]);
    Engine.run( this._matterEngine );
    console.log( this._b1 )
    this.app.ticker.add( this.update.bind( this ) );
    */

   
  
  }

  addChild( child:PIXI.DisplayObject ):void{
    this.stage.addChild( child );
  }

  update( delta:number ):void{ 
    this._user.update();
    
    /*
    this._g1.clear();
    this._g1.beginFill(0xe4e1ed);
    this._g1.moveTo( this._b1.vertices[ 0 ].x, this._b1.vertices[ 0 ].y );
    this._g1.lineTo( this._b1.vertices[ 1 ].x, this._b1.vertices[ 1 ].y );
    this._g1.lineTo( this._b1.vertices[ 2 ].x, this._b1.vertices[ 2 ].y );
    this._g1.lineTo( this._b1.vertices[ 3 ].x, this._b1.vertices[ 3 ].y );
    this._g1.endFill();

    this._g2.clear();
    this._g2.beginFill(0xe4e1ed);
    this._g2.moveTo( this._b2.vertices[ 0 ].x, this._b2.vertices[ 0 ].y );
    this._g2.lineTo( this._b2.vertices[ 1 ].x, this._b2.vertices[ 1 ].y );
    this._g2.lineTo( this._b2.vertices[ 2 ].x, this._b2.vertices[ 2 ].y );
    this._g2.lineTo( this._b2.vertices[ 3 ].x, this._b2.vertices[ 3 ].y );
    this._g2.endFill();
    */
  }
}