// obstaculos.js

const obstaculosArray = [];

class Obstaculo {
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 20;
        this.bottom = (Math.random() * canvas.height/3) + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = '#187502';
        this.contou = false;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    update(){
        this.x -= velocidadeJogo;
        if(!this.contou && this.x < passaro.x){
            score++;
            this.contou = true;
        }
        this.draw();
    }
}

function tratarObstaculos(){
    if(frame%50 === 0){
        obstaculosArray.unshift(new Obstaculo);
    }
    for(let i = 0; i < obstaculosArray.length; i++){
        obstaculosArray[i].update();
    }
    if(obstaculosArray.length > 20){
        obstaculosArray.pop(obstaculosArray[0]);
    }
}