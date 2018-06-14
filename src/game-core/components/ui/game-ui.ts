import EnergyBar from "./energy-bar";
import gameStore from '@/game-core/store/game-store'
import { autorun } from "mobx";
import { TweenLite, Back } from "gsap";

const STAGE_WIDTH:number = 300;
const STAGE_HEIGHT:number = 60;

export default class GameUI extends PIXI.Sprite{

	private _energyBar:EnergyBar;
  private _app:PIXI.Application;
  private _stepText:PIXI.Text;

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
    this._initStepText();
	}

	private _initEnergyBar():void{
		this._energyBar = new EnergyBar();
		this.stage.addChild( this._energyBar );
		this._energyBar.x = 20 ;
    this._energyBar.y = 20 ;
    
    autorun( ()=>this._energyBar.setEnergy( gameStore.energy ) );
    autorun( ()=>this._energyBar.setMaxEnergy( gameStore.maxEnergy ) );
  }
  
  private _initStepText():void{
    this._stepText = new PIXI.Text( '0', { fontFamily : 'Arial', fontSize: 34, fill : 0xdddddd, align:'center' } );
    this.stage.addChild( this._stepText );
    this._stepText.y = 12;
    autorun( ()=>{
      const tempY = this._stepText.y;
      this._stepText.text = gameStore.step.toString();
      this._stepText.x = STAGE_WIDTH - this._stepText.width - 10;
      this._stepText.y = this._stepText.y+3;
      TweenLite.to( this._stepText, 0.3, { ease: Back.easeOut.config(10), y:tempY } );
    } );
  }
}