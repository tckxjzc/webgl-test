import Vector from "./Vector";

export default class Vector3 extends Vector {
    x;
    y;
    z;
    constructor(x: number, y: number, z: number) {
        super();
        this.x=x;
        this.y=y;
        this.z=z;
    }

    toArray(array:Array<any>=[]) {
        array.push(this.x);
        array.push(this.y);
        array.push(this.z);
        return array;
    }

}