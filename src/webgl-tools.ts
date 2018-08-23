
function compileShader(gl: WebGLRenderingContext, type, source): WebGLShader {
    // Create shader object
    let shader = gl.createShader(type);

    // Set the shader program
    gl.shaderSource(shader, source);

    // Compile the shader
    gl.compileShader(shader);

    // Check the result of compilation
    let status=gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(!status){
       let error= gl.getShaderInfoLog(shader);
       gl.deleteShader(shader);
       throw new Error(`Failed to compile shader: ${error}`);
    }
    return shader;
}

export function loadShader(gl: WebGLRenderingContext, vertex, frag): WebGLProgram {
    // Create shader object
    let vertexShader =compileShader(gl,gl.VERTEX_SHADER,vertex);
    let fragmentShader = compileShader(gl,gl.FRAGMENT_SHADER,frag);

    // Create a program object
    let program = gl.createProgram();

    // Attach the shader objects
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);

    // Link the program object
    gl.linkProgram(program);

    // Check the result of linking
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        let error = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        throw new Error(`Failed to link program:  ${error}`);
    }
    gl.useProgram(program);
    return program;
}