import React, {Component} from 'react';
import frag from './frag.frag';
import vertex from './vertex.vert';
import {loadShader} from '../../webgl-tools'

type Props = {};

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
        this.start(gl);
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
    width = 600;
    height = 600;
    canvas = React.createRef<HTMLCanvasElement>();
    /**
     *method
     */
    start = (gl: WebGLRenderingContext) => {
        gl.clearColor(0.9, 0.9, 0.9, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const program: WebGLProgram = loadShader(gl, vertex, frag);
        const aColor = gl.getAttribLocation(program, 'aColor');
        const aPosition = gl.getAttribLocation(program, 'aPosition');
        const aPointSize = gl.getAttribLocation(program, 'aPointSize');
        const uViewMatrix=gl.getUniformLocation(program,'uViewMatrix');

        let stride = 7;




        let matrix=new Matrix4(null);
        matrix.setPerspective(50, 1, 5, 100);
        matrix.lookAt(4, 4, 4, 0, 0, 0, 0, 0.5, 0.5);
        gl.uniformMatrix4fv(uViewMatrix,false,matrix.elements);



        function testB(){
            const u = 0.8;
            const vertexes = new Float32Array([
                -u, 0, 0,   10, 1, 1, 0,
                u, 0, 0,    20, 1, 0, 0,
                0, -u, 0,   30, 1, 1, 0,
                0, u, 0,    30, 1, 0, 0,
                0, 0, -u,    30, 1, 1, 0,
                0, 0, u,    30, 1, 0, 0,
            ]);
            let buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertexes, gl.STATIC_DRAW);
            gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, 0);
            gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * 3);
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * 4);
            gl.enableVertexAttribArray(aPosition);
            gl.enableVertexAttribArray(aPointSize);
            gl.enableVertexAttribArray(aColor);
            gl.drawArrays(gl.LINES, 0, Math.floor(vertexes.length / stride));
        }
        function testA() {

            let i=0.5;
            let vertexes=new Float32Array([
                0.5,0.5,0.5,  10,1,0,0,
                0.5,0.5,0,    10,1,0,0,
                0.5,0,0,      10,1,0,0,
            ]);

            let buffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            gl.bufferData(gl.ARRAY_BUFFER,vertexes,gl.STATIC_DRAW);
            gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, 0);
            //gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * 3);
            //gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * 4);
            gl.enableVertexAttribArray(aPosition);
            //gl.enableVertexAttribArray(aPointSize);
            //gl.enableVertexAttribArray(aColor);
            gl.drawArrays(gl.TRIANGLES,0,3);
            console.log('over');
        }
        testA();
        testB();


    };

}


export default TestK;