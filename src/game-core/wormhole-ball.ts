
import { Vertex, Vector } from './interfaces'
import PhysicalBody from './physical-body'
import { World, Events, Bodies, Body } from 'matter-js'
import { Container } from 'pixi.js';

export default class WormholeBall extends PhysicalBody{

  private _vector:Vector;

  constructor( world:World ){
    super( world );
  }

  protected _initialzed():void{
    this._body.label = 'wormhole_ball';
    this.deactive();
    this.hide();
  }

  protected _generatorVertices():Vertex[]{
    return Bodies.circle( 0, 0, 5 ).vertices;
  }

  public setVector( vector:Vector ):void{
    this._vector = vector;
    this._body.isSleep = false;
    this.active();
    const targetX:number = Math.cos( vector.radian ) * vector.length / 15000;
    const targetY:number = Math.sin( vector.radian ) * vector.length / 15000;
    Body.applyForce( this._body, { x:this.x, y:this.y }, { x:targetX, y:targetY} );
  }

  public getVector():Vector{
    return this._vector;
  }
}
