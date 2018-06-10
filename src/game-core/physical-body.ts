


import * as PIXI from 'pixi.js'
import { Bodies, Body, World, Sleeping } from 'matter-js'
import { Vertex } from './interfaces'

export default class PhysicalBody{

  protected _world:World;
  protected _config:{ vertices?:Vertex[], bodyOptions?:any, ptions?:any };
  protected _vertices:Vertex[]|undefined;
  protected _bodyOptions:any;
  protected _options:any;
  protected _sprite:PIXI.Sprite;
  protected _graphics:PIXI.Graphics;
  protected _body:Body;
  protected _isInitialize:boolean = false;
  protected _addedToWorld:boolean = false;


  /*
  matterjs 내부에서 body 객체의 isStatic 속성을 true로 변경할 때
  mass, destiny, inertia 속성을 Infinity로 변경한다.
  
  이런 과정은 차후 isStatic 속성을 false로 변경할 때 중력을 적용하는 과정에서 ( Engine._bodiesApplyGravity )
  force 계산 결과가 NaN을 유발할 수 있다.
  
  force 속성은 body객체의 포지션을 비롯해 여러 속성을 계산함에 있어 기저가 되기 때문에 오작동을 유발할 가능성이 높다.

  다음과 같이 body객체 생성 후 정상적인 숫자형 데이터를 캐싱해 
  isStatic이 변경되는 시점에 재할당 해준다.
  */
  protected _cacheMass:number;
  protected _cacheDensity:number;
  protected _cacheInertia:number;

  public get label():string{
    return this._body.label;
  }

  public get sprite():PIXI.Sprite{
    return this._sprite;
  }

  public get graphics():PIXI.Graphics{
    return this._graphics;
  }

  public get body():Body{
    return this._body;
  }

  public set x( value:number ){
    Body.setPosition( this._body, { x:value, y:this.y } );
  }

  public get x():number{
    return this._body.position.x;
  }

  public set y( value:number ){
    Body.setPosition( this._body, { x:this.x, y:value } );
  }

  public get y():number{
    return this._body.position.y;
  }

  public get width():number{
    return this._graphics.width;
  }

  public get height():number{
    return this._graphics.height;
  }

  public set leftTopX( value:number ){
    this.x = this.width/2+value;
  }

  public get leftTopX():number{
    return this.x - ( this.width/2 );
  }

  public set leftTopY( value:number ){
    this.y = this.height/2+value;
  }

  public get leftTopY():number{
    return this.y - ( this.height/2 );
  }

  public get isInitialized():boolean{
    return this._isInitialize;
  }

  public get isCollision():boolean{
    return this._body.isCollision;
  }

  public get collisionQueue():Body{
    return this._body.collisionQueue;
  }

  constructor( world:World, config?:{ vertices?:Vertex[], bodyOptions?:any, options?:any } ){
    this._world = world;
    if( config ){
      this._vertices = config.vertices;
      this._bodyOptions = config.bodyOptions;
      this._options = config.options;
    }
    this._preInitialze();
    this._createGraphics();
    this._createSprite();
    this._createBody();
    this._render();
    this._isInitialize = true;
    this._initialzed();
    this.resetCollision();
  }

  public update():void{
    this._updatedBefore(); 
    this._update();
    this._updatedAfter();
  }

  public show():void{
    this._sprite.visible = true;
    this.addToWorld();
  }

  public hide():void{
    this._sprite.visible = false;
    this.removeToWorld();
  }

  public addToWorld():void{
    this._addedToWorld = true;
    World.add( this._world, this.body );
  }

  public removeToWorld():void{
    console.log( 'removeToWorld', this );
    this._addedToWorld = false;
    World.remove( this._world, this.body );
  }

  public wakeup():void{
    Body.set( this._body, { isSleeping:false} );
  }

  public sleep():void{
    Body.set( this._body, { isSleeping:true} );
  }

  public setStatic( value:boolean ):void{
    Body.set( this._body, { 
      isStatic:value,
      mass:this._cacheMass,
      density:this._cacheDensity,
      inertia:this._cacheInertia,
    } );
  }

  public resetCollision():void{
    this._body.isCollision = false;
    this._body.collisionQueue = [];
  }

  protected _preInitialze():void{

  }

  protected _initialzed():void{
    this._cacheMass = this._body.mass;
    this._cacheDensity = this._body.density;
    this._cacheInertia = this._body.inertia;
  }

  protected _generatorVertices():Vertex[]{
    return [];
  }

  protected _render():void{
    const vertices:Vertex[] = this._body.vertices;
    this._drawPathBefore( vertices );
    this._drawPath( vertices );
    this._drawPathAfter( vertices );
  }
  
  protected _drawPathBefore( vertices:Vertex[] ):void{
    this._graphics.clear(); 
    this._graphics.beginFill(0xffffff);
    this._graphics.lineStyle( 1, 0, 1 );
  }

  protected _drawPath( vertices:Vertex[] ):void{
    let i:number = 0;
    const firstVertex:Vertex = vertices[ i ];
    this._graphics.moveTo( firstVertex.x, firstVertex.y );
    i++;
    for( const count:number = vertices.length ; i<count ; i+=1  ){
      const vertext:Vertex = vertices[ i ];
      this._graphics.lineTo( vertext.x, vertext.y );
    }
    this._graphics.closePath();
  };

  protected _drawPathAfter( vertices:Vertex[] ):void{
    this._graphics.endFill();
  }
  
  protected _updatedBefore():void{
  }

  protected _update():void{
    const position:Vertex = this._body.position;
    this._sprite.x = position.x;
    this._sprite.y = position.y;
    this._sprite.rotation = this._body.angle;
  }

  protected _updatedAfter():void{
  }

  protected _createBody():void{
    this._body = Bodies.fromVertices( 
      0, 0, 
      ( this._vertices ) ? this._vertices : this._generatorVertices(), 
      ( this._bodyOptions && this._bodyOptions ) ? this._bodyOptions : null );
    this.addToWorld();
  }

  private _createSprite():void{
    this._sprite = new PIXI.Sprite();
    this._sprite.addChild( this._graphics );
    this._sprite.anchor.set( 0.5, 0.5 );
  }

  private _createGraphics():void{
    this._graphics = new PIXI.Graphics();
  }
}