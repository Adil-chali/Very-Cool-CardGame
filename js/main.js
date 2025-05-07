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
        
    })
}