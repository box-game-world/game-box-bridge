import { TweenLite } from "gsap";


export default class EnergyBar extends PIXI.Sprite{

	private _bg:PIXI.Graphics;
  private _bar:PIXI.Graphics;
  private _energy:number;
  private _maxEnergy:number;
  private _scale:number = 1;
  private _tweenSpeed:number = 0.6;
  private _barWidth:number = 100;
  private _barHeight:number = 20;

	constructor(){
		super();
		this._initGraphics();
	}

	private _initGraphics():void{
		this._bg = new PIXI.Graphics();
		this.addChild( this._bg );
		this._bg.beginFill( 0xefefef );
		this._bg.drawRect( 0, 0, this._barWidth, this._barHeight );
		this._bg.endFill();

		this._bar = new PIXI.Graphics();
		this.addChild( this._bar );
		this._bar.beginFill( 0xdddddd );
		this._bar.drawRect( 0, 0, this._barWidth, this._barHeight );
		this._bar.endFill();
  }

  public setEnergy( value:number ):void{
    this._energy = value;
    this._render();
  }

  public setMaxEnergy( value:number ):void{
    this._maxEnergy = value;
    this._render();
  }

  private _render():void{
    this._scale = this._energy / this._maxEnergy;
    TweenLite.to( this._bar.scale, this._tweenSpeed, { x: this._scale } );
  }
}