
import * as PIXI from 'pixi.js'
import { random } from 'lodash'
import GameWorld from './game-world'
import { Bodies } from 'matter-js'
import PhysicalGraphics from './physical-graphics';
import Vertex from './interfaces/vertex'

export default class User extends PhysicalGraphics{

  protected _generatorVertices():Vertex[]{
    return [
      { x:0, y:0 },
      { x:70, y:0 },
      { x:70, y:70 }, 
      { x:0, y:70 },
    ];
  }
}