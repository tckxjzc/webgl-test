import React, {Component} from 'react';
import {loadShader} from "../../webgl-tools";


type Props = {};
let vertex = require('./vertex.vert');
let frag = require('./frag.frag');

class TestG extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        let canvas = this.cas.current;
        const gl = canvas.getContext('webgl');
        // this.start(gl);
        this.start2(gl);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <React.Fragment>
            {/*<h2>testG</h2>*/}
            <canvas style={{
                backgroundColor: '#b0faff'
            }} ref={this.cas} width={this.width} height={this.height}>

            </canvas>
        </React.Fragment>;
    }

    /**
     *properties
     */
    width = 500;
    height = 500;
    cas = React.createRef<HTMLCanvasElement>();

    /**
     *method
     */

    private start(gl: WebGLRenderingContext) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const program = loadShader(gl, vertex, frag);

        const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix');
        const u_ProjMatrix = gl.getUniformLocation(program, 'u_ProjMatrix');
        const a_Position = gl.getAttribLocation(program, 'a_Position');
        const a_Color = gl.getAttribLocation(program, 'a_Color');

        const verticesColors = new Float32Array([
            // Vertex coordinates and color
            0.0, 0.5, -0.4, 0.4, 1.0, 0.4, // The back green one
            -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
            0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

            0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // The middle yellow one
            -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
            0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

            0.0, 0.5, 0.0, 0.4, 0.4, 1.0,  // The front blue one
            -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
            0.5, -0.5, 0.0, 1.0, 0.4, 0.4,
        ]);
        const n = 9;

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
        const FSIZE = Float32Array.BYTES_PER_ELEMENT;

        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        gl.enableVertexAttribArray(a_Color);

        const viewMatrix = new Matrix4(null);
        const projMatrix = new Matrix4(null);
        projMatrix.setOrtho(-1, 1, -1.0, 1.0, -100.0, 100.0);
        gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
        let g_EyeX = 0.50, g_EyeY = 0.5, g_EyeZ = 0.5; // Eye position
        document.body.onkeydown = (ev) => {
            switch (ev.code) {
                case 'ArrowUp':
                    g_EyeY += 0.1;
                    break;
                case 'ArrowDown':
                    g_EyeY -= 0.1;
                    break;
                case 'ArrowLeft':
                    g_EyeX -= 0.01;
                    break;
                case 'ArrowRight':
                    g_EyeX += 0.01;
                    break;
            }
            draw();
        };

        function draw() {

            viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, 0, 0, 0, 0, 1, 0);
            gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, n);
        }
        draw();
    }
    private start2(gl: WebGLRenderingContext) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const program = loadShader(gl, vertex, frag);

        const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix');
        const u_ProjMatrix = gl.getUniformLocation(program, 'u_ProjMatrix');
        const a_Position = gl.getAttribLocation(program, 'a_Position');
        const a_Color = gl.getAttribLocation(program, 'a_Color');

        const verticesColors = new Float32Array([
            // Vertex coordinates and color
            0.0, 0.5, -0.4, 0.4, 1.0, 0.4, // The back green one
            -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
            0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

            0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // The middle yellow one
            -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
            0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

            0.0, 0.5, 0.0, 0.4, 0.4, 1.0,  // The front blue one
            -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
            0.5, -0.5, 0.0, 1.0, 0.4, 0.4,
        ]);
        const n = 9;

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
        const FSIZE = Float32Array.BYTES_PER_ELEMENT;

        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        gl.enableVertexAttribArray(a_Color);

        const viewMatrix = new Matrix4(null);
        const projMatrix = new Matrix4(null);
        // projMatrix.setOrtho(-1, 1, -1.0, 1.0, -100.0, 100.0);
        projMatrix.setPerspective(30,this.width/this.height,1,100);
        gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
        let g_EyeX = 0.50, g_EyeY = 0.5, g_EyeZ = 0.5; // Eye position
        document.body.onkeydown = (ev) => {
            switch (ev.code) {
                case 'ArrowUp':
                    g_EyeY += 0.1;
                    break;
                case 'ArrowDown':
                    g_EyeY -= 0.1;
                    break;
                case 'ArrowLeft':
                    g_EyeX -= 0.01;
                    break;
                case 'ArrowRight':
                    g_EyeX += 0.01;
                    break;
            }
            draw();
        };

        function draw() {

            viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, 0, 0, 0, 0, 1, 0);
            gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, n);
        }
        draw();
    }
}


export default TestG;