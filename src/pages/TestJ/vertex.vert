attribute vec4 a_Color;
attribute vec4 a_Position;
attribute vec4 a_Normal;
uniform mat4 u_Matrix;
varying vec4 v_Color;
uniform vec3 u_LightColor;
uniform vec3 u_LightDirection;

void main() {
	gl_Position = u_Matrix*a_Position;
	vec3 normal=normalize(vec3(a_Normal));
	float nDotL=max(dot(normalize(u_LightDirection),normal),0.0);
	vec3 diffuse=u_LightColor*a_Color.rgb*nDotL;
	v_Color=vec4(diffuse,a_Color.a);
//	gl_PointSize=20.0;
}
