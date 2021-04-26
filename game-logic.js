const cards = document.querySelectorAll('.memory-card');


// need 3 varebale 2 for recognize  cards and one to know if card is fliped 
let cardFliped = false;
let firstCard;
let secondeCard;
    // if i want to stop the game for a while
let lockBoard = false;

// for inteval
let flipBackCads;


function flipCard() {
    if (lockBoard) return
    //  "this" is the callback card (the card user click on)
    if (firstCard == this) return;
    // make sure user cant flip more then two cards
    if(firstCard && secondeCard) return
    // flip card 
    this.classList.toggle('flip');

    // update cardFliped & "this" is the first card now
    if (!cardFliped) {
        cardFliped = true;
        firstCard = this;
        // to save else
        return;
    }
    //if cardFlipes is true:
    secondeCard = this;
    cardFliped = false;
    checkFormatch();


}
// if card match keep flipped else unflipped and rest varebales
const checkFormatch = () => {
    //check for same id-frame arttu
    if (secondeCard.dataset.frame === firstCard.dataset.frame) {
        firstCard.removeEventListener('click', flipCard);
        secondeCard.removeEventListener('click', flipCard);
        resetBoard();
    } else {
        // need some varebal to lock the board while i flipeed back the cards after 1.5 seconde 
        lockbaord = true
        flipBackCads = setInterval(() => {
            firstCard.classList.remove('flip');
            secondeCard.classList.remove('flip');
            resetBoard();
        }, 1500);

    }
}

// stop the flipped card interval and make suer user can keep play
const resetBoard = () => {
    clearInterval(flipBackCads);
    firstCard = null;
    secondeCard = null;
    lockBoard = false;
    cardFliped = false;

}

const shuffle = () => {
    cards.forEach((card) => {

        //There is 12 cards in the game, so we will iterate through them, 
        //generate a random number between 0 and 11 and assign it to the flex-item order property:

        let randomNumner = Math.floor(Math.random() * 12);
        card.style.order = randomNumner
    })
}

//flip each card and then rest board suffle cards and make them clickble

const restart = () => {
    cards.forEach((card) => {
        card.classList.remove('flip')
    });
    setTimeout(() => {
        resetBoard();
        shuffle()
        cards.forEach(card => card.addEventListener('click', flipCard));
    }, 1000)
}


cards.forEach((card) => { card.addEventListener('click', flipCard) })