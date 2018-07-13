import React, {Component} from 'react';


type Props = {};
const frag=require('./a.frag');
const vert=require('./b.vert');
class TestD extends Component<Props> {
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
        this.testA(gl);
    }

    componentWillUnmount() {
        this.mounted = false;

    }


    render() {
        return <React.Fragment>
            <canvas
                style={{backgroundColor:'#ee0'}}
                ref={this.cas}
                width={this.width}
                height={this.height}>

            </canvas>
        </React.Fragment>;
    }

    /**
     *properties
     */
    width=500;
    height=500;
    cas=React.createRef<HTMLCanvasElement>();
    /**
     *method
     */
    testA(gl:WebGLRenderingContext){
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        initShaders(gl,vert,frag);

        let program=gl['program'];
        let a_Position= gl.getAttribLocation(program,'a_Position');
        let a_PointSize= gl.getAttribLocation(program,'a_PointSize');
        // gl.vertexAttrib1f(a_PointSize,10.0);
        let vertex = new Float32Array([
            0, 0.5, 5,
            0.25, 0.25, 15,
            0.5, 0.5, 30
        ]);

        let n=3;
        let buffer=gl.createBuffer();
        let fsize=Float32Array.BYTES_PER_ELEMENT;
        console.log(fsize);
        gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,fsize*3,0);
        gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,fsize*3,fsize*2);
        gl.enableVertexAttribArray(a_Position);
        gl.enableVertexAttribArray(a_PointSize);
        gl.drawArrays(gl.POINTS,0,n)
    }
}


export default TestD;