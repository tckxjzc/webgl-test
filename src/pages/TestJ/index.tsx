import React, {Component} from 'react';
import vertex from './vertex.vert';
import frag from './frag.frag';
import {loadShader} from '../../webgl-tools'

type Props = {};

/**
 * 光照
 */
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
        let gl = this.canvas.current.getContext('webgl');
        this.start(gl);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <div>
            <canvas ref={this.canvas} width={this.width} height={this.height} style={{backgroundColor: '#ffffff'}}>
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
    start=(gl:WebGLRenderingContext)=>{
        const program:WebGLProgram=loadShader(gl,vertex,frag);
        gl.clearColor(0.9,0.9,0.9,1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enable(gl.DEPTH_TEST);


        let eY=7;
        let eX=7;
        let eZ=7;
        let angle=10;
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

        function draw(x = 7, y = 7,z=7) {
            const u_Matrix = gl.getUniformLocation(program, 'u_Matrix');
            let matrix = new Matrix4(null);
            matrix.setPerspective(30, 1, 1, 100);
            // matrix.setOrtho(-1,1,-1,1,-20,20)
            matrix.lookAt(x, y, z, 0, 0, 0   , 1, 0, 0);
            gl.uniformMatrix4fv(u_Matrix, false, matrix.elements);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
        }


        initVertextBuffer(gl);
        let n = initIndexBuffer(gl);

        const u_LightColor = gl.getUniformLocation(program, 'u_LightColor');
        const u_LightDirection = gl.getUniformLocation(program, 'u_LightDirection');
        gl.uniform3f(u_LightColor,0,1,0);
        const lightDirection=new Vector3([4,4,7]);
        // lightDirection.normalize();
        gl.uniform3fv(u_LightDirection,lightDirection.elements);
        const normals = new Float32Array([    // Normal
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
        ]);
        if (!initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT)) return -1;
        draw();

        function initVertextBuffer(gl: WebGLRenderingContext) {
            let u = 1;
            const vertex = new Float32Array([
                //正面四个顶点
                -u, u, u, 1, 1, 1,//左上
                u, u, u, 1, 1, 1,//右上
                u, -u, u, 1, 1, 1,//左下
                -u, -u, u, 1, 1, 1,//右下
                //背面四个顶点，
                -u, u, -u, 1, 1, 1,//左上
                u, u, -u, 1, 1, 1,//右上
                u, -u, -u, 1, 1, 1,//左下
                -u, -u, -u, 1, 1, 1,//右下
            ]);
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertex, gl.STATIC_DRAW);
            const a_Position = gl.getAttribLocation(program, 'a_Position');
            const a_Color = gl.getAttribLocation(program, 'a_Color');
            gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6, 0);
            gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6, Float32Array.BYTES_PER_ELEMENT * 3);
            gl.enableVertexAttribArray(a_Position);
            gl.enableVertexAttribArray(a_Color);

        }



        function initIndexBuffer(gl: WebGLRenderingContext) {
            const index = gl.createBuffer();
            const indices = new Uint8Array([
                0, 2, 1, 0, 2, 3,
                4, 6, 5, 4, 6, 7,
                0, 5, 1, 0, 5, 4,
                3, 6, 2, 3, 6, 7,
                3, 4, 0, 3, 4, 7,
                2, 5, 1, 2, 5, 6
            ]);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
            return indices.length;
        }

        function initArrayBuffer (gl:WebGLRenderingContext, attribute, data, num, type) {
            // Create a buffer object
            let buffer = gl.createBuffer();
            if (!buffer) {
                console.log('Failed to create the buffer object');
                return false;
            }
            // Write date into the buffer object
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            // Assign the buffer object to the attribute variable
            const a_attribute = gl.getAttribLocation(program, attribute);
            if (a_attribute < 0) {
                console.log('Failed to get the storage location of ' + attribute);
                return false;
            }
            gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
            // Enable the assignment of the buffer object to the attribute variable
            gl.enableVertexAttribArray(a_attribute);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            return true;
        }

    };

}

export default TestI;