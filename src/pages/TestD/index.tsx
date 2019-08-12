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
        let a_Color=gl.getAttribLocation(program,'a_Color');
        // gl.vertexAttrib1f(a_PointSize,10.0);
        let vertex = new Float32Array([
            0, 0.5, 10, 1,0,1,
            -0.15, 0.0,20, 1,1,0,
            0.5, 1.03, 30, 0,1,0
        ]);

        let n=3;
        let buffer=gl.createBuffer();
        let fsize=Float32Array.BYTES_PER_ELEMENT;
        console.log(fsize);
        gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,fsize*6,0);
        gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,fsize*6,fsize*2);
        gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,fsize*6,fsize*3);
        gl.enableVertexAttribArray(a_Position);
        gl.enableVertexAttribArray(a_PointSize);
        gl.enableVertexAttribArray(a_Color);
        // gl.drawArrays(gl.TRIANGLE_STRIP,0,n)
        gl.drawArrays(gl.POINTS,0,n)
    }
}


export default TestD;