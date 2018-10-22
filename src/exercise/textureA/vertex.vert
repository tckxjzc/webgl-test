attribute vec4 aPosition;
attribute vec2 aTexcoord;
varying vec2 vTexcoord;
uniform mat4 uMatri;
void main() {
	gl_Position =uMatri*aPosition;
	vTexcoord=aTexcoord;
}
