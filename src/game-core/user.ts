
import { Vertex } from './interfaces'
import PhysicalBody from './physical-body'
import { World, Events } from 'matter-js'

export default class User extends PhysicalBody{

  constructor( world:World ){
    super( world );
  }

  protected _initialzed():void{
    this._body.label = 'User';
  }

  protected _generatorVertices():Vertex[]{
    const width:number = 10;
    const height:number = 10;
    return [
      { x:0, y:0 },
      { x:width, y:0 },
      { x:width, y:height }, 
      { x:0, y:height },
    ];
  }

  protected _updatedAfter():void{
    super._updatedAfter();
  }
}