import React, {Component} from 'react';
import vertex from './vertex.vert';
import frag from './frag.frag';
import {loadShader} from '../../webgl-tools'
type Props = {};

class TestI extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        let gl=this.canvas.current.getContext('webgl');
        this.start(gl);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <div>
            <canvas ref={this.canvas} width={this.width} height={this.height} style={{backgroundColor:'#befcff'}}>
                not support
            </canvas>
        </div>
    }

    /**
     *properties
     */
    width=600;
    height=600;
    canvas=React.createRef<HTMLCanvasElement>();
    /**
     *method
     */
    start=(gl:WebGLRenderingContext)=>{
        const program:WebGLProgram=loadShader(gl,vertex,frag);
        gl.clearColor(0,0,0.5,1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enable(gl.DEPTH_TEST);
        initVertextBuffer(gl);
        initIndexBuffer(gl);
        gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_BYTE,0);

        function initVertextBuffer(gl:WebGLRenderingContext) {
            let u=0.5;
            const vertex=new Float32Array([
                //正面四个顶点
                -u,u,u,1,1,1,//左上
                u,u,u,0.5,0.5,0.5//右上
                -u,-u,u,0.4,0.6,0.9,//左下
                u,-u,u,1,1,0.5,//右下
                //背面四个顶点，
                -u,u,-u,0.6,0.1,0.8,//左上
                u,u,-u,0.8,0.1,1,//右上
                -u,-u,-u,0,1,0.5,//左下
                u,-u,-u,1,0,0.3//右下
            ]);
            const buffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);
            const a_Position=gl.getAttribLocation(program,'a_Position');
            const a_Color=gl.getAttribLocation(program,'a_Color');
            gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,Float32Array.BYTES_PER_ELEMENT*6,0);
            gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,Float32Array.BYTES_PER_ELEMENT*6,Float32Array.BYTES_PER_ELEMENT*3);
            gl.enableVertexAttribArray(a_Position);
            gl.enableVertexAttribArray(a_Color);

        }

        function  initIndexBuffer(gl:WebGLRenderingContext){
            const index=gl.createBuffer();
            const indices=new Uint8Array([
                0,1,2,1,2,3,
                4,5,6,5,6,7,
                0,1,4,1,4,5,
                3,7,2,7,2,6,
                1,2,6,2,6,5,
                0,3,7,3,7,4
            ]);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
            return indices.length;
        }

    };

}

export default TestI;