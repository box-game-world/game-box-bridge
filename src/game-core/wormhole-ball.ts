
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
  }

  protected _generatorVertices():Vertex[]{
    return Bodies.circle( 0, 0, 10 ).vertices;
  }
}
