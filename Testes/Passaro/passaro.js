// passaro.js

const spritePassaro = new Image();
spritePassaro.src = 'spritePassaro.png';

class Passaro{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.velocidadey = 0;
        this.originalWidth = 929;
        this.originalHeight = 635;
        this.width = this.originalWidth/20;
        this.height = this.originalHeight/20;
        this.peso = 1;
        this.framex = 0;
    }
    update(){

        if(this.y > canvas.height - (this.height * 2)){
            this.y = canvas.height - (this.height * 2);
            this.velocidadey = 0;
        } else{
            this.velocidadey += this.peso;
            this.velocidadey *= 0.9;
            this.y += this.velocidadey;
        }

        if(this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.velocidadey = 0;
        }

        if(spacePressed) this.flap()
           
    }
    draw(){
        ctx.drawImage(spritePassaro, this.framex * this.originalWidth, 0, this.originalWidth, this.originalHeight, 
            this.x - 25, this.y - 12, this.width * 1.5, this.height * 1.5);
    }
    flap(){
        this.velocidadey -= 2;
        if(this.framex >= 7) this.framex = 0;
        else if(frame%4 == 0) this.framex++; 
    }
}

const passaro = new Passaro();

