var gl;
var points;

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");//나 여기서 그린다?
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
    return; // WebGL이 사용할 수 없으면 함수 종료
  }

  gl.viewport(0, 0, canvas.width, canvas.height);//캔버스 얼만큼 쓸건지
  gl.clearColor(0.0, 0.0, 0.0, 1.0);//백그라운드 지금은 검은색

  var program = initShaders(gl, "vertex-shader", "fragment-shader");//우리의언어를gpu용으 이 vertex, fragment-shader사용할거임 여기서 에러나면 팝업창
  gl.useProgram(program);
  
  
  for(var ii = 0; ii < 50; ii++){
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);

    setRectangle(gl,randomInt(300),randomInt(300),randomInt(300),randomInt(300));
    
    var fColor = gl.getUniformLocation(program, "fColor");
    
    //해상도 전달
    var vResolution = gl.getUniformLocation(program,"vResolution");
    gl.uniform2f(vResolution, gl.canvas.width, gl.canvas.height);

    gl.uniform4f(fColor, Math.random(),Math.random(),Math.random(),1);
    
    
    var vPosition = gl.getAttribLocation(program, "vPosition");//앞에건 cpu에서 참조할 id 셰이더 변수랑 연결(attribute)
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

   
    
    
    gl.drawArrays(gl.TRIANGLES,0,6);
  }


  function randomInt(range){
    return Math.floor(Math.random() * range);
  }


  function setRectangle(gl,x,y,width,height){
    var x1 =x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
        x1,y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
        ]),gl.STATIC_DRAW);
   
  }
  

};