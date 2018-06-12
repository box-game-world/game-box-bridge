
import { Vertex, Vector } from './interfaces'
import PhysicalBody from './physical-body'
import { World, Events, Bodies, Body, Sleeping } from 'matter-js'
import { Container } from 'pixi.js';
import { TweenLite, Back } from 'gsap';

export default class EnergyCharger extends PhysicalBody{

  private _tweenSpeed:number = 0.5;

  constructor( world:World ){
    super( world, { bodyOptions:{ isStatic:true } } );
  }

  protected _preInitialze():void{
    
  }

  protected _initialzed():void{
    super._initialzed();
    this._body.label = 'energy_charger';
  }

  protected _generatorVertices():Vertex[]{
    return Bodies.polygon( 0, 0, 5, 12 ).vertices;
  }

  protected _updatedAfter():void{
    this.graphics.rotation += 0.07;
  }

  public show():Promise<any>{
    return new Promise( ( res,rej )=>{
      super.show();
      TweenLite.to( this.graphics.scale, this._tweenSpeed, { x:1, y:1, onComplete:()=>{
        res();
      } } );
    } );
  }

  public hide():Promise<any>{
    return new Promise( ( res,rej )=>{
      TweenLite.to( this.graphics.scale, this._tweenSpeed, { x: 0, y:0, onComplete:()=>{
        super.hide();
        res();
      } } );
    } );
  }

  public move( x:number, y:number ):void{
    this.hide().then(()=>{
      this.x = x;
      this.y = y;
      this.show();
    })
  }

  public hit():Promise<any>{
    return new Promise( ( res,rej )=>{
      TweenLite.to( this.graphics.scale, this._tweenSpeed, { ease: Back.easeIn.config(3), x: 0, y:0, onComplete:()=>{
        super.hide();
        res();
      } } );
    } );
  }
}