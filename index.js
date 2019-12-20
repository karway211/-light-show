const body = document.getElementsByTagName('body')[0];
const root = document.createElement('div');
root.id = 'root';
const audio = document.createElement('audio');
// audio.src = './assets/audio/Detsl.mp3';
audio.src = './assets/audio/iranskie.mp3';
// audio.src = './assets/audio/Metallica.mp3';
body.appendChild(audio);
body.appendChild(root);

const shadeOfRed = ['#EB0909', '#FA1E8F', '#E00476', '#FA1E8F', '#F61EFA', '#AD0002', '#AD009C', '#FF0000'];
const shadeOfYellow = ['#DCD809', '#BBB90A', '#F7F340', '#B2AF0A', '#F78B26', '#D87F2B', '#D8B22B', '#C4D82B'];
const shadeOfBlue = ['#2BD882', '#12F684', '#69F6AF', '#69F3F6', '#699AF6', '#246DF3', '#0C4CC4', '#6A71F0'];
const randomColor = [...shadeOfRed, ...shadeOfYellow, ...shadeOfBlue];
const arrayRandElement = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
for (let i = 0; i < 144; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    root.appendChild(square);
}

const allSquare = document.querySelectorAll('.square');
// console.log(allSquare);

allSquare.forEach((el) => {
    // const r = Math.floor(Math.random() * (255)),
    //     g = Math.floor(Math.random() * (255)),
    //     b = Math.floor(Math.random() * (255)),
        // color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  el.style.background = arrayRandElement(randomColor);
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
  arr = new Uint8Array(144);
  analyser.getByteFrequencyData(arr);
  console.log(arr);
  for (let i = 0; i < 144; i++){
    const percent = arr[i] / Math.max.apply(null, arr);
    // console.log(arr[i]);
    allSquare[i].style.filter = `brightness(${percent})`;
    // if(arr[i] < 30) allSquare[i].style.background = arrayRandElement(randomColor);
    // if(arr[i] < 60) allSquare[i].style.background = arrayRandElement(randomColor);
    // if(arr[i] < 90) allSquare[i].style.background = arrayRandElement(randomColor);
    // if(arr[i] < 120) allSquare[i].style.background = arrayRandElement(randomColor);
    // if(arr[i] < 150) allSquare[i].style.background = arrayRandElement(randomColor);
    // if(arr[i] < 180) allSquare[i].style.background = arrayRandElement(randomColor);
    // if(arr[i] < 210) allSquare[i].style.background = arrayRandElement(randomColor);
    if(arr[i] === 255) {
      allSquare.forEach((el) => {
      el.style.background = arrayRandElement(randomColor);
    });
    } ;
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

