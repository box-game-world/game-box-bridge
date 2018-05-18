
import decomp from 'poly-decomp'
( window as any ).decomp = decomp;
import * as PIXI from 'pixi.js'
import Mountain from './mountain'
import User from './user'
import StartingBlock from './starting-block'
import { Engine, World, Bodies, Events } from 'matter-js'
import PhysicalBody from './physical-body';
import InputManager from './input-manager';

const STAGE_WIDTH:number = 300;
const STAGE_HEIGHT:number = 600;

export default class GameWorld{

  private _world:World;
  private _app:PIXI.Application;
  private _worldEngine:Engine;
  private _user:User;
  private _mountain:Mountain;
  private _bodies:PhysicalBody[] = [];
  private _inputManager:InputManager;

  public static GET_STAGE_SIZE():{ width:number, height:number }{
    return { width:STAGE_WIDTH, height:STAGE_HEIGHT };
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
    this._initWorld();
    this._initStage( container );
    this._initInputManager();
    this._initMountain();
    this._initUser();
  }

  private _initWorld():void{
    this._worldEngine = Engine.create();
    this._worldEngine.enableSleeping = true;
    this._world = this._worldEngine.world;
    Engine.run( this._worldEngine );
  }

  private _initStage( container ):void{
    this._app = new PIXI.Application( STAGE_WIDTH, STAGE_HEIGHT, { antialias:false, backgroundColor:0xffffff, resolution:2 } );
    const style:CSSStyleDeclaration = this._app.view.style;
    style.width = style.height = '100%';
    container.appendChild( this._app.view );
    this.stage.width = STAGE_WIDTH;
    this.stage.height = STAGE_HEIGHT;
    this.app.ticker.add( this._update.bind( this ) ); 
  }

  private _initInputManager():void{
    this._inputManager = new InputManager( { stage:this.stage, rectangle:{ x:0, y:0, width:STAGE_WIDTH, height:STAGE_HEIGHT } } );
  } 

  private _initUser():void{
    this._user = new User( this._world );
    this._user.x = this._mountain.x; 
    this._user.y = 100;
    this._addBody( this._user );
  }

  private _initMountain():void{
    this._mountain = new Mountain( this._world, true );
    this._mountain.leftTopX = 10;
    this._mountain.leftTopY = STAGE_HEIGHT - this._mountain.height - 100;
    this._addBody( this._mountain );
  }


  private _addBody( body:PhysicalBody ):void{
    this._bodies.push( body );
    this.stage.addChild( body.sprite );
  }

  private _update( delta:number ):void{ 
    for( let i=0, count=this._bodies.length ; i<count ; i+=1 ){
      this._bodies[ i ].update();
    }
  }
}