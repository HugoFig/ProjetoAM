class Passaro{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.velocidadey = 0;
        this.width = 20;
        this.height = 20;
        this.peso = 1;
    }
    update(){

        if(this.y > canvas.height - (this.height * 3)){
            this.y = canvas.height - (this.height * 3) ;
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
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    flap(){
        this.velocidadey -= 2;
    }
}

const passaro = new Passaro();

