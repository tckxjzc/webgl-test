import React, {Component} from 'react';
import cubeFragment from './cubeFragment.frag';
import fragment from './fragment.frag';
import vertex from './vertex.vert';
import cubeVertex from './cubeVertex.vert';
import BoxGeometry from "../../common/BoxGeometry";

type Props = {};

function writeBufferData(gl: WebGLRenderingContext, index, data, size) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(index, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(index);
}

function writeIndexBufferData(gl: WebGLRenderingContext, data) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
}


class TextureA extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        let gl = this.canvas.current.getContext('webgl');
        // gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        let angle = 60;
        let ani = () => {
            angle += 1;
            requestAnimationFrame(ani);
            this.start2(gl, image, angle);
        };
        let image = new Image();
        image.onload = () => {
            ani();
        };
        image.src = require('assets/images/1394.png');
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
    start2 = (gl: WebGLRenderingContext, image: HTMLImageElement, angle) => {
        gl.clearColor(.5, .5, .5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const program = createProgram(gl, cubeVertex, cubeFragment);
        gl.useProgram(program);
        let cube = new BoxGeometry(1, 1, 1);
        console.log(cube);

        let aPosition = gl.getAttribLocation(program, 'aPosition');
        let uMatri = gl.getUniformLocation(program, 'uMatri');
        let vMatri = new Matrix4(null);
        vMatri.perspective(15, 1, 1, 1000);
        vMatri.lookAt(7, 7, 0, 0, 0, 0, 0, 1, 0);
        vMatri.rotate(angle, 0, 1, 0);
        gl.uniformMatrix4fv(uMatri, false, vMatri.elements);
        writeBufferData(gl, aPosition, cube._vertices2, 3);
        gl.drawArrays(gl.TRIANGLES,6,cube._vertices2.length/3-6);
        // writeIndexBufferData(gl, cube._indices);
        // gl.drawElements(gl.TRIANGLES, cube._indices.length, gl.UNSIGNED_SHORT, 0);

        this.start(gl, image, cube,vMatri)
    };

    start = (gl: WebGLRenderingContext, image: HTMLImageElement, cube: BoxGeometry,vMatri) => {
        // gl.clearColor(.5, .5, .5, 1);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        const program = createProgram(gl, vertex, fragment);
        gl.useProgram(program);



        //顶点数据
        let w = 0.5, h = 0.5;
        let getVerts = () => {
           return new Float32Array([
                -w, -h,//左下
                w, -h,//右下，
                -w, h,//左上
                w, h,//右上
            ])
        };
        //纹理数据
        let uv = 1;
        let getUvs = () => {
          return  new Float32Array([
                0, 0,//左下
                uv, 0,//右下
                0, uv,//左上
                uv, uv,//右上
            ])
        };

        let uSampler2D = gl.getUniformLocation(program, 'uSampler2D');
        let aPosition = gl.getAttribLocation(program, 'aPosition');
        let aTexcoord = gl.getAttribLocation(program, 'aTexcoord');
        let uMatri = gl.getUniformLocation(program, 'uMatri');

        gl.uniformMatrix4fv(uMatri, false, vMatri.elements);

        function loadTexture(gl: WebGLRenderingContext, index, image) {
            let texture = gl.createTexture();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);//缩小
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            gl.uniform1i(index, 0);
        }
         loadTexture(gl, uSampler2D, image);
        let face=cube.getFace(0);
        console.log(face)
        writeBufferData(gl,aPosition,cube._vertices2,3);
        writeBufferData(gl,aTexcoord,cube._vertexUvs,2);
        // writeIndexBufferData(gl,cube._indices);
        gl.drawArrays(gl.TRIANGLES,0,6);
        //gl.drawElements(gl.TRIANGLES,cube._indices.length,gl.UNSIGNED_SHORT,0)

        // writeBufferData(gl, aPosition, getVerts(), 2);
        // writeBufferData(gl, aTexcoord, getUvs(), 2);

        // gl.drawArrays(gl.TRIANGLE_STRIP, 0, getVerts().length / 2);
        // w+=0.2;
        // writeBufferData(gl,aPosition,getVerts().map((item,index)=>{
        //     if(index%2){
        //         return item+0.5
        //     }
        //     return item
        // }),2);
        // writeBufferData(gl,aTexcoord,uvs,2);
        // loadTexture(gl,uSampler2D,image);
        // gl.drawArrays(gl.TRIANGLE_STRIP,0,getVerts().length/2);

    };
}


export default TextureA;