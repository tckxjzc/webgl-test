import Vector from "./Vector";

export default class Vector2 extends Vector{
    x;
    y;
    constructor(x:number,y:number){
        super();
        this.x=x;
        this.y=y;
    }
    toArray( array:Array<any>=[]) {
        array.push(this.x);
        array.push(this.y);
        return array;

    }
}