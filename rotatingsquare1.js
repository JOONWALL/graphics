var gl;
var theta = 0.0;
var thetaLoc;

window.onload = function init(){
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" );
}
// Four Vertices
var vertices = [
vec2( -0.5, 0.5 ), // v0
vec2( -0.5, -0.5 ), // v1
vec2( 0.5, 0.5 ), // v2
vec2( 0.5, -0.5), // v3
//vec2( -0.5, 0.5) // v3
];

// Configure WebGL
gl.viewport( 0, 0, canvas.width, canvas.height );//html여기서부터 그린다
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );//gpu linking
gl.useProgram( program );
// Load the data into the GPU
var bufferId = gl.createBuffer(); //vertax정보를 gpu에 보내자
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); //다음에나오는 모든내용이 지금 내가만든 버퍼에관련있어
gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" ); 
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition ); 

thetaLoc = gl.getUniformLocation(program, "theta");

render();
};
function render() {
gl.clear( gl.COLOR_BUFFER_BIT );

theta += 0.1;
gl.uniform1f(thetaLoc, theta);

gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); // 0, 1, 2, 2, 1, 3
requestAnimationFrame(render);
}