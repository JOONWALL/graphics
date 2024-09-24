var gl;
var points;

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");//나 여기서 그린다?
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
    return; // WebGL이 사용할 수 없으면 함수 종료
  }

  var vertices = new Float32Array([
    -1, -1, 
    -0.5, 1, 
    0, -1,

    0, -1, 
    0.5, 1, 
    1, -1
  ]);

  gl.viewport(0, 0, canvas.width, canvas.height);//캔버스 얼만큼 쓸건지
  gl.clearColor(0.0, 0.0, 0.0, 1.0);//백그라운드 지금은 검은색

  var program = initShaders(gl, "vertex-shader", "fragment-shader");//우리의언어를gpu용으 이 vertex, fragment-shader사용할거임 여기서 에러나면 팝업창
  gl.useProgram(program);

  var bufferId = gl.createBuffer(); //gpu버퍼를 만들고 cpu가 이 버퍼아이디를 참조
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);//아랫줄 목적지 설정 - 다음에 gl버퍼관련 api 할거 다 여기로 보낸다
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);//버텍스 위치데이터 버퍼로 보냄 static은 W/R구분하여 메모리 최적화

  var vPosition = gl.getAttribLocation(program, "vPosition");//앞에건 cpu에서 참조할 id 셰이더 변수랑 연결(attribute)
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);//float형태로 2개씩만 보내준다.
  gl.enableVertexAttribArray(vPosition);//array 점핑하는 역할

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);  //배열 0부터 6개 그리기
}
