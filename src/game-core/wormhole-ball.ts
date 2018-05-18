
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
    Body.setStatic( this._body, true );
    setTimeout( ()=>{
      Body.setStatic( this._body, false );
      Body.applyForce( this._body, { x:this.x, y:this.y }, { x:0.0000000000001, y:0.0000000000001} );
    },3000 )
  }

  protected _generatorVertices():Vertex[]{
    return Bodies.circle( 0, 0, 10 ).vertices;
  }
}
