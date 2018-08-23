import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadShader} from "../../webgl-tools";

type Props = {
    dispatch
};

const a=require('./a.glsl');
const b=require('./b.glsl');


class Home extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
        if (wbp.dev) {
            console.log(this);
        }

    }
    width=600;
    height=600;
    cas = React.createRef<HTMLCanvasElement>();

    componentDidMount() {
        this.mounted = true;
        const gl: WebGLRenderingContext = this.cas.current.getContext('webgl');
        console.log(gl)
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // this.a(gl)
        this.testB(gl);
    }
    testB(gl:WebGLRenderingContext){
        let program=loadShader(gl,a,b);
        let a_Position=gl.getAttribLocation(program,'a_Position');
        let a_PointSize=gl.getAttribLocation(program,'a_PointSize');
        let u_FragColor=gl.getUniformLocation(program,'u_FragColor');
        // gl.vertexAttrib3f(a_Position,0.5,0.5,0.0);
        gl.vertexAttrib1f(a_PointSize,20.0);


        let vertex=new Float32Array([
            0,0.5,0,
            0.0,0.0,0,
            0.5, 0.5,0,
            // 0.5,0,0,
            // 1,0,0,
            // 0.5,-0.5,0,
        ]);
        let n=vertex.length/3;
        initVertex();
        gl.drawArrays(gl.TRIANGLE_STRIP,0,n);

        function initVertex() {
            let buffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);
            gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(a_Position);
        }
    }

    a(gl: WebGLRenderingContext) {

        let program=loadShader(gl,a,b);
        let a_Position=gl.getAttribLocation(program,'a_Position');
        let a_PointSize=gl.getAttribLocation(program,'a_PointSize');
        let u_FragColor=gl.getUniformLocation(program,'u_FragColor');
        gl.vertexAttrib3f(a_Position,0.5,0.5,0.0);
        gl.vertexAttrib1f(a_PointSize,20.0);
        gl.drawArrays(gl.POINTS,0,1);
        let points=[];
        let rect=this.cas.current.getBoundingClientRect();
        console.log(rect);
        this.cas.current.addEventListener('mousedown',(e:MouseEvent)=>{
            // console.log(e.pageY,e.offsetY,e.clientY,e.layerY);
            let x=(e.layerX - this.width/2)/(this.width/2);
            let y=-(e.layerY -this.height/2)/(this.height/2);
            points.push({x,y});
            draw()
        });
        function draw() {
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.vertexAttrib1f(a_PointSize,20.0);
            for(let i=0;i<points.length;i++){
                let item=points[i];
                gl.vertexAttrib3f(a_Position,item.x,item.y,0);
                gl.uniform4fv(u_FragColor,new Float32Array([
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random()
                ]));
                gl.drawArrays(gl.POINTS,0,1);

            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {

        return <div data-container>

            <canvas ref={this.cas} width={this.width} height={this.height} style={{marginTop:'0',marginLeft:'0'}}>

            </canvas>
        </div>
    }

    /**
     *properties
     */

    /**
     *method
     */

}

export default connect((state) => {
    return state;
}, (dispatch) => {
    return {dispatch}
})(Home);