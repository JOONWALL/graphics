var gl;
var points;

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");//나 여기서 그린다?

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
    return; // WebGL이 사용할 수 없으면 함수 종료
  }

  var hexagonVertices = [
    vec2(-0.3,0.6), //v0
    vec2(-0.4,0.8), //v1
    vec2(-0.6,0.8), //v1
    vec2(-0.7,0.6), //v0
    vec2(-0.6,0.4), //v2
    vec2(-0.4,0.4), //v2
    vec2(-0.3,0.6), //v0
  ];
  var triangleVertices = [
    vec2(0.3,0.4), //v2
    vec2(0.7,0.4), //v2
    vec2(0.5,0.8), //v2
  ];
  var colors = [
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0)
  ]
  var stripVertices = [
    vec2(-0.5,0.2), //v2
    vec2(-0.4,0.0), //v2
    vec2(-0.3,0.2), //v2
    vec2(-0.2,0.0), //v2
    vec2(-0.1,0.2), //v2
    vec2(0.0,0.0), //v2
    vec2(0.1,0.2), //v2
    vec2(0.2,0.0), //v2
    vec2(0.3,0.2), //v2
    vec2(0.4,0.0), //v2
    vec2(0.5,0.2), //v2
    //
    vec2(-0.5,-0.3), //v2
    vec2(-0.4,-0.5), //v2
    vec2(-0.3,-0.3), //v2
    vec2(-0.2,-0.5), //v2
    vec2(-0.1,-0.3), //v2
    vec2(0.0,-0.5), //v2
    vec2(0.1,-0.3), //v2
    vec2(0.2,-0.5), //v2
    vec2(0.3,-0.3), //v2
    vec2(0.4,-0.5), //v2
    vec2(0.5,-0.3), //v2
  ];

  gl.viewport(0, 0, canvas.width, canvas.height);//캔버스 얼만큼 쓸건지
  gl.clearColor(0.0, 0.0, 0.0, 1.0);//백그라운드 지금은 검은색
  
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var vPosition = gl.getAttribLocation(program, "vPosition");//앞에건 cpu에서 참조할 id 셰이더 변수랑 연결(attribute)
  var vColor = gl.getAttribLocation(program, "vColor");
  
  //hexagon
  var hexagonBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, hexagonBufferId);
  gl.bufferData(gl.ARRAY_BUFFER,flatten(hexagonVertices), gl.STATIC_DRAW);
  //그리기
  gl.vertexAttribPointer(vPosition,2,gl.FLOAT, false, 0,0);
  gl.enableVertexAttribArray(vPosition);
  gl.drawArrays(gl.LINE_STRIP,0,7);
  ////삼각형 그리기
  var triangleBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
  ///색칠하기
  var triangeColorBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangeColorBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

  

  //독립 삼각형 그리기
  gl.enableVertexAttribArray(vPosition);
  gl.enableVertexAttribArray(vColor);
  gl.drawArrays(gl.TRIANGLES,0,3);
  
  
  //strip vertex buffer
  var stripBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,stripBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(stripVertices),gl.STATIC_DRAW);

  //데이터 버퍼와 셰이더 변수 연관시키기
  //gl.bindBuffer(gl.ARRAY_BUFFER, stripBufferId);
  gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(vPosition);
  //이거왜안떠
  gl.disableVertexAttribArray(vColor);
  //노란색 지정
  gl.vertexAttrib4f(vColor, 1.0 ,1.0 ,0.0 ,1.0);
  //사다리꼴 색칠
  gl.drawArrays(gl.TRIANGLE_STRIP,0,11);

  gl.vertexAttrib4f(vColor,0.0, 0.0, 0.0, 1.0);
  //위에 지그재그
  gl.drawArrays(gl.LINE_STRIP,0,11);
  //아래 지그재그
  gl.drawArrays(gl.LINE_STRIP,11,11);

};