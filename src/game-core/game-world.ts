
import decomp from 'poly-decomp'
( window as any ).decomp = decomp;
import * as PIXI from 'pixi.js'
import User from './user'
import { Engine, World, Events, Body } from 'matter-js'
import PhysicalBody from './physical-body';
import InputManager from './input-manager';
import WormholeBall from './wormhole-ball';
import Ground from './ground';
import WormholeBallIndicator from './wormhole-ball-indicator';
import GameStateManager from './game-state-manager';
import StepManager from './step-manager';
import { forEach } from 'lodash';
import { TweenLite } from 'gsap';
import gameStore from './store/game-store';

const STAGE_WIDTH:number = 300;
const STAGE_HEIGHT:number = 600;

export default class GameWorld{

  private _world:World;
  private _app:PIXI.Application;
  private _objectWrapper:PIXI.Container
  private _worldEngine:Engine;
  private _user:User;
  private _ground:Ground;
  private _wormholeBall:WormholeBall;
  private _wormholeBallIndicator:WormholeBallIndicator;
  private _bodies:PhysicalBody[] = [];
  private _inputManager:InputManager;
  private _stateManager:GameStateManager;
  private _stepManager:StepManager;

  public static GET_STAGE_SIZE():{ width:number, height:number }{
    return { width:STAGE_WIDTH, height:STAGE_HEIGHT };
  }

  public get app():PIXI.Application{
    return this._app;
  }

  public get stage():PIXI.Container{
    return this._app.stage;
  }

  public get objectWrapper():PIXI.Container{
    return this._objectWrapper;
  }

  public get view():HTMLCanvasElement{
    return this._app.view;
  }

  public get user():User{
    return this._user;
  }

  public get wormholeBall():WormholeBall{
    return this._wormholeBall;
  }

  public get wormholeBallIndicator():WormholeBallIndicator{
    return this._wormholeBallIndicator;
  }

  public get ground():Ground{
    return this._ground;
  }

  constructor( { container } ){
    this.init( container );
  }

  public init( container ):void{
    gameStore.init();
    this._initWorld();
    this._initStage( container );
    this._initUser();
    this._initStepManager();
    this._initGround();
    this._initInputManager();
    this._initWormholeBall();
    this._initWormholeBallIndicator();
    this._initCollisionProcess();

    this._stateManager = GameStateManager.getInstance();
    this._stateManager.init( this );
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

    this._objectWrapper = new PIXI.Container();
    this.stage.addChild( this._objectWrapper );
  }

  private _initInputManager():void{
    this._inputManager = InputManager.getIntance();
    this._inputManager.init( { stage:this.stage, rectangle:{ x:0, y:0, width:STAGE_WIDTH, height:STAGE_HEIGHT } } );
  } 

  private _initStepManager():void{
    this._stepManager = StepManager.getInstance();
    this._stepManager.init( { world:this._world, user:this._user, stage:this.stage, rectangle:{ x:0, y:0, width:STAGE_WIDTH, height:STAGE_HEIGHT-30 }, addBody:this._addBody.bind( this) } );
  }

  private _initGround():void{
    this._ground = new Ground( this._world );
    this._addBody( this._ground );
    this._ground.leftTopX = -STAGE_WIDTH;
    this._ground.leftTopY = STAGE_HEIGHT - this._ground.height;
  }

  private _initUser():void{
    this._user = new User( this._world );
    setTimeout(()=>this._addBody( this._user ), 1 );
    
  }

  private _initWormholeBall():void{
    this._wormholeBall = new WormholeBall( this._world );
    this._wormholeBall.x = this._user.x;
    this._wormholeBall.y = this._user.y;
    this._addBody( this._wormholeBall );
  }

  private _initWormholeBallIndicator():void{
    this._wormholeBallIndicator = new WormholeBallIndicator( this._wormholeBall, { x:0, y:0, width:STAGE_WIDTH, height:STAGE_HEIGHT-this._ground.height } );
    this.stage.addChild( this._wormholeBallIndicator ); 
  }

  public _addBody( body:PhysicalBody ):void{
    this._bodies.push( body );
    this._objectWrapper.addChild( body.sprite );
  }

  public translateX( value:number ):Promise<any>{
    return new Promise( ( res )=>{
      TweenLite.to( this._objectWrapper, 0.5, { x:value, onComplete:()=>res });
    } ) 
  }

  private _update( delta:number ):void{ 
    this._stateManager.update();
    this._processUpdate();
  }

  private _processUpdate():void{
    for( let i=0, count=this._bodies.length ; i<count ; i+=1 ){
      this._bodies[ i ].update();
    }
  }

  private _initCollisionProcess():void{
    Events.on( this._worldEngine, 'collisionStart', ( event )=>{
      forEach( event.pairs, ( pair )=>{
        const bodyA:Body = pair.bodyA;
        const bodyB:Body = pair.bodyB;
        bodyA.isCollision = true;
        bodyB.isCollision = true;
        bodyA.collisionQueue.push(bodyB);
        bodyB.collisionQueue.push(bodyA);
      } )
    }); 
  }

  public destroy():void{
    this._destroyStage();
    this._destroyCollisionProcess();
    this._destroyWorld();
    this._destroyEngine();
    this._destroyInputManager();
  }

  private _destroyStage():void{
    this._app.stage.removeAllListeners();
    this._app.stage.removeChildren();
    this._app.ticker.stop();
    this._app.destroy( true );
    this._app = null;
  }

  private _destroyInputManager():void{
    this._inputManager.destroy();
  }

  private _destroyWorld():void{
    World.clear( this._world );
    this._world = null;
    this._bodies = [];
  }

  private _destroyEngine():void{
    Engine.clear( this._worldEngine );
    this._worldEngine = null;
  }

  private _destroyCollisionProcess():void{
    Events.off( this._worldEngine );
  }
}