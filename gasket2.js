var points = [];
var NumTimesToSubdivide = 6;


window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");//나 여기서 그린다?
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
      alert("WebGL isn't available");
      return; // WebGL이 사용할 수 없으면 함수 종료
    }

    /* initial triangle */
var vertices = [
    vec2( -1, -1 ),
    vec2( 0, 1 ),
    vec2( 1, -1 )
    ];
    divideTriangle( vertices[0],vertices[1],vertices[2], NumTimesToSubdivide);
    function triangle( a, b, c ){
        points.push( a, b, c );
        }
        function divideTriangle( a, b, c, count ){
            // check for end of recursion
            if ( count === 0 ) {
            triangle( a, b, c );
            }
            else {
            //bisect the sides
            var ab = mix( a, b, 0.5 );
            var ac = mix( a, c, 0.5 );
            var bc = mix( b, c, 0.5 );
            --count;
            // three new triangles
            divideTriangle( a, ab, ac, count-1 );
            divideTriangle( c, ac, bc, count-1 );
            divideTriangle( b, bc, ab, count-1 );
            }
            }
            var program = initShaders( gl, "vertex-shader", "fragment-shader" );
            gl.useProgram( program );
            var bufferId = gl.createBuffer(); 
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(points),gl.STATIC_DRAW );
    
            var vPosition = gl.getAttribLocation( program, "vPosition" );
            gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( vPosition );
            
            render();
            function render(){
                gl.clear( gl.COLOR_BUFFER_BIT );
                gl.drawArrays( gl.TRIANGLES, 0, points.length );
            }
                   
}

                 