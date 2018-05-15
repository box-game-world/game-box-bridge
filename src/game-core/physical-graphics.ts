


import * as PIXI from 'pixi.js'
import { Bodies } from 'matter-js'
import Vertex from './interfaces/vertex'

( window as any ).B = Bodies;
export default abstract class PhysicalGraphics extends PIXI.Graphics{

  protected _vertices:Vertex[] = [];
  protected _bodies:Bodies;
  protected _options:any;

  public get vertices():Vertex[]{
    return this._vertices;
  }

  constructor( options?:any ){
    super();
    this._options = options;
  }

  public createBodies():Bodies{
    
    this._vertices = this._generatorVertices();
    this._bodies = Bodies.fromVertices( this.x, this.y, this._vertices, this._options );
    this._drawBefore( this._vertices );
    this._draw( this._vertices );
    this._drawAfter( this._vertices );
    return this._bodies;
  }

  protected abstract _generatorVertices():Vertex[];
  
  protected _drawBefore( vertices:Vertex[] ):void{
    this.clear();
    this.beginFill(0xe4e1ed);
    this.lineStyle( 1,0x000000, 1 );
  }

  protected _draw( vertices:Vertex[] ):void{
    let i:number = 0;
    const firstVertex:Vertex = vertices[ i ];
    this.moveTo( firstVertex.x, firstVertex.y );
    i++;
    for( const count:number = vertices.length ; i<count ; i+=1  ){
      const vertext:Vertex = vertices[ i ];
      this.lineTo( vertext.x, vertext.y );
    }
    this.closePath();
  };

  protected _drawAfter( vertices:Vertex[] ):void{
    this.endFill();
  }
  
  

  protected _updatedBefore():void{
    
  }

  protected _update():void{
    const position:Vertex = this._bodies.position;
    this.x = position.x;
    this.y = position.y;
    this.rotation = this._bodies.angle;
  }

  protected _updatedAfter():void{
    this.endFill();
  }

  

  public update():void{
    this._updatedBefore();
    this._update();
    this._updatedAfter();
  }
}