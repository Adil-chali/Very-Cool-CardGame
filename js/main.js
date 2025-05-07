const playerOneCard= document.getElementById("pOne")
const playerTwoCard= document.getElementById("pTwo")
const winnerWinner= document.querySelector("h2")
let deckId=""
fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
.then(res=>res.json())
.then(data=>{
  deckId=data.deck_id
    console.log(deckId);
    
})
.catch(err=>`error ${err}`)

document.querySelector("button").addEventListener("click",drawTwoCards)

function drawTwoCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        playerOneCard.src=data.cards[0].image
        playerTwoCard.src=data.cards[1].image
        let player1Val= converteToNum(data.cards[0].value)
        let player2Val= converteToNum(data.cards[1].value)
        
        if (player1Val>player2Val) {
            winnerWinner.textContent="PLAYER 1 WON"
        }else if (player1Val<player2Val) {
            winnerWinner.textContent="PLAYER 2 WON"
            
        }else{
            winnerWinner.textContent="ITS WAAAR!"
            
        }
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