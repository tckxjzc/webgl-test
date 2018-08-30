attribute vec4 a_Position;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjMatrix;
attribute vec4 a_Color;
varying vec4 v_Color;
void main() {
    v_Color=a_Color;
	//gl_Position = u_ViewMatrix * u_ProjMatrix * a_Position;//不遵循交换律
	gl_Position = u_ProjMatrix*u_ViewMatrix * a_Position;
}
