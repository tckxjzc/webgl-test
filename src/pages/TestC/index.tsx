import React, {Component} from 'react';


type Props = {};
const a = require('./a.frag');
const b = require('./b.vert');

class TestC extends Component<Props> {
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
        // if(gl instanceof WebGLRenderingContext)
        let __this=this;
        let a=0;
        function ra() {
            __this.testA(gl,a);
            a+=2;
            requestAnimationFrame(ra)
        }
        requestAnimationFrame(ra)
       //  ra()
       // setInterval(ra,50)
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <React.Fragment>
            <div style={{
                position:'absolute',
                zIndex:100,
                top:0,
                left:0,
                width:this.width,
                height:this.height,
                // backgroundColor:'#ff0',
                backgroundColor:'rgba(0,0,0,0)'
            }}>
                <div style={{
                    position:'absolute',
                    top:this.width/2,
                    left:0,
                    width:this.width,
                    height:1,
                    backgroundColor:'#33ff54'
                }}/>
                <div style={{
                    position:'absolute',
                    left:this.height/2,
                    top:0,
                    width:1,
                    height:this.height,
                    backgroundColor:'#33ff54'
                }}/>
            </div>
            <canvas
                ref={this.cas}
                width={this.width}
                height={this.height}
                style={{backgroundColor: '#fff'}}>

            </canvas>
        </React.Fragment>;
    }

    /**
     *properties
     */
    width = 500;
    height = 500;
    /**
     *method
     */
    cas = React.createRef<HTMLCanvasElement>();

    testA(gl: WebGLRenderingContext,rorate) {
        // rorate=0;
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        let vertex = new Float32Array([
            0, 0.5, 0,
            0, 0, 0,
            0.5, 0.5, 0,
        ]);
        let size = 3;
        let n = 3;
        initShaders(gl, b, a);
        let a_Position = gl.getAttribLocation(gl['program'], 'a_Position');
        let u_Translation = gl.getUniformLocation(gl['program'], 'u_Translation');
        let u_xformMatrix = gl.getUniformLocation(gl['program'], 'u_xformMatrix');
        let u_xformMatrix_Scale = gl.getUniformLocation(gl['program'], 'u_xformMatrix_Scale');

        let angle = rorate / 360 * 2 * Math.PI;
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        gl.uniform4f(u_Translation, 0.5, 0, 0, 0);
        let type = 1;
        switch (type) {
            case 1:
                gl.uniformMatrix4fv(u_xformMatrix, false, new Float32Array([
                    cosa, sina, 0, 0,
                    -sina, cosa, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ]));
                gl.uniformMatrix4fv(u_xformMatrix_Scale, false, new Float32Array([
                    1.5, 0,   0, 0,
                    0,  1.5,  0, 0,
                    0,   0,   1, 0,
                    0,   0,   0, 1,
                ]));
                break;
            case 2:
                gl.uniformMatrix4fv(u_xformMatrix, false, new Float32Array([
                    2, 0, 0, 0,
                    0, 2, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ]));
                break;
        }
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertex, gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
    }
}


export default TestC;