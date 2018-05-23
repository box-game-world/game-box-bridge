

export interface Vertex{
  x:number;
  y:number;
}

export interface Position{
  x:number;
  y:number;
}

export interface Rectangle{
  x:number;
  y:number;
  width:number;
  height:number;
}

export interface Vector{
  radian:number;
  length:number;
}

export enum StateEnum{
  Ready,
  Aimming,
  Fired
}