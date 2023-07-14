const Gameboard = (() => {
  let boardArray = ["","","","","","","","",""]
  let winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  let p1
  let p2
  let currentPlayer;
  let count = 0;
  let roundWon = true
  let clearBoard = document.querySelectorAll('.gameWipe')
  let region = document.querySelectorAll('.region')
  let gameResult = document.querySelector('.results')
  let startButton = document.getElementById('startButton') 
  
  let playerMaker = (name, piece) => {
    return {name, piece}
  }
  
  let startGame = () => {
    roundWon = false
    let player1 = document.getElementById('player1').value
    let player2 = document.getElementById('player2').value
    p1 = playerMaker(player1, "X")
    p2 = playerMaker(player2, "O")   
  }

  let playerChoice = (item) => {
    if (roundWon === false) {
      let input = item.target.id
      currentPlayer = item.target
      let x = "X"
      let o = "O"
    
      if (item.target.innerText == ""){
        let choice = (count %2 == 0)
          ? boardArray.splice(input, 1, p1.piece)
          : boardArray.splice(input, 1, p2.piece)
        count++
      }
     render()
     winnerCheck()
    }
 }
    
  let boardWipe = () => {
    boardArray = ["","","","","","","","",""]
    gameResult.innerText = ""
    document.getElementById("player1").value = ""
    document.getElementById("player2").value = ""
    count = 0
    render();
  }
  
  let render = () => {
     for (let i = 0; i < boardArray.length; i++) {
       region[i].innerText = boardArray[i]}
  }
  
  let winnerCheck = () => {
    roundWon = false
    
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = boardArray[winCondition[0]];
        let b = boardArray[winCondition[1]];
        let c = boardArray[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
      
        if (a === b && b === c) {
          roundWon = true;
          if (currentPlayer.innerText == "O") {
            gameResult.innerText = ("The winner is: " + p2.name)
          }
          
          if (currentPlayer.innerText == "X") {
            gameResult.innerText = ("The winner is: " + p1.name)
          }
          break 
        }
    }
    tieCheck()
  }
  
  let tieCheck = () => {
     for (let i = 0; i < boardArray.length; i++) {
       if (boardArray[i] == "") {
         return false
       }
     }
    gameResult.innerText = ("Tie!")
  }
  
  startButton.addEventListener("click", startGame)

  region.forEach((item) => {
    item.addEventListener("click", playerChoice)
  });
  
  clearBoard.forEach((item) => {
    item.addEventListener("click", boardWipe)
  });   
})();
