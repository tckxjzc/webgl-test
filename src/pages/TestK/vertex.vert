attribute vec3 aColor;
attribute vec4 aPosition;
attribute float aPointSize;
uniform mat4 uViewMatrix;
varying vec4 vColor;
void main() {
	gl_Position = aPosition*uViewMatrix;
	gl_PointSize = aPointSize;
	vColor = vec4(aColor,1);
}
