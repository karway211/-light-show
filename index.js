const body = document.getElementsByTagName('body')[0];
const root = document.createElement('div');
root.id = 'root';
const audio = document.createElement('audio');
// audio.src = './assets/audio/Detsl.mp3';
audio.src = './assets/audio/Metallica.mp3';
body.appendChild(audio);
body.appendChild(root);


for (let i = 0; i < 50; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    root.appendChild(square);
}

const allSquare = document.querySelectorAll('.square');
// console.log(allSquare);

allSquare.forEach((el) => {
    const r = Math.floor(Math.random() * (255)),
        g = Math.floor(Math.random() * (255)),
        b = Math.floor(Math.random() * (255)),
        color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
        el.style.background = color;
});

let button = document.createElement('input');
button.classList.add('root--bth');
button.type = 'button';
button.value = 'play';
body.appendChild(button);

let context, analyser, src, arr;

function preparation(){
  context = new AudioContext();
  analyser = context.createAnalyser();
  src = context.createMediaElementSource(audio);
  src.connect(analyser);
  analyser.connect(context.destination);
  loop();
}
function loop(){
  if(!audio.paused){
    window.requestAnimationFrame(loop);
  }
  arr = new Uint8Array(50);
  analyser.getByteFrequencyData(arr);
  console.log(arr);
  for (let i = 0; i < 50; i++){
    const fg = arr[i] / Math.max.apply(null, arr);
    // console.log(arr[i]);
    // allSquare[i].style.opacity = `${fg}`
    allSquare[i].style.filter = `brightness(${fg})`;
  }
}

button.onclick = (e) => {
  // console.log(e);
  if(!context) {
    preparation();
  }
  if(audio.paused){
    audio.play();
    button.value = 'pause';
    loop();
  } else {
    audio.pause();
    button.value = 'play';
  }
}

