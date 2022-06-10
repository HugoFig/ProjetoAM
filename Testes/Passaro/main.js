// main.js
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angulo = 0;
let hue = 0;
let frame = 0;
let score = 0;
let velocidadeJogo = 2;

const fundo = new Image();
fundo.src = 'background.png';

const background = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function tratarFundo(){
    if(background.x1 <= - background.width + velocidadeJogo) background.x1 = background.width;
    else (background.x1 -= velocidadeJogo);
    if(background.x2 <= -background.width + velocidadeJogo) background.x2 = background.width
    else(background.x2 -= velocidadeJogo);
    ctx.drawImage(fundo, background.x1, background.y, background.width, background.height);
    ctx.drawImage(fundo, background.x2, background.y, background.width, background.height);
}

function animar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tratarFundo();
    tratarObstaculos();
    passaro.update();
    passaro.draw();
    ctx.fillStyle = 'black'
    ctx.font = '50px Georgia'
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    tratarColisoes();
    if(tratarColisoes()) return;
    requestAnimationFrame(animar);
    frame++;
}
animar();

window.addEventListener('keydown', function(e){
    if(e.code === 'Space') spacePressed = true;
    passaro.framex = 0;
});

window.addEventListener('keyup', function(e){
    if(e.code === 'Space') spacePressed = false;
});

const colisao = new Image();
colisao.src = 'colisao.png';

function tratarColisoes(){
    for(let i = 0; i < obstaculosArray.length; i++){
        if(passaro.x < obstaculosArray[i].x + obstaculosArray[i].width && 
            passaro.x + passaro.width > obstaculosArray[i].x && 
            ((passaro.y < 0 + obstaculosArray[i].top && passaro.y + passaro.height > 0) ||
            (passaro.y > canvas.height - obstaculosArray[i].bottom &&
            passaro.y + passaro.height < canvas.height))){
                ctx.drawImage(colisao, passaro.x, passaro.y, 50, 50);
                ctx.font = "25px Georgia";
                ctx.fillStyle = 'black';
                ctx.fillText('Fim do Jogo, o seu score é: ' + score, 160, canvas.height / 2 - 10);

                return true;
            }
    }
}
