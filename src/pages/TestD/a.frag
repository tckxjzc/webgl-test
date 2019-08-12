precision mediump float;
varying vec4 v_Color;
varying float v_PointSize;
void main() {
	vec4 color;

//	float d=distance(gl_PointCoord,vec2(0.5,0.5));//求距离中心的距离
//	if(d<=0.5){
//		color=vec4(1.0,0.0,0.0,1.0);
//	}
////	else if(d<0.5){
////		color=vec4(0.0,0.0,1.0,1.0);
////	}
//	else{
//		discard;
//	}
	gl_FragColor = v_Color;
}
