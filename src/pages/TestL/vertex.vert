attribute vec3 aColor;
attribute vec4 aPosition;
attribute vec3 aNormal;
attribute float aPointSize;
uniform mat4 uViewMatrix;
uniform vec3 uLightColor;
uniform vec3 uLightDirection;
varying vec4 vColor;
void main() {
	gl_Position = uViewMatrix*aPosition;
	vec3 nLightDiection=normalize(uLightDirection);
	vec3 nNormal=normalize(aNormal);
	vec3 diffuse=uLightColor*vec3(0,1,1)*max(dot(nLightDiection,nNormal),0.0);
	vColor=vec4(diffuse,1);
//    vColor=vec4(1,0.0,0.9,1);
	gl_PointSize = 10.0;
}
