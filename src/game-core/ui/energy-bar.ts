

export default class EnergyBar extends PIXI.Sprite{

	private _bg:PIXI.Graphics;
	private _bar:PIXI.Graphics;

	constructor(){
		super();
		this._initGraphics();
	}

	private _initGraphics():void{
		this._bg = new PIXI.Graphics();
		this.addChild( this._bg );
		this._bg.beginFill( 0xefefef );
		this._bg.drawRect( 0, 0, 150, 20 );
		this._bg.endFill();


		this._bar = new PIXI.Graphics();
		this.addChild( this._bar );
		this._bar.beginFill( 0xdddddd );
		this._bar.drawRect( 0, 0, 120, 20 );
		this._bar.endFill();

	}
}