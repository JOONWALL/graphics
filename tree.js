var gl;
var points;

window.onload = function init(){
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" );
}
// Four Vertices
// Configure WebGL
gl.viewport( 0, 0, canvas.width, canvas.height );//html여기서부터 그린다
gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );//gpu linking

gl.useProgram( program );

var bufferId = gl.createBuffer(); //vertax정보를 gpu에 보내자
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); //다음에나오는 모든내용이 지금 내가만든 버퍼에관련있어


var all = new Float32Array([
    -0.5, 0.5, 
    0.5, 0.5, 
    0, 1,

    -0.5, 0, 
    0.5, 0, 
    0, 0.5
  ]);




// Load the data into the GPU

gl.bufferData( gl.ARRAY_BUFFER, all , gl.STATIC_DRAW );


// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" ); 
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition ); 

var uColor = gl.getUniformLocation (program, "uColor");

gl.clear( gl.COLOR_BUFFER_BIT );

gl.uniform4fv(uColor, [0, 1, 0, 1]);  // Green color
gl.drawArrays(gl.TRIANGLES, 0, 3);   // Draw first triangle

gl.uniform4fv(uColor, [0.5, 0.25, 0, 1]);  // Brown color
gl.drawArrays(gl.TRIANGLES, 3, 3);  // Draw second triangle

};
