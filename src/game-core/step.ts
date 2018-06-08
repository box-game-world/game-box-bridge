
import { Vertex } from './interfaces'
import PhysicalBody from './physical-body'
import { World } from 'matter-js'
import { random } from 'lodash'

export default class Step extends PhysicalBody{

  private _isFlat:boolean;
  private _widthRange:number[];
  private _heightRange:number[];
  private _diffY:number[];

  constructor( world:World ){
    super( world, { bodyOptions:{isStatic:true} } );
  }

  protected _preInitialze():void{
    this._widthRange = [ 70, 100 ];
    this._heightRange = [ 100, 300 ];
    this._diffY = [ -30, 30 ];
  }

  protected _initialzed():void{
    super._initialzed();
    this._body.label = 'step';
  }

  protected _generatorVertices():Vertex[]{
    const width:number = random( ...this._widthRange );
    const height:number = random( ...this._heightRange ); 
    return [ 
      { x:0, y: random( ...this._diffY ) },
      // { x:0, y: 0 },
      { x:width, y: 0 },
      { x:width, y:height }, 
      { x:0, y:height },
    ];
  }

  public changeVertices(){
    if( this._body ){
      World.remove( this._world, this._body );
    }
    this._createBody();
    this._initialzed();
    this._render();
  }
}