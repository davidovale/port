function draw() {
    let canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");

      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (10, 10, 55, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (30, 30, 55, 50);
    }
  }

  let q = document.getElementById('quadrado');
  let btn = document.getElementById('btn');
  let btnD = document.getElementById('btn-d');
let red = document.getElementById('btn-red');

btn.addEventListener('click', function(){
  q.style.transition = 'all 1s' // aplico transicao para qualquer elemento
  q.style.width= '200px' // mudo a largura do elemento
  q.style.height= '150px' // mudo a altura do elemento
});

btnD.addEventListener('click', function(){
    q.style.transition = 'all 1s' // aplico transicao para qualquer elemento
    q.style.width= '100px' // mudo a largura do elemento
    q.style.height= '75px' // mudo a altura do elemento
  });

red.addEventListener('click', function(){
  q.classList.add('red');
});


function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }