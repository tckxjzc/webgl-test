import React, {Component, Fragment} from 'react';

type Props = {};
const vert = require('./a.vert');
const frag = require('./b.frag');

class TestF extends Component<Props> {
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
        this.start(gl);

    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <Fragment>
            <canvas
                style={{backgroundColor: '#fff'}}
                ref={this.cas}
                width={this.width}
                height={this.height}>

            </canvas>
        </Fragment>;
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
        initShaders(gl, vert, frag);
        const program = gl['program'];

        const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix');
        const u_ProjMatrix = gl.getUniformLocation(program, 'u_ProjMatrix');
        const a_Position = gl.getAttribLocation(program, 'a_Position');
        const a_Color = gl.getAttribLocation(program, 'a_Color');

        // let viewMatrix = new Matrix4(null);
        // if (wbp.dev) {
        //     viewMatrix
        //         .setLookAt(
        //             0.25, 0.25, 0.25,
        //             0, 0, 0,
        //             0, 1, 0);
        // }else{
        //     viewMatrix
        //         .setLookAt(
        //             0.25, 0.25, 0.25,
        //             0, 0, 0,
        //             0, 1, 0);
        // }

        draw();
        let eX=0.25;
        let eY=0.25;
        document.body.onkeydown=function (e) {
            // console.log( e.code);
            switch (e.code){
                case 'ArrowUp':
                    eY+=0.1;
                    break;
                case 'ArrowDown':
                    eY-=0.1;
                    break;
                case 'ArrowLeft':
                    eX-=0.1;
                    break;
                case 'ArrowRight':
                    eX+=0.1;
                    break;
            }
            draw(eX,eY);
        };

        function draw(eX=0.55,eY=0.25){
            let viewMatrix = new Matrix4(null);
            let projMatrix = new Matrix4(null);
            // viewMatrix
            //         .setLookAt(
            //             eX, eY, 0.25,
            //             0, 0, 0,
            //             0, 1, 0);
            // projMatrix.setOrtho(-1,1,-1,1,-2,2);
            projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 2.0);
            viewMatrix.setLookAt(eX, eY, 0.25, 0, 0, 0, 0, 1, 0);
            gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
            gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
            let verticesColors = new Float32Array([
                // Vertex coordinates and color(RGBA)
                0.0, 0.5, -0.4,      0.4, 1.0, 0.4, // The back green one
                -0.5, -0.5, -0.4,    0.4, 1.0, 0.4,
                0.5, -0.5, -0.4,    1.0, 0.4, 0.4,

                0.5, 0.4, -0.2,     1.0, 0.4, 0.4, // The middle yellow one
                -0.5, 0.4, -0.2,    1.0, 1.0, 0.4,
                0.0, -0.6, -0.2,    1.0, 1.0, 0.4,

                0.0, 0.5, 0.0,      0.4, 0.4, 1.0,  // The front blue one
                -0.5, -0.5, 0.0,    0.4, 0.4, 1.0,
                0.5, -0.5, 0.0,     1.0, 0.4, 0.4,
            ]);
            let n = 9;

            let buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
            const FSIZE = Float32Array.BYTES_PER_ELEMENT;

            gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
            gl.enableVertexAttribArray(a_Position);
            gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
            gl.enableVertexAttribArray(a_Color);

            // Unbind the buffer object
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            // Clear <canvas>
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Draw the rectangle
            gl.drawArrays(gl.TRIANGLES, 0, n);
        }


    }
}


export default TestF;