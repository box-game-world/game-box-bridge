import Step from "./step";
import { Rectangle } from "./interfaces";
import { Recoverable } from "repl";
import { World } from 'matter-js'
import { random } from 'lodash'
import User from "./user";
import {TweenLite} from "gsap/TweenMax";
import EnergyCharger from "./energy-charger";
import gameStore from "./store/game-store";

export default class StepManager{

  private static _instance:StepManager;

  private _prevStep:Step;
  private _currentStep:Step;
  private _nextStep:Step;
  private _user:User;
  private _rectangle:Rectangle;
  private _addBody:Function;
  private _energyCharger:EnergyCharger;
  private _tweenSpeed:number = 0.7;

  public get currentStep():Step{
    return this._currentStep;
  }

  public get nextStep():Step{
    return this._nextStep;
  }

  public get energyCharger():EnergyCharger{
    return this._energyCharger;
  }

  public static getInstance():StepManager{
    if( !StepManager._instance ){
      StepManager._instance = new StepManager();
    }
    return StepManager._instance;
  }

  private constructor(){
  }

  public init( data:{ world:World, user:User, stage:PIXI.Container, rectangle:Rectangle, addBody:Function } ){
    this._rectangle = data.rectangle;
    this._user = data.user;
    this._prevStep = new Step( data.world );
    this._currentStep = new Step( data.world );
    this._nextStep = new Step( data.world );
    this._addBody = data.addBody;

    this._currentStep.leftTopX = 30;
    this._currentStep.leftTopY = this._rectangle.height - this._currentStep.height;
    this._addBody( this._currentStep );

    this._nextStep.leftTopX = this._rectangle.width - this._nextStep.width - 30;
    this._nextStep.leftTopY = this._rectangle.height - this._nextStep.height;
    this._addBody( this._nextStep );

    this._prevStep.leftTopX = -1000;
    this._addBody( this._prevStep );

    this._user.x = this._currentStep.x;
    this._user.y = this._currentStep.leftTopY;

    this._energyCharger = new EnergyCharger( data.world );
    this._addBody( this._energyCharger );
    this._energyCharger.sprite.visible = false;
  }

  public next():Promise<any>{
    return new Promise( ( res, rej )=>{
      const temp:Step = this._prevStep;
      this._prevStep = this._currentStep;
      this._currentStep = this._nextStep;
      this._nextStep = temp;
      this._nextStep.changeVertices();
      this._nextStep.leftTopX = this._currentStep.leftTopX + this._rectangle.width - this._currentStep.width - random( 50 );
      this._nextStep.leftTopY = this._rectangle.height;

      const diffX:number = -this._currentStep.leftTopX;
      const prevTargetLeftX:number = this._prevStep.leftTopX+diffX;
      const currentTargetLeftX:number = this._currentStep.leftTopX+diffX;
      const nextTargetLeftX:number = this._nextStep.leftTopX+diffX;
      const nextTargetLeftY:number = this._rectangle.height - this._nextStep.height;
      const userTargetLeftX:number = this._user.leftTopX+diffX;

      TweenLite.to( this._prevStep, this._tweenSpeed, { leftTopX: prevTargetLeftX } );
      TweenLite.to( this._currentStep, this._tweenSpeed, { leftTopX: currentTargetLeftX } );
      TweenLite.to( this._nextStep, this._tweenSpeed, { leftTopX: nextTargetLeftX, leftTopY: nextTargetLeftY } );
      TweenLite.to( this._user, this._tweenSpeed, { leftTopX: userTargetLeftX, onComplete:res } );

      this._energyCharger.move( currentTargetLeftX + this._currentStep.width + this._energyCharger.width + random( 100 ), 10 + random( nextTargetLeftY - 10 ) ) ;

      gameStore.nextStep();
    } );
  }
}