


import * as PIXI from 'pixi.js'
import { Bodies, Body, World } from 'matter-js'
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
  }

  public update():void{
    this._updatedBefore();
    this._update();
    this._updatedAfter();
  }

  protected _preInitialze():void{

  }

  protected _initialzed():void{

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
    this._graphics.lineStyle( 1,0xdedede, 1 );
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
    this._graphics.endFill();
  }

  private _createSprite():void{
    this._sprite = new PIXI.Sprite();
    this._sprite.addChild( this._graphics );
    this._sprite.anchor.set( 0.5, 0.5 );
  }

  private _createGraphics():void{
    this._graphics = new PIXI.Graphics();
  }

  private _createBody():void{
    this._body = Bodies.fromVertices( 
      0, 0, 
      ( this._vertices ) ? this._vertices : this._generatorVertices(), 
      ( this._bodyOptions && this._bodyOptions ) ? this._bodyOptions : null );
    World.add( this._world, this.body );
  }
}