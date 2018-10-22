import Geometry from "./Geometry";
import Face3 from "./Face3";
import Vector2 from "./Vector2";
import Vector3 from "./Vector3";

/** Create a cube
 v0----- v1
 /|      /|
 v3------v2|
 | |     | |
 | |v4---|-|v5
 |/      |/
 v7------v6
 **/
let face4s = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [2, 1, 5, 6],
    [0, 3, 7, 4],
    [1, 0, 4, 5],
    [3, 2, 6, 7]
];
export default class BoxGeometry extends Geometry {
    faces: Array<Face3> = [];
    faceVertexUvs = [];


    constructor(width: number, height: number, deep: number) {
        super();
        this.init(width / 2, height / 2, deep / 2);
    }

    private init(x: number, y: number, z: number) {
        this.vertices = [
            //上方四个顶点
            new Vector3(-x, y, z),//左上
            new Vector3(x, y, z),//右上
            new Vector3(x, -y, z),//右下
            new Vector3(-x, -y, z),//左下
            //下方四个顶点
            new Vector3(-x, y, -z),//左上
            new Vector3(x, y, -z),//右上
            new Vector3(x, -y, -z),//右下
            new Vector3(-x, -y, -z),//左下
        ];
        for (let i = 0; i < face4s.length; i++) {
            let item = face4s[i];
            this.faces.push(...this.parseToFace3(item[0], item[1], item[2], item[3]));
            this.faceVertexUvs.push(...this.parseToVertexUvs(item[0], item[1], item[2], item[3]));
        }
        this.getVertices();
        this.getIndices();
        this.getVertexUvs();

        this.getVertices2();
    }

    _vertices2;
    getVertices2() {
        if (!this._vertices2) {
            let arr=[];
            for (let i = 0; i < this._indices.length; i++) {
                arr.push(this.vertices[this._indices[i]])
            }
            let verts=[];
            for (let i = 0; i < arr.length; i++) {
                arr[i].toArray(verts);
            }
            this._vertices2=new Float32Array(verts);
        }
        return this._vertices2;
    }

    _vertices;

    getVertices() {
        if (!this._vertices) {
            let arr = [];
            for (let i = 0; i < this.vertices.length; i++) {
                this.vertices[i].toArray(arr);
            }
            this._vertices = new Float32Array(arr);
        }

        return this._vertices;
    }


    _vertexUvs;
    getVertexUvs(){
        if (!this._vertexUvs) {
            let arr=[];
            for (let i = 0; i < this.faceVertexUvs.length; i++) {
                for (let j = 0; j < this.faceVertexUvs[i].length; j++) {
                    this.faceVertexUvs[i][j].toArray(arr);
                }
            }
            this._vertexUvs = new Float32Array(arr);
        }
        return  this._vertexUvs;
    }
    _indices;
    getIndices() {
        if (!this._indices) {
            let arr = [];
            for (let i = 0; i < this.faces.length; i++) {
                this.faces[i].toArray(arr);
            }
            this._indices = new Uint16Array(arr);
        }
        return this._indices;
    }

    getFace(index: number) {
        index=index*2;
        let faces=this.faces.slice(index,index+2);
        let faceVertexUvs=this.faceVertexUvs.slice(index,index+2);
        let indices=[];//顶点索引
        let uvs=[];//纹理坐标
        for (let i = 0; i < 2; i++) {
            faces[i].toArray(indices);
            for (let j = 0; j < faceVertexUvs[i].length; j++) {
                faceVertexUvs[i][j].toArray(uvs);
            }
        }
        return {
            indices:new Uint16Array(indices),uvs:new Float32Array(uvs)
        }
    }
    /** Create a cube
     v0----- v1
     /|      /|
     v3------v2|
     | |     | |
     | |v4---|-|v5
     |/      |/
     v7------v6
     **/
    private parseToVertexUvs(a: number, b: number, c: number, d: number) {
        //顺时针
        return [
            [new Vector2(0, 1), new Vector2(1, 1), new Vector2(1, 0)],

            [new Vector2(0, 1), new Vector2(1, 0), new Vector2(0, 0)],
        ];
    }

    private parseToFace3(a: number, b: number, c: number, d: number) {
        //顺时针
        return [
            new Face3(a, b, c),
            new Face3(a, c, d)
        ];
    }
}