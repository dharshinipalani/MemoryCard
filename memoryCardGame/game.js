const cards = document.querySelectorAll(".card");
const ele = document.querySelector(".message");
const welcome = document.querySelector(".welcome");


let cardOne , cardTwo ;
let matched = 0;
let disablecheck = false;

function flipCard(e){
    let clickedCard = e.target;
    //adding flip so that card remains flipped it second opened and verified
    clickedCard.classList.add("flip");
    //checking same card is cliked if not goes inside
    if(clickedCard !== cardOne && !disablecheck){
        if(!cardOne){
            return cardOne = clickedCard ;
           }
           cardTwo = clickedCard ;
           disablecheck = true;
           let cardOneImg = cardOne.querySelector("img").src,
           cardTwoImg = cardTwo.querySelector("img").src;

           matchCards(cardOneImg , cardTwoImg);
        }
}

//checking if there exists match card
function matchCards(img1, img2){
    if(img1 == img2){
        matched++;
        if(matched == 8){
            showWinMessage();
            setTimeout(() => {
                return shufflecard();
            },1000);
            
        }
        //after matched removing event click
        cardOne.removeEventListener("click",flipCard);
        cardTwo.removeEventListener("click",flipCard);
        cardOne = cardTwo = "";
        return disablecheck = false;
    }
    //if not close which animation shake
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },400);
    //removing animation after 400seconds
    setTimeout(() => {
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo = "";
        disablecheck = false;
    },1200);
}

//adding Won Message after matching all pairs
function showWinMessage(){
    ele.classList.add("show");
}

//hiding Message until they win
function hideWinMessage(){
    ele.classList.remove("show");
}

//restarting Once won
function restartGame(){
    hideWinMessage();
    cardOne = cardTwo  = "";
    matched = 0;
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card,index) => {
       card.classList.remove("flip");
       let imgTag = card.querySelector("img");
       imgTag.src = `images/img-${arr[index]}.jpg`;
       card.addEventListener("click",flipCard);
    });
}

//shufflng cards randomly
function shufflecard(){
     cardOne = cardTwo  = "";
     matched = 0;
     let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
     arr.sort(() => Math.random() > 0.5 ? 1 : -1);
     cards.forEach((card,index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.jpg`;
        card.addEventListener("click",flipCard);
     });
}

//invoking shuffleCard
shufflecard();

cards.forEach(card => {
    //setting back click event and flipCard
    card.addEventListener("click",flipCard);
});