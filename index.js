const body = document.getElementsByTagName('body')[0];
const root = document.createElement('div');
root.id = 'root';
const audio = document.createElement('audio');
// audio.src = './assets/audio/Detsl.mp3';
audio.src = './assets/audio/iranskie.mp3';
// audio.src = './assets/audio/Metallica.mp3';

const wrapInst = document.createElement('div');
wrapInst.classList.add('wrap');

const wrapSquares = document.createElement('div');
wrapSquares.classList.add('wrap--squares');


let button = document.createElement('input');
button.classList.add('root--bth');
button.type = 'button';
button.value = 'play';

const wrapColor = document.createElement('div');
wrapColor.classList.add('wrap--color');

const redInp = document.createElement('div');
redInp.classList.add('inp');
redInp.classList.add('red');
redInp.style.backgroundColor = 'red';
const yellowInp = document.createElement('div');
yellowInp.classList.add('inp');
yellowInp.classList.add('yellow');
yellowInp.style.backgroundColor = 'yellow';
const blueInp = document.createElement('div');
blueInp.classList.add('inp');
blueInp.classList.add('blue');
blueInp.style.backgroundColor = 'blue';
const randomInp = document.createElement('div');
randomInp.classList.add('inp');
randomInp.classList.add('random');
randomInp.style.backgroundColor = 'black';
randomInp.textContent = 'R';


const wrapGrid = document.createElement('div');
wrapGrid.classList.add('wrapgrid');
const inpLenGrid = document.createElement('input');
inpLenGrid.classList.add('inp--lengrid');
inpLenGrid.setAttribute('type', 'number');
const spanGrid = document.createElement('span');
spanGrid.classList.add('span--grid');
spanGrid.textContent = 'X';
const inpHeiGrid = document.createElement('input');
inpHeiGrid.classList.add('inp--heigrid');
inpHeiGrid.setAttribute('type', 'number');
const buttonGrid = document.createElement('button');
buttonGrid.classList.add('button--grid');
buttonGrid.textContent = 'GO';
wrapGrid.append(inpLenGrid, spanGrid, inpHeiGrid, buttonGrid);

wrapColor.append(redInp, yellowInp, blueInp, randomInp);

wrapInst.append(wrapSquares, button)
root.append(audio, wrapGrid, wrapInst, wrapColor)
body.append(root);

let animation = true;

const shadeOfRed = ['#EB0909', '#FA1E8F', '#E00476', '#FA1E8F', '#F61EFA', '#AD0002', '#AD009C', '#FF0000'];
const shadeOfYellow = ['#DCD809', '#BBB90A', '#F7F340', '#B2AF0A', '#F78B26', '#D87F2B', '#D8B22B', '#C4D82B'];
const shadeOfBlue = ['#2BD882', '#12F684', '#69F6AF', '#69F3F6', '#699AF6', '#246DF3', '#0C4CC4', '#6A71F0'];
const randomColor = [...shadeOfRed, ...shadeOfYellow, ...shadeOfBlue];
let temeColor = randomColor;
redInp.addEventListener('click', (e) => {
    temeColor = shadeOfRed;
    temeFunc(temeColor);
});
yellowInp.addEventListener('click', (e) => {
    temeColor = shadeOfYellow;
    temeFunc(temeColor);
});
blueInp.addEventListener('click', (e) => {
    temeColor = shadeOfBlue;
    temeFunc(temeColor);
});
randomInp.addEventListener('click', (e) => {
    temeColor = randomColor;
    temeFunc(temeColor);
});

const arrayRandElement = (arr) => {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

let n = 144;

for (let i = 0; i < n; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    wrapSquares.appendChild(square);
}
let allSquare = document.querySelectorAll('.square');
// console.log(allSquare);

const temeFunc = (temeColor) => {
    allSquare.forEach((el) => {
        el.style.background = arrayRandElement(temeColor);
    });
}

temeFunc(temeColor);

buttonGrid.addEventListener('click', () => {
        while (wrapSquares.firstChild) {
            wrapSquares.removeChild(wrapSquares.firstChild);
        }
        n = inpLenGrid.value * inpHeiGrid.value;
        console.log(n);
        wrapSquares.style.width = `${inpLenGrid.value * 50}px`;

        for (let i = 0; i < n; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            wrapSquares.appendChild(square);
        }
        allSquare = document.querySelectorAll('.square');
        temeFunc(temeColor);
        ddd(n)
    });

let context, analyser, src, arr;


const ddd = (n) => {

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
        arr = new Uint8Array(n);
        analyser.getByteFrequencyData(arr);
        console.log(arr);
        for (let i = 0; i < n; i++){
            const percent = arr[i] / Math.max.apply(null, arr);
            // console.log(arr[i]);
            allSquare[i].style.filter = `brightness(${percent})`;
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
}

if (animation === true) ddd(n);
