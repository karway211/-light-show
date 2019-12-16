const body = document.getElementsByTagName('body')[0];
const root = document.createElement('div');
root.id = 'root';
body.appendChild(root);

for (let i = 0; i < 25; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    root.appendChild(square);
}

const allSquare = document.querySelectorAll('.square');
console.log(allSquare);

allSquare.forEach((el) => {
    const r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256)),
        color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
        el.style.background = color;
});

let button = document.createElement('input');
button.classList.add('root--bth');
button.type = 'button';
button.value = 'play';
body.appendChild(button);


const context = new window.AudioContext(); //
let buffer, source, destination; 

const loadSoundFile = function(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    context.decodeAudioData(this.response,
    function(decodedArrayBuffer) {
      buffer = decodedArrayBuffer;
    }, function(e) {
      console.log('Error decoding file', e);
    });
  };
  xhr.send();
}

const play = function(){
  source = context.createBufferSource();
  source.buffer = buffer;
  destination = context.destination;
  source.connect(destination);
  source.start(0);
}

const stop = function(){
  source.stop(0);
}

loadSoundFile('./assets/audio/Detsl.mp3');

// const analyser = context.createAnalyser();
// analyser.fftSize = 2048;
// bTimeData = new Uint8Array(analyser.frequencyBinCount);
// analyser.getByteTimeDomainData(bTimeData);

button.addEventListener('mouseup', (e) => {
    if (e.target.value === 'play') {
        console.log(e.target.value);
        play();
        button.value = 'stop';
    } else if (e.target.value === 'stop') {
        console.log(e.target.value);
        stop();
        button.value = 'play';
    }
});

