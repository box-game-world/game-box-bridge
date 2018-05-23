
import decomp from 'poly-decomp'
( window as any ).decomp = decomp;
import * as PIXI from 'pixi.js'
import Mountain from './mountain'
import User from './user'
import StartingBlock from './starting-block'
import { Engine, World, Bodies, Events, Body } from 'matter-js'
import PhysicalBody from './physical-body';
import InputManager from './input-manager';
import WormholeBall from './wormhole-ball';
import GameStatus from './game-status';
import Ground from './ground';
import GameConfig from './game-config';
import WormholeBallIndicator from './wormhole-ball-indicator';
import State from './states/abs-state';
import ReadyState from './states/ready-state';
import GameStateManager from './game-state-manager';

const STAGE_WIDTH:number = 300;
const STAGE_HEIGHT:number = 600;

export default class GameWorld{

  private _world:World;
  private _app:PIXI.Application;
  private _worldEngine:Engine;
  private _user:User;
  private _mountain:Mountain;
  private _mountain2:Mountain;
  private _ground:Ground;
  private _wormholeBall:WormholeBall;
  private _wormholeBallIndicator:WormholeBallIndicator;
  private _bodies:PhysicalBody[] = [];
  private _inputManager:InputManager;
  private _stateManager:GameStateManager;

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
    this._initWorld();
    this._initStage( container );
    this._initInputManager();
    this._initGround();
    this._initMountain();
    this._initWormholeBall();
    this._initWormholeBallIndicator();
    this._initUser();
    this._initCollisionProccess();

    this._stateManager = GameStateManager.getInstance();
    this._stateManager.init( this );
  }

  private _initWorld():void{
    this._worldEngine = Engine.create();
    // this._worldEngine.enableSleeping = true;
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
    // this._inputManager = new InputManager( { stage:this.stage, rectangle:{ x:0, y:0, width:STAGE_WIDTH, height:STAGE_HEIGHT } } );
    this._inputManager = InputManager.getIntance();
    this._inputManager.init( { stage:this.stage, rectangle:{ x:0, y:0, width:STAGE_WIDTH, height:STAGE_HEIGHT } } );
  } 

  private _initGround():void{
    this._ground = new Ground( this._world );
    this._addBody( this._ground );
    this._ground.leftTopX = 0;
    this._ground.leftTopY = STAGE_HEIGHT - this._ground.height;
  }

  private _initUser():void{
    this._user = new User( this._world );
    this._user.x = this._mountain.x; 
    this._user.y = 100;
    this._addBody( this._user );
  }

  private _initWormholeBall():void{
    this._wormholeBall = new WormholeBall( this._world );
    this._wormholeBall.x = this._mountain.x;
    this._wormholeBall.y = this._mountain.leftTopY - ( this._wormholeBall.height/2 );
    this._addBody( this._wormholeBall );
  }

  private _initWormholeBallIndicator():void{
    this._wormholeBallIndicator = new WormholeBallIndicator( this._wormholeBall, { x:0, y:0, width:STAGE_WIDTH, height:STAGE_HEIGHT-this._ground.height } );
    this.stage.addChild( this._wormholeBallIndicator ); 
  }

  private _initMountain():void{
    this._mountain = new Mountain( this._world, true );
    this._mountain.leftTopX = 30;
    this._mountain.leftTopY = this._ground.leftTopY - this._mountain.height;
    this._addBody( this._mountain );

    this._mountain2 = new Mountain( this._world, true );
    this._mountain2.leftTopX = STAGE_WIDTH - this._mountain2.width - 30;
    this._mountain2.leftTopY = this._ground.leftTopY - this._mountain2.height;
    this._addBody( this._mountain2 );
  }

  private _addBody( body:PhysicalBody ):void{
    this._bodies.push( body );
    this.stage.addChild( body.sprite );
  }

  private _update( delta:number ):void{ 
    this._stateManager.update();
    this._proccessUpdate();
    // this._proccessGameStatus();
    // if( GameStatus.IS_SHOOTING && this._wormholeBall.y > STAGE_HEIGHT-this._ground.height- this._wormholeBall.height){
    //   GameStatus.IS_SHOOTING = false;
    //   GameStatus.AVAILABLE_DRAG = true;
    //   this._wormholeBall.x = this._user.x;
    //   this._wormholeBall.y = this._user.y - 10;
    // }
  }
  
  private _proccessGameStatus():void{
    if( GameStatus.IS_FIRE && !GameStatus.IS_SHOOTING ){
      this._wormholeBall.x = this._user.x;
      this._wormholeBall.y = this._user.y - 10;
      this._wormholeBall.setVector( this._inputManager.vector );
      this._wormholeBall.show();
      GameStatus.IS_SHOOTING = true;
      GameStatus.IS_FIRE = false;
    }

    if( !GameStatus.IS_SHOOTING ){
      this._wormholeBall.hide();
    }
  }

  private _proccessUpdate():void{
    for( let i=0, count=this._bodies.length ; i<count ; i+=1 ){
      this._bodies[ i ].update();
    }
  }

  private _initCollisionProccess():void{
    const proccessMap:any = this._callisionProccessMap();

    Events.on( this._worldEngine, 'collisionStart', ( event )=>{
      if( event.pairs.length ){
        const pair:any = event.pairs[ 0 ];
        const bodyA:Body = pair.bodyA;
        const bodyB:Body = pair.bodyB;
        bodyA.isCollision = true;
        bodyB.isCollision = true;
        bodyA.collisionTarget = bodyB;
        bodyB.collisionTarget = bodyA;
        // const proccessA:Function = proccessMap[ bodyA.label ]
        
        // const proccessB:Function = proccessMap[ bodyB.label ]
        // if( proccessA ){ proccessA( pair.bodyB, event  );  }
        // if( proccessB ){ proccessB( pair.bodyA, event  );  }
      }
    }); 
  }

  private _callisionProccessMap():any{
    return {
      [this._wormholeBall.label]:( target:Body, event )=>{
        if( target.label === 'mountain' || target.label === 'ground' ){
          this._wormholeBall.deactive();
          this._user.x = this._wormholeBall.x;
          this._user.y = this._wormholeBall.y-10;
        }
        GameStatus.IS_SHOOTING = false;
        GameStatus.AVAILABLE_DRAG = true;
      }
    }
  }
}