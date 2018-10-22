export default class Face3 {
    a:number;
    b:number;
    c:number;
    constructor(a:number,b:number,c:number){
        this.a=a;
        this.b=b;
        this.c=c;
    }
    toArray(array:Array<any>=[]) {
        array.push(this.a);
        array.push(this.b);
        array.push(this.c);
        return array;
    }
}