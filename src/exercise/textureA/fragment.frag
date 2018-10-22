precision mediump float;
uniform sampler2D uSampler2D;
varying vec2 vTexcoord;
void main() {
	gl_FragColor =vec4(0,1,1,1);
	gl_FragColor = texture2D(uSampler2D,vTexcoord);
}
