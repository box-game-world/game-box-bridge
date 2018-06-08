
import { Vertex, Vector } from './interfaces'
import PhysicalBody from './physical-body'
import { World, Events, Bodies, Body, Sleeping } from 'matter-js'
import { Container } from 'pixi.js';

export default class WormholeBall extends PhysicalBody{

  private _vector:Vector;

  constructor( world:World ){
    super( world, { bodyOptions:{ isSensor:true, mass:1500, timeScale:0.9 }} );
  }

  protected _initialzed():void{
    super._initialzed();
    this._body.label = 'wormhole_ball';
  }

  protected _generatorVertices():Vertex[]{
    return Bodies.circle( 0, 0, 5 ).vertices;
  }

  public setVector( vector:Vector ):void{
    this._vector = vector;
    const targetX:number = Math.cos( vector.radian ) * vector.length;
    const targetY:number = Math.sin( vector.radian ) * vector.length;
    console.log(this.x,this.y,targetX,targetY );
    Body.applyForce( this._body, { x:this.x, y:this.y }, { x:targetX, y:targetY} );
    // Body.applyForce( this._body, { x:this.x, y:this.y }, { x:0, y:-0.001} );
  }

  public getVector():Vector{
    return this._vector;
  }
}
