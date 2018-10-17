import React, {Component,Fragment} from 'react';


type Props = {};

const vert=require('./a.vert');
const frag=require('./b.frag');
// console.log(frag)
/**
 * 纹理demo
 */
class TestE extends Component<Props> {
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
                style={{backgroundColor:'#fff'}}
                ref={this.cas}
                width={this.width}
                height={this.height}>

            </canvas>
        </Fragment>;
    }

    /**
     *properties
     */
    width=640;
    height=640;
    cas=React.createRef<HTMLCanvasElement>();
    /**
     *method
     */

    start(gl:WebGLRenderingContext){
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        initShaders(gl,vert,frag);
        let a=2;
        let vertex=wbp.dev?new Float32Array([
            -0.8,0.8,0,a,
            -0.8,-0.8,0,0,
            0.8,0.8,a,a,
            0.8,-0.8,a,0
        ]):new Float32Array([
            -0.8,0.8,-0.3,2.7, //4
            -0.8,-0.8,-0.3,-0.3,//3
            0.8,0.8,2.7,2.7,//1
            0.8,-0.8,2.7,-0.3//2
        ]);
        let n=4;//顶点数
        let buffer=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);
        const FSIZE=Float32Array.BYTES_PER_ELEMENT;
        let program=gl['program'];
        let a_Position=gl.getAttribLocation(program,'a_Position');
        let a_TexCoord=gl.getAttribLocation(program,'a_TexCoord');
        let u_RotateMat=gl.getUniformLocation(program,'u_RotateMat');
        gl.uniformMatrix4fv(u_RotateMat,false,new Matrix4(null).setRotate(45,1,1,0).elements)
        gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
        gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4,FSIZE*2);
        gl.enableVertexAttribArray(a_Position);
        gl.enableVertexAttribArray(a_TexCoord);


        //纹理
        let texture1=gl.createTexture();
        let texture2=gl.createTexture();
        let u_Sampler1=gl.getUniformLocation(program,'u_Sampler1');
        let u_Sampler2=gl.getUniformLocation(program,'u_Sampler2');
        let image=new Image();
        let image2=new Image();
        let flag=0;
        function loadTexture(u_Sampler,image,unit,texture){
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);//对纹理图像进行y轴反转
            //开启0号纹理单元
            if(unit==0){
                gl.activeTexture(gl.TEXTURE0);
            }else{
                gl.activeTexture(gl.TEXTURE1);
            }

            //向target绑定纹理对象
            gl.bindTexture(gl.TEXTURE_2D,texture);

            //配置纹理参数
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);//设置成水平和垂直拉伸
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);//设置成水平和垂直拉伸
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);//设置成水平和垂直拉伸
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);//设置成水平和垂直拉伸
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);//设置成水平和垂直拉伸
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);//缩小
            // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);//放大
            //配置纹理图像
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
            //将0号纹理传递给着色器
            gl.uniform1i(u_Sampler,unit);
            //绘制
            gl.clear(gl.COLOR_BUFFER_BIT);
            flag++;
            if(flag>=2){
                gl.drawArrays(gl.TRIANGLE_STRIP,0,n)
            }
            // gl.drawArrays(gl.TRIANGLE_STRIP,0,n)
        }
        image.onload=()=>{
            loadTexture(u_Sampler1,image,0,texture1);
        };
        image2.onload=()=>{
            loadTexture(u_Sampler2,image2,1,texture2);
        };
        image.src=require('assets/images/1394.png');
        image2.src=require('assets/images/2025.jpg');
    }
}


export default TestE;