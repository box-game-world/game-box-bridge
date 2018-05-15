

import * as PIXI from 'pixi.js'
import { random } from 'lodash'
import GameWorld from './game-world'
import { Bodies } from 'matter-js'

export default class Mountain extends PIXI.Graphics{

  private _vertex:{x:number, y:number}[] = [];
  private _bodies:Bodies;

  public get bodies():Bodies{
    return this._bodies;
  }

  constructor(){
    super();
    this._generateVertexData();
    this.on( 'added', ()=>{
      this._createBodies();
      this._draw();
    });
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

  private _createBodies():void{
    this._bodies = Bodies.fromVertices( this.x, this.y, this._vertex, { isStatic:true} );
    console.log( this.x, this.y, this._bodies );
  }

  private _draw():void{
    this.beginFill(0xe4e1ed);
    this.moveTo( 0, 0 )
    this._vertex.forEach( ( item:{ x:number, y:number })=>{
      this.lineTo( item.x, item.y )
    } );
    this.endFill();
  }

  public update():void{
    this.x = this._bodies.position.x;
    this.y = this._bodies.position.y;
    this.rotation = this._bodies.angle;
  }
}