attribute vec4 a_Position;
attribute vec2 a_TexCoord;
uniform mat4 u_RotateMat;
varying  vec2 v_TexCoord;
void main() {
	gl_Position = a_Position;
	float angle=radians(45.0);
	float cosa=cos(angle);
	float sina=sin(angle);
	float x=a_TexCoord.x*cosa-a_TexCoord.y*sina;
	float y=a_TexCoord.x*sina+a_TexCoord.y*cosa;

	v_TexCoord=vec2(x,y);
//	v_TexCoord=a_TexCoord;
//    v_TexCoord=vec2(vec4(a_TexCoord,0.0,0.0)*u_RotateMat);
}
