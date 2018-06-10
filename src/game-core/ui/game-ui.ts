import EnergyBar from "./energy-bar";


const STAGE_WIDTH:number = 300;
const STAGE_HEIGHT:number = 60;

export default class GameUI extends PIXI.Sprite{

	private _energyBar:EnergyBar;
	private _app:PIXI.Application;

	public get stage():PIXI.Container{
    return this._app.stage;
  }

	constructor( { container } ){
		super();
		this._initStage( container );
		this._initComponents();
	}

	private _initStage( container ):void{
    this._app = new PIXI.Application( STAGE_WIDTH, STAGE_HEIGHT, { antialias:false, backgroundColor:0xf7f7f7, resolution:2 } );
    const style:CSSStyleDeclaration = this._app.view.style;
    style.width = style.height = '100%';
    container.appendChild( this._app.view );
    this.stage.width = STAGE_WIDTH;
    this.stage.height = STAGE_HEIGHT;
  }

	private _initComponents():void{
		this._initEnergyBar();
	}

	private _initEnergyBar():void{
		this._energyBar = new EnergyBar();
		this.stage.addChild( this._energyBar );
		this._energyBar.x = 20 ;
		this._energyBar.y = 20 ;
	}
}