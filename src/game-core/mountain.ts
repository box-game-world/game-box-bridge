
import * as PIXI from 'pixi.js'
import { random } from 'lodash'
import GameWorld from './game-world'

export default class Mountain extends PIXI.Container{

  private _graphics:PIXI.Graphics;
  private _vertex:{x:number, y:number}[] = [];

  constructor(){
    super();
    this._graphics = new PIXI.Graphics();
    this.addChild( this._graphics );
    this._generateVertexData();
    this._render();
  }

  private _generateVertexData():void{
    const worldSize:{ width:number, height:number } = GameWorld.GET_STAGE_SIZE();
    const width:number = parseInt( random( worldSize.width*.2, worldSize.height*.1 ) );
    const height:number = parseInt( random( worldSize.height*.3, worldSize.height*.2 ) );
    const vertexNum:number = 4;
  
    this._vertex.push( { x:width, y:0 } );
    this._vertex.push( { x:width, y:height } );
    this._vertex.push( { x:0, y:height } );
  }

  private _render():void{
    this._graphics.beginFill(0x837993);
    this._graphics.lineStyle(1, 0x161419);
    this._graphics.moveTo( 0, 0 )
    this._vertex.forEach( ( item:{ x:number, y:number })=>{
      this._graphics.lineTo( item.x, item.y )
    } );
    this._graphics.endFill();
  }
}