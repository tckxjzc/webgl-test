
attribute vec4 a_Position;
uniform vec4 u_Translation;
uniform mat4 u_xformMatrix;
uniform mat4 u_xformMatrix_Scale;
void main() {
	gl_Position = u_xformMatrix*u_xformMatrix_Scale*a_Position;
}
