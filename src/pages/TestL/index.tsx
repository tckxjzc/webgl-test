import React, {Component} from 'react';
import frag from './frag.frag';
import vertex from './vertex.vert';
import {loadShader} from '../../webgl-tools'
import cube from './cube.obj';
import * as ObjLoader from 'webgl-obj-loader/src/index';
type Props = {};
// import parseWFObj from 'wavefront-obj-parser';
// import parseWFObj2 from 'obj-file-parser';
class TestK extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        this.mounted = true;
        let gl = this.canvas.current.getContext('webgl');
        this.start(gl,5,5,5);


        let eY=7;
        let eX=7;
        let eZ=7;
        let angle=10;
        let draw=(x,y,z)=>{
          this.start(gl,x,y,z);
        };
        document.body.onkeydown=function (e) {
            console.log( e.code);
            let x=eX,y=eY,z=eZ;
            switch (e.code){
                case 'ArrowUp':
                    eY+=0.2;
                    eZ+=0.2;
                    eX+=0.2;
                    break;
                case 'ArrowDown':
                    (function () {
                        let a=angle/180*Math.PI;
                        let cosA=Math.cos(a);
                        let sinA=Math.sin(a);
                        x=eX*cosA-eZ*sinA;
                        z=eX*sinA+eZ*cosA;
                        angle+=10;
                        draw(x,y,z)
                    })();
                    return;
                case 'ArrowLeft':
                    (function () {
                        let a=angle/180*Math.PI;
                        let cosA=Math.cos(a);
                        let sinA=Math.sin(a);
                        y=eY*cosA-eZ*sinA;
                        z=eY*sinA+eZ*cosA;
                        angle+=10;
                        draw(x,y,z)
                    })();
                    return;
                case 'ArrowRight':

                    (function () {
                        let a=angle/180*Math.PI;
                        let cosA=Math.cos(a);
                        let sinA=Math.sin(a);
                        x=eX*cosA-eY*sinA;
                        y=eX*sinA+eY*cosA;
                        angle+=10;
                        draw(x,y,z)
                    })();
                    return;
            }
            draw(eX,eY,eZ);

        };

    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <div>
            <canvas ref={this.canvas} width={this.width} height={this.height} style={{backgroundColor: '#befcff'}}>
                not support
            </canvas>
        </div>
    }

    /**
     *properties
     */
    width = 480;
    height = 480;
    canvas = React.createRef<HTMLCanvasElement>();
    /**
     *method
     */
    start = (gl: WebGLRenderingContext,x,y,z) => {

        gl.clearColor(0.9, 0.9, 0.9, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        const program: WebGLProgram = loadShader(gl, vertex, frag);
        const aColor = gl.getAttribLocation(program, 'aColor');
        const aPosition = gl.getAttribLocation(program, 'aPosition');
        const aNormal = gl.getAttribLocation(program, 'aNormal');
        const aPointSize = gl.getAttribLocation(program, 'aPointSize');
        const uViewMatrix=gl.getUniformLocation(program,'uViewMatrix');
        const uLightColor=gl.getUniformLocation(program,'uLightColor');
        const uLightDirection=gl.getUniformLocation(program,'uLightDirection');

        let stride = 7;








        let matrix=new Matrix4(null);
        matrix.setPerspective(30, 1, 3, 100);
        matrix.lookAt(x, y, z, 0, 0, 0, 0, 1, 0);
        gl.uniformMatrix4fv(uViewMatrix,false,matrix.elements);
        gl.uniform3f(uLightColor,1,1,1);
        gl.uniform3f(uLightDirection,1,1,1);

        let mesh;
         mesh=new ObjLoader.Mesh(cube);
        let vertices=new Float32Array(mesh.vertices);
        let vertexSize=3;
        let indices=new Uint16Array(mesh.indices);
        let vertexNormals=new Float32Array(mesh.vertexNormals);


         //mesh=parseWFObj(cube);
        //
        // let vertices=new Float32Array(mesh.vertexPositions);
        // let vertexSize=3;
        // let indices=new Uint32Array(mesh.vertexPositionIndices);
        // let vertexNormals=new Float32Array(mesh.vertexNormals);

        console.log(mesh);



        // this.testA(gl,mesh,aPosition,aNormal);
        this.testP(gl,vertices,vertexNormals,aNormal,indices,aPosition);


        // this.testB(gl,aPosition)
        // this.testC(gl,aPosition)




    };
    testP=(gl:WebGLRenderingContext,vertices,vertexNormals,aNormal,indices,aPosition)=>{
        function writeBufferData(gl:WebGLRenderingContext,bufferData,attrIndex:number,size:number,stride:number=0,offset:number=0) {
            let buffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            gl.bufferData(gl.ARRAY_BUFFER,bufferData,gl.STATIC_DRAW);
            gl.vertexAttribPointer(attrIndex,size,gl.FLOAT,false,stride,offset);
            gl.enableVertexAttribArray(attrIndex);
        }

        function writeIndicesData(gl:WebGLRenderingContext,indicesData){
            let buffer=gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indicesData,gl.STATIC_DRAW);
        }


        writeBufferData(gl,vertices,aPosition,3);
        writeBufferData(gl,vertexNormals,aNormal,3);
        writeIndicesData(gl,indices);
        gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);

    };
    testA=(gl:WebGLRenderingContext,mesh,aPosition,aNormal)=>{
        (function() {
            ObjLoader.initMeshBuffers(gl,mesh);
            console.log(mesh);
            gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vertexBuffer);
            gl.vertexAttribPointer(aPosition,mesh.vertexBuffer.itemSize,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(aPosition);

            gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normalBuffer);
            gl.vertexAttribPointer(aNormal,mesh.normalBuffer.itemSize,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(aNormal);



            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.indexBuffer);
            gl.drawElements(gl.TRIANGLES,mesh.indexBuffer.numItems,gl.UNSIGNED_SHORT,0);

        })();
    };
    testB=(gl:WebGLRenderingContext,aPosition)=>{
        (function () {
            function  initIndexBuffer(gl:WebGLRenderingContext){
                const index=gl.createBuffer();
                const indices=new Uint8Array(tc());
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
                return indices.length;
            }

            function initVertextBuffer(gl:WebGLRenderingContext) {

                const vertex=new Float32Array(tf());
                const buffer=gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
                gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);

                gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,0,0);
                gl.enableVertexAttribArray(aPosition);

            }
            initVertextBuffer(gl);
            let n=initIndexBuffer(gl);
            gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0)

        }());
        function te() {
            let a=`f 1//1 2//1 3//1 4//1
                    f 5//2 8//2 7//2 6//2
                    f 1//3 5//3 6//3 2//3
                    f 2//4 6//4 7//4 3//4
                    f 3//5 7//5 8//5 4//5
                    f 5//6 1//6 4//6 8//6`.replace(/f/g,'').split(/\s+/).slice(1).map((item,index)=>{
                return Number(item.substr(0,1))
            });
            a=a.map(item=>item-1)
            console.log(a)
            return a;
        }
        function tc() {
            let a=`f 1//1 2//1 3//1 4//1
                    f 5//2 8//2 7//2 6//2
                    f 1//3 5//3 6//3 2//3
                    f 2//4 6//4 7//4 3//4
                    f 3//5 7//5 8//5 4//5
                    f 5//6 1//6 4//6 8//6`.replace(/f/g,'').replace(/\/\/\d/g,',')

            let c=[
                1, 2, 3,1,3, 4,
                5, 8, 7, 5,7, 6,
                1, 5, 6, 1,6,2,
                2, 6, 7, 2,7, 3,
                3, 7, 8, 3,8,4,
                5, 1, 4, 5,4,8,
            ];
            let d=[
                0,2,1,0,2,3,
                4,6,5,4,6,7,
                0,5,1,0,5,4,
                3,6,2,3,6,7,
                3,4,0,3,4,7,
                2,5,1,2,5,6
            ];

            c=c.map(item=>item-1);
            c=d;
            console.log(c)
            return c;
        }

        function tf(){
            let u=1;
            let b=[
                //正面四个顶点
                -u,u,u,
                u,u,u,
                u,-u,u,
                -u,-u,u,
                //背面四个顶点，
                -u,u,-u,
                u,u,-u,
                u,-u,-u,
                -u,-u,-u,
            ];
            return b;
        }

    };
    testC=(gl:WebGLRenderingContext,aPosition)=>{
        (function () {
            function  initIndexBuffer(gl:WebGLRenderingContext){
                const index=gl.createBuffer();
                const indices=new Uint8Array([
                    0,2,1,0,2,3,
                    4,6,5,4,6,7,
                    0,5,1,0,5,4,
                    3,6,2,3,6,7,
                    3,4,0,3,4,7,
                    2,5,1,2,5,6
                ]);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
                return indices.length;
            }

            function initVertextBuffer(gl:WebGLRenderingContext) {
                let u=1;
                const vertex=new Float32Array([
                    //正面四个顶点
                    -u,u,u,1,1,1,//左上
                    u,u,u,0.5,0.5,0.5,//右上
                    u,-u,u,0.4,0.6,0.9,//左下
                    -u,-u,u,1,1,0.5,//右下
                    //背面四个顶点，
                    -u,u,-u,0.6,0.1,0.8,//左上
                    u,u,-u,0.8,0.1,1,//右上
                    u,-u,-u,0,1,0.5,//左下
                    -u,-u,-u,1,0,0.3//右下
                ]);
                const buffer=gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
                gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);

                gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,Float32Array.BYTES_PER_ELEMENT*6,0);
                gl.enableVertexAttribArray(aPosition);

            }
            initVertextBuffer(gl);
            let n=initIndexBuffer(gl);
            gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0)

        }());





    };

}


export default TestK;

/**
 * 总结
 * 1
 *矩阵乘法不遵循交换律，顺序错了无法正常显示
 *2
 * 注意数据类型，数据类型错了，也无法正常显示
 * 如下，尝试更改，数据类型需对应
 *  let indices=new Uint16Array(mesh.indices);
 *    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
 *
 *
 */