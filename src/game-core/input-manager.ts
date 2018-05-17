import * as PIXI from 'pixi.js'
import { Rectangle } from './interfaces'


export default class InputManager{

  constructor( data:{stage:PIXI.Container, rectangle:Rectangle }  ){
    const area:PIXI.Graphics = new PIXI.Graphics();
    const stage:PIXI.Container = data.stage;
    const rectangle:Rectangle = data.rectangle;
    
    stage.addChildAt( area, 0 ); 
    area.beginFill( 0xff9900 );
    area.drawRect( rectangle.x, rectangle.y, rectangle.width, rectangle.height );
    area.endFill();
    area.alpha = 0;

    stage.interactive = true;
    stage.on( 'touchstart', ( event:PIXI.interaction.InteractionEvent )=>{
      console.log( 'touchstart' )
    });

    stage.on( 'touchmove', ( event:PIXI.interaction.InteractionEvent )=>{
      console.log( 'touchmove' )
    });

    stage.on( 'touchend', ( event:PIXI.interaction.InteractionEvent )=>{
      console.log( 'touchend' )
    })

  }
}