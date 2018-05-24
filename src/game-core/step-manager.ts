import Step from "./step";
import { Rectangle } from "./interfaces";
import { Recoverable } from "repl";
import { World } from 'matter-js'
import { random } from 'lodash'
import User from "./user";
import {TweenLite} from "gsap/TweenMax";

const CREATION_SYMBOL = Symbol();
export default class StepManager{

  private static _instance:StepManager;

  private _prevStep:Step;
  private _currentStep:Step;
  private _nextStep:Step;
  private _initialized:boolean = false;
  private _stage:PIXI.Container;
  private _user:User;
  private _rectangle:Rectangle;
  private _addBody:Function;
  private _tweenSpeed:number = 0.7;

  public get currentStep():Step{
    return this._currentStep;
  }

  public get nextStep():Step{
    return this._nextStep;
  }

  public static getInstance():StepManager{
    if( !StepManager._instance ){
      StepManager._instance = new StepManager( CREATION_SYMBOL );
    }
    return StepManager._instance;
  }

  constructor( symbol:Symbol ){
    if( symbol !== CREATION_SYMBOL ){
      throw new Error( 'getInstance 클래스 메소드를 이용해 객체를 생성해주세요.' );
    }
  }

  public init( data:{ world:World, user:User, stage:PIXI.Container, rectangle:Rectangle, addBody:Function } ){
    this._stage = data.stage;
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
  }

  public next():Promise<any>{
    return new Promise( ( res, rej )=>{
      const temp:Step = this._prevStep;
      this._prevStep = this._currentStep;
      this._currentStep = this._nextStep;
      this._nextStep = temp;
      this._nextStep.changeVertices();
      this._nextStep.leftTopX = this._currentStep.leftTopX + this._currentStep.width + random( this._rectangle.width - this._currentStep.width - this._nextStep.width );
      this._nextStep.leftTopY = this._rectangle.height - this._nextStep.height;
      const diffX:number = -this._currentStep.leftTopX;
      
      TweenLite.to( this._prevStep, this._tweenSpeed, { leftTopX: this._prevStep.leftTopX+diffX } );
      TweenLite.to( this._currentStep, this._tweenSpeed, { leftTopX:  this._currentStep.leftTopX+diffX } );
      TweenLite.to( this._nextStep, this._tweenSpeed, { leftTopX:  this._nextStep.leftTopX+diffX } );
      TweenLite.to( this._user, this._tweenSpeed, { leftTopX:  this._user.leftTopX+diffX, onComplete:res } );
    } );
  }
}