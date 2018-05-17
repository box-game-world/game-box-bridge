
import Vertex from './interfaces/vertex'
import PhysicalBody from './physical-body'
import { World } from 'matter-js'
import { random } from 'lodash'

export default class StartingMountain extends PhysicalBody{

  constructor( world:World ){
    super( world, { options:{isStatic:true}} );
  }

  protected _generatorVertices():Vertex[]{
    const width:number = 80;
    const height:number = 200;
    return [ 
      { x:0, y:0 },
      { x:width, y:random( 20, -20 ) },
      { x:width, y:height }, 
      { x:0, y:height },
    ];
  }
}