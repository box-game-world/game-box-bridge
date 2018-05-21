
import { Vertex } from './interfaces'
import PhysicalBody from './physical-body'
import { World } from 'matter-js'
import { random } from 'lodash'

export default class Mountain extends PhysicalBody{

  private _isFlat:boolean;
  private _widthRange:number[];
  private _heightRange:number[];
  private _diffHeightRange:number[];

  constructor( world:World, isFlat:boolean=false ){
    super( world, { bodyOptions:{isStatic:true}, options:{isFlat} } );
  }

  protected _preInitialze():void{
    this._widthRange = [ 30, 100 ];
    this._heightRange = [ 100, 300 ];
    this._diffHeightRange = [ 20, -20 ]; 
  }

  protected _initialzed():void{
    this._body.label = 'mountain';
  }

  protected _generatorVertices():Vertex[]{
    const width:number = random( ...this._widthRange );
    const height:number = random( ...this._heightRange );
    return [ 
      { x:0, y:0 },
      { x:width, y: this._options.isFlat ? 0 : random( ...this._diffHeightRange ) },
      { x:width, y:height }, 
      { x:0, y:height },
    ];
  }
}