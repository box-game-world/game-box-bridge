


import * as PIXI from 'pixi.js'
import { Bodies, Body, World } from 'matter-js'
import Vertex from './interfaces/vertex'

export default class PhysicalBody{

  protected _sprite:PIXI.Sprite;
  protected _graphics:PIXI.Graphics;
  protected _body:Body;
  protected _options:any;

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

  constructor( world:World, config?:{ vertices?:Vertex[], options?:any } ){
    this._sprite = new PIXI.Sprite();
    this._graphics = new PIXI.Graphics();
    this._sprite.addChild( this._graphics );
    this._sprite.anchor.set( 0.5, 0.5 );
    this._body = Bodies.fromVertices( 
      0, 0, 
      ( config && config.vertices ) ? config.vertices : this._generatorVertices(), 
      ( config && config.options ) ? config.options : null );

    
    World.add( world, this.body );
    this._render();
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
    // this.beginFill(0xf1f1f1);
    this._graphics.lineStyle( 1,0xaaaaaa, 1 );
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

  public update():void{
    this._updatedBefore();
    this._update();
    this._updatedAfter();
  }
}