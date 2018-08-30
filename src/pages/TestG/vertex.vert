attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjMatrix;
varying vec4 v_Color;
void main() {
    mat4 matrix=u_ProjMatrix*u_ViewMatrix;
	gl_Position = matrix*a_Position;
	v_Color=a_Color;
}
