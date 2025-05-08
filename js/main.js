document.getElementById("New-Game").addEventListener("click",startNewGame)
document.getElementById("draw-cards").addEventListener("click",drawTwoCards)
const playerOneCard= document.getElementById("pOne")
const playerTwoCard= document.getElementById("pTwo")
const winnerWinner= document.querySelector("h2")
let deckId=""
let winnerText=""
if (localStorage.getItem("currentDeck")) {
    deckId=localStorage.getItem("currentDeck")
    playerOneCard.src=localStorage.getItem("p1card",)
    playerTwoCard.src=localStorage.getItem("p2card")
    winnerText= localStorage.getItem("lastWinner")
    winnerWinner.textContent=winnerText
}
function startNewGame() {
    
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res=>res.json())
    .then(data=>{
      deckId=data.deck_id
      console.log(deckId);
      localStorage.clear()
      localStorage.setItem("currentDeck",deckId)
      playerOneCard.src=""
      playerTwoCard.src=""
      winnerWinner.textContent=""
        
    })
    .catch(err=>`error ${err}`)
}

function drawTwoCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        localStorage.setItem("p1card",data.cards[0].image)
        localStorage.setItem("p2card",data.cards[1].image)
        localStorage.setItem("winner",data.cards[1].image)
        playerOneCard.src=data.cards[0].image
        playerTwoCard.src=data.cards[1].image
        let player1Val= converteToNum(data.cards[0].value)
        let player2Val= converteToNum(data.cards[1].value)
        
        if (player1Val>player2Val) {
            winnerText="PLAYER 1 WON"
            winnerWinner.textContent="PLAYER 1 WON"
        }else if (player1Val<player2Val) {
            winnerText="PLAYER 2 WON"
            
        }else{
            winnerText="ITS WAAAR!"
            
        }
        winnerWinner.textContent=winnerText
        localStorage.setItem("lastWinner", winnerText)
    })
}
function converteToNum(val) {
if (val==="KING") {
    return 13
} else if (val==="ACE") {
    return 14
} else if(val==="QUEEN") {
    return 12
}   else if (val==="JACK") {
    return 11
}else{
    return Number(val)
}
}
