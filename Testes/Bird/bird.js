// bird.js

var parede = document.getElementById("parede");
var espaco = document.getElementById("espaco");
var passaro = document.getElementById("passaro");
var saltar = 0;
var score = 0;

espaco.addEventListener('animationiteration', () => { // cada vez que vez que a animação acaba, ela volta aqui

    var random = Math.random() * 3;

    var top = (random*100) + 150; // vai devolver um número random entre -150 e -450

    espaco.style.top = -(top) + "px"; // define o valor top random para gerar os espaços onde o passaro vai ter de passar

    score++; // incrementa o score cada vez que o passaro passa com sucesso

})

setInterval(function(){ // função que funciona como gravidade para o passaro descer

    var topPassaro = parseInt(window.getComputedStyle(passaro).getPropertyValue("top")); // aqui vai-se buscar o valor atual da posição top do passaro
   
    if(saltar == 0){ // se o passaro não estiver a saltar
        passaro.style.top = (topPassaro + 3) + "px"; // este passo adiciona mais 3 pixeis à posição top do passaro, fazendo-o descer no ecrã
    }

    var paredeLeft = parseInt(window.getComputedStyle(parede).getPropertyValue("left")); // posição left da parede

    var espacoTop = parseInt(window.getComputedStyle(espaco).getPropertyValue("top")); // posição top do espaço

    var inversoTop = -(500 - topPassaro); // dá o valor positivo da posição top

    if((topPassaro > 480) // se o passaro tocar no chão (limite inferior do jogo)                
        || ((paredeLeft < 20) && (paredeLeft > -50) && // ou se a posição left da parede for inferior a 20 pixeis ou superior a -50 pixeis
        ((inversoTop < espacoTop) || (inversoTop > espacoTop + 130)))) // e se o valor de top do passaro for inferior ao do espaço ou superior ao do espaço
    { 
        alert("Game over. Score: " + score); // há um alerta de fim do jogo
        passaro.style.top = 100 + "px"; // e o passaro retoma a possição de top = 100 pixeis
        score = 0; // faz reset do score depois do jogador perder
    }

},10)

function salto(){
    saltar = 1;
    let contarSaltos = 0;
    var intervaloDeSalto = setInterval(function(){
        var topPassaro = parseInt(window.getComputedStyle(passaro).getPropertyValue("top")); // aqui vai-se buscar o valor atual da posição top do passaro
        
        if((topPassaro > 6) && (contarSaltos<15)){ // não permite saltar acima do limite do jogo
        
        passaro.style.top = (topPassaro - 5) + "px"; // este passo retira 5 pixeis à posição top do passaro, fazendo-o subir no ecrã
        
        }

        if(contarSaltos > 20){
            clearInterval(intervaloDeSalto);
            saltar = 0;
            contarSaltos = 0;
        }

        contarSaltos++;

    }, 10)
}