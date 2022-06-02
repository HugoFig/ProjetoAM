const canvas = document.createElement('canvas');
const width = canvas.width = 500
const height = canvas.height = 700
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

const campo = () => {
    ctx.beginPath()
    ctx.arc(width/2, height/2, width/10, 0, 2*Math.PI)
    ctx.moveTo(0, height/2)
    ctx.lineTo(width, height/2)
    //Scoreboard
    ctx.moveTo(width/3, 0)
    ctx.rect(width/3, 0, width/3, height/20)
    ctx.moveTo(width/3, 0)
    ctx.rect(width/3, height-height/20, width/3, height)
    ctx.font = '48px serif'
    ctx.fillText(bot.score, width/15, height/15)
    ctx.fillText(player.score, width/15, height - height/16)
    ctx.stroke()
}

window.addEventListener("mousemove", mouseMoveHandler, false);

class Player {
    constructor () {
        this.x = undefined
        this.y = undefined
        this.prevX = undefined
        this.prevY = undefined
        this.dx = undefined
        this.dy = undefined
        this.score = 0
    }
    draw () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, width*0.05, 0, 2*Math.PI)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.stroke()
    }
    update () {
        this.dx = this.x - this.prevX
        this.dy = this.y - this.prevY
        this.prevX = this.x
        this.prevY = this.y
    }
}

class Bola {
    constructor(){
        this.x = width/2
        this.y = height/2
        this.dx = 0
        this.dy = 0
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, width*.03, 0, 2*Math.PI)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.stroke()
    }

    update() {
        this.x += this.dx
        this.y += this.dy

        const Pa = Math.abs(this.x - player.x)
        const Pb = Math.abs(this.y - player.y)
        const Pc = Math.sqrt(Pa**2 + Pb**2)
        const Ba = Math.abs(this.x - bot.x)
        const Bb = Math.abs(this.y - bot.y)
        const Bc = Math.sqrt(Ba**2 + Bb**2)
        
        //score
        if(this.y - width*.04 < 0) {

            if(this.x > width/3 && this.x < 2*width/3) {
                bot.score++
                bola.x = width/2
                bola.y = height/2
                bola.dx = 0
                bola.dy = -5 //Se marcares vai para o lado do bot
            } 

        } else if (this.y + width*.04 > height) {

            if(this.x > width/3 && this.x < 2*width/3) {
                player.score++
                bola.x = width/2
                bola.y = height/2
                bola.dx = 0
                bola.dy = 5 //Se o bot marcar vai para o teu lado
            } 
        }

        if(this.x + width*.04 > width || this.x - width*.04 < 0) {
            this.dx *= -1
        }
        if(this.y + width*.04 > height || this.y - width*.04 < 0) {
            this.dy *= -1
        }
        if(Pc < width*.04 + width*.05) {
            console.log("hit");
            player.dx === 0 ? this.dx *= -1 : this.dx += player.dx * .5
            player.dy === 0 ? this.dy *= -1 : this.dy += player.dy * .5
        } else if(Bc < width*.04 + width*.05){
            bot.dx === 0 ? this.dx *= -4 : this.dx += bot.dx * 1.5
            bot.dy === 0 ? this.dy *= -4 : this.dy += bot.dy * 1.5
        } 
    
        Math.sign(this.dx) === 1 ? this.dx -= .1 : this.dx += .1
        Math.sign(this.dy) === 1 ? this.dy -= .1 : this.dy += .1
    }
}

class Bot {
    constructor() {
        this.x = width/2
        this.y = height/10
        this.dx = 5
        this.dy = 5
        this.homePosition = {
            x: width/2,
            y: height/10
        }
        this.score = 0
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, width*0.05, 0, 2*Math.PI)
        ctx.fillStyle = "blue"
        ctx.fill()
        ctx.stroke()
    }

    update () {
        if(Math.sign(bola.dy) === 1) {
            this.retract()
        } else if(bola.y < this.y) {
            this.retract()
        } else if(Math.sign(bola.dy) === -1 && bola.y < height/2) {
            this.strike()
        } /*else if(bola.y<bot.y&&bola.x>bot.x-30&&bola.x<bot.x+30) {
            this.strike()
        }*/
    }

    strike() {
        const relativeX = bola.x - this.x
        const relativeY = bola.y - this.y
        const theta = Math.atan(relativeX/relativeY)
        const vector = 10
        this.dx = vector*Math.sin(theta)
        this.dy = vector*Math.cos(theta)

        this.x += this.dx
        this.y += this.dy
    }

    retract() {
        this.dx = 3
        this.dy = 3
        this.x += this.x > this.homePosition.x ? this.dx * -1 : this.dx
        this.y += this.y > this.homePosition.y ? this.dy * -1 : this.dy
    }
}


const player = new Player
const bola = new Bola
const bot = new Bot

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY -canvas.offsetTop;
    //player.x = e.x - window.innerWidth/2 + width/2
    //player.y = e.y - height*0.05;
    if(relativeX > 0 && relativeX < canvas.width) {
        player.x = relativeX;
    }
    //360
   if(relativeY > 0 && relativeY < 700){
        player.y = relativeY;
    }    
    }

function animate() {
    ctx.clearRect(0,0,width,height)

    campo()
    
    player.update()
    player.draw()

    bola.draw()
    bola.update()
    
    bot.draw()
    bot.update()

    if(bot.score == 5) {
        alert("You won!!!!")
        stopAnimation(animate)
    } else if(player.score == 5) {
        alert("You lost? :/")
        stopAnimation(animate)
    }

    requestAnimationFrame(animate)
}
animate();