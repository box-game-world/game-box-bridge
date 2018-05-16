
import Vertex from './interfaces/vertex'
import PhysicalBody from './physical-body'
import { World, Events } from 'matter-js'

export default class User extends PhysicalBody{

  constructor( world:World ){
    super( world );
  }

  protected _generatorVertices():Vertex[]{
    const width:number = 20;
    const height:number = 20;
    return [
      { x:0, y:0 },
      { x:width, y:0 },
      { x:width, y:height }, 
      { x:0, y:height },
    ];
  }
}