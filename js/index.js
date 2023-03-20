/*
 `<div class="square">1</div>`
  easy = 100
  medium = 81
  hard = 49
  width: `calc(100% / 10);`
  height: `calc(100% / 10);`
 */


  
//creiamo una costante per prendere il form dal documento
const levelForm = document.getElementById('levelForm')

//aggiungiamo un evento al form
levelForm.addEventListener('submit', play);

//funzione per disegnare e dimensionare la cella
function drawSquare(content, sidenumSquares) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${sidenumSquares})`;
    square.style.height =square.style.width;
    square.innerHTML = `<span>${content}</span>`;
    return square;

}

// funzione per generare l'array delle bombe
function generateBombs(bombnum, max) {
    const bombs = [];
    while (bombs.length < 16) {
        const bomb = getRndNumber(1, max);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
}

//funzione per settare il messaggio in uscita ogni volta che premo un quadrato
function setMessage (message) {
    let score = document.getElementById('score')
    score.innerHTML = message;
}

//funzione per mostrare tutte le bombe quando ne premo una
function showAllBombs (bombs) {
    const squares = document.querySelectorAll('.square') 
        for (let square of squares) {
            if (bombs.includes(parseInt(square.innerText))) {
                square.classList.add ('unsafe');
            }
    }
}
console.log(showAllBombs)


//funzione per eseguire il gioco quando premo play
function play (e) {
    e.preventDefault ();
     const playground = document.getElementById('playground');
     playground.innerHTML = '';
     let message =`Seleziona la difficoltà e premi play!;`
     setMessage (message);
     let score = 0;
     let gameOver= false;

     const NUM_BOMBS = 16;
    const level = document.getElementById('level').value;
    //console.log(level)
    let squareNumbers;
    switch (level) {
        case 'easy':
            squareNumbers = 100;
            break;
        case 'medium':
            squareNumbers = 81;
            break;
         case 'hard':
            squareNumbers = 49;
            break;
    };
    //console.log (squareNumbers);



    let maxScore = squareNumbers - NUM_BOMBS;
    //determino il numero di celle per lato usano la radice quadrata
    let squareperRow = Math.sqrt(squareNumbers);
    //console.log(squareperRow)
   
     const bombs = generateBombs (NUM_BOMBS, squareNumbers);

    //genero una cella per ogni numero di celle
    for (let i = 1; i <= squareNumbers; i++) {
          const square = drawSquare(i, squareperRow);
          square.addEventListener('click', function(e) {
          if(!gameOver && ! this.classList.contains('safe'))  {
            if(bombs.includes(parseInt(this.innerText))){
                this.classList.add ('unsafe')
                message = `hai perso! il tuo punteggio è ${score}`;
                gameOver = true;
                showAllBombs(bombs)
            }else {
                this.classList.add ('safe');
                score++;
                message = score === maxScore ? `hai vinto ! il tuo punteggio è: ${score}`: `il tuo punteggio è: ${score}`;
                
            }
             setMessage(message)
          }
            
           
          }) ;

          playground.appendChild(square)
    }
}

