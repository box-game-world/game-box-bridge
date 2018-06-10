
import { Vertex } from './interfaces'
import PhysicalBody from './physical-body'
import { World, Bodies } from 'matter-js'
import GameWorld from './game-world';

export default class Ground extends PhysicalBody{

  constructor( world:World ){
    super( world, { bodyOptions:{ isStatic:true }} );
  }

  protected _initialzed():void{
    this._body.label = 'ground';
  }

  protected _generatorVertices():Vertex[]{
    const stageSize:{ width:number, height:number } = GameWorld.GET_STAGE_SIZE();
    return Bodies.rectangle( 0, 0, stageSize.width, 80 ).vertices;
  }
}
