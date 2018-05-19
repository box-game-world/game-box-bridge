
import { Vertex, Vector } from './interfaces'
import PhysicalBody from './physical-body'
import { World, Events, Bodies, Body } from 'matter-js'
import { Container } from 'pixi.js';

export default class WormholeBall extends PhysicalBody{

  constructor( world:World ){
    super( world );
  }

  protected _initialzed():void{
    this._body.label = 'WormholeBall';
    this._deactive();
  }

  protected _generatorVertices():Vertex[]{
    return Bodies.circle( 0, 0, 5 ).vertices;
  }

  public setVector( vector:Vector ):void{
    this._body.isSleep = false;
    this._active();
    const targetX:number = Math.cos( vector.radian ) * vector.length / 15000;
    const targetY:number = Math.sin( vector.radian ) * vector.length / 15000;
    Body.applyForce( this._body, { x:this.x, y:this.y }, { x:targetX, y:targetY} );
  }

  private _deactive():void{
    Body.setStatic( this._body, true );
    this._body.isSensor = true;
  }

  private _active():void{
    Body.setStatic( this._body, false );
    this._body.isSensor = false;
  }
}
