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
    ctx.stroke()
}

window.addEventListener("mousemove", (e) => {
    player.x = e.x - window.innerWidth/2 + width/2
    player.y = e.y - height*0.05;
})

class Player {
    constructor () {
        this.x = undefined
        this.y = undefined
        this.prevX = undefined
        this.prevY = undefined
        this.dx = undefined
        this.dy = undefined
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
        this.dx = 5
        this.dy = 5
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, width*0.04, 0, 2*Math.PI)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.stroke()
    }

    update() {
        this.x += this.dx
        this.y += this.dy

        const a = Math.abs(this.x - player.x)
        const b = Math.abs(this.y - player.y)
        const c = Math.sqrt(a**2 + b**2)
    
        if(this.x + width*0.04 > width || this.x - width*0.04 < 0) {
            this.dx *= -1
        }
        if(this.y + width*0.04 > height || this.y - width*0.04 < 0) {
            this.dy *= -1
        }
        if(c < width*0.04 + width*0.05) {
            player.dx === 0 ? this.dx *= -1 : this.dx += player.dx * 0.5
            player.dy === 0 ? this.dy *= -1 : this.dy += player.dy * 0.5
        }
    
        Math.sign(this.dx) === 1 ? this.dx -= 0.1 : this.dx += 0.1
        Math.sign(this.dy) === 1 ? this.dy -= 0.1 : this.dy += 0.1
    }
}

/*function colisoes() {
    this.x += this.dx
    this.y += this.dy

    const a = Math.abs(this.x - player.x)
    const b = Math.abs(this.y - player.y)
    const c = Math.sqrt(a**2 + b**2)
    
    if(this.x + width*0.04 > width || this.x - width*0.04 < 0) {
         this.dx *= -1
    }
    if(this.y + width*0.04 > height || this.y - width*0.04 < 0) {
        this.dy *= -1
    }
    if(c < width*0.04 + width*0.05) {
        player.dx === 0 ? this.dx *= -1 : this.dx += player.dx * 0.5
        player.dy === 0 ? this.dy *= -1 : this.dy += player.dy * 0.5
    }
    
    Math.sign(this.dx) === 1 ? this.dx -= 0.1 : this.dx += 0.1
    Math.sign(this.dy) === 1 ? this.dy -= 0.1 : this.dy += 0.1
}*/

const player = new Player
const bola = new Bola

function animate() {
    ctx.clearRect(0,0,width,height)

    campo()

    player.draw()
    bola.draw()

    requestAnimationFrame(animate)
}
animate();