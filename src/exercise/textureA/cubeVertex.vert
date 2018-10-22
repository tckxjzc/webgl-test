attribute vec4 aPosition;
uniform mat4 uMatri;
void main() {
	gl_Position = uMatri*aPosition;
}
