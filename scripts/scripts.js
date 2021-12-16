const humanScore = document.getElementById("human");
const computerScore = document.getElementById("computer");
const rollButton = document.getElementById('roll');
const resetButton = document.getElementById('reset');
const image = document.querySelectorAll("img");

//defines a pair of dice 
class Dice{
    constructor(){
        
        //prepare array to store all pairs of die values       
        this.pairs  = [];    

        //array to store a single pair of die values
        this.pair = [];

        //array to store the values of a die
        this.values = [1, 2, 3, 4, 5, 6];

        //constructs every possible die value pair and pushes to this.pairs array
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < 6; j++) {
                this.pair.push(this.values[i]);
                this.pair.push(this.values[j]);
                this.pairs.push(this.pair)
                this.pair = [];
            }
        }
    }
}


//defines all types of players (human or computer)
class Player {

    constructor(name){
        //a string representing a name
        this.name = name;
        
        //prepare a variable to store the total score
        this.totalScore = 0;

    }

}

//object functions

//randomly returns an array of a valid combination of dice
Dice.prototype.rollDice = function() {
    return this.pairs[Math.floor(Math.random() * 36)];
}

//calculates and returns a players score for the round based on game rules and stores it in this.totalScore
Player.prototype.calculateScore = function(diceValues) {
    
    let roundScore;

    if (diceValues[0] == 1 || diceValues[1] == 1) {
        roundScore = 0;
    }

    else if (diceValues[0] == diceValues[1]) {
        roundScore = (diceValues[0] + diceValues[1]) * 2;
    }

    else {
        roundScore = diceValues[0] + diceValues[1]
    }

    this.totalScore += roundScore;
    return roundScore;

}

//define objects
let pairsOfDiceValues = new Dice;
let humanPlayer = new Player("Human");
let computerPlayer = new Player("Computer");

//listens for a click event and does roll if one occurs
rollButton.addEventListener('click', roll);

//counts number of rounds, if number of rounds reaches 3, game will end and total scores will be displayed
let roundCount = 0;

//initally hides reset button, only allows player to reset after game is finished
resetButton.style.display = "none";

//function that rolls a pair of dices, displays the rolled pair, displays the round score, and displays the reset button, winner, and total score after 3 rounds
function roll(){
    image.forEach(function(die){
        die.classList.add("shake");
    });
    setTimeout(function(){
        image.forEach(function(die){
            die.classList.remove("shake");
        });
        if (roundCount < 3) {
            let humanRoll = pairsOfDiceValues.rollDice();
            let computerRoll = pairsOfDiceValues.rollDice();
            document.querySelector("#die-1").setAttribute("src", `images/die-${humanRoll[0]}.png`);
            document.querySelector("#die-2").setAttribute("src", `images/die-${humanRoll[1]}.png`);
            document.querySelector("#die-3").setAttribute("src", `images/die-${computerRoll[0]}.png`);
            document.querySelector("#die-4").setAttribute("src", `images/die-${computerRoll[1]}.png`);
            humanScore.innerHTML = `<p>${humanPlayer.calculateScore(humanRoll)}</p>`;
            computerScore.innerHTML = `<p>${computerPlayer.calculateScore(computerRoll)}</p>`;
            roundCount++;
        }
    },
    1000
    );

    if (roundCount >= 3) {
        image.forEach(function(die){
            die.classList.remove("shake");
        });
        rollButton.style.display = "none";
        resetButton.style.display = "block";
        humanScore.innerHTML = `<p>${humanPlayer.totalScore}</p>`;
        computerScore.innerHTML = `<p>${computerPlayer.totalScore}</p>`;
        out.innerHTML += `The winner is ${humanPlayer.totalScore > computerPlayer.totalScore ? "Human" : "Computer"}!`
    }
}

//listens for a click event and does reset if one occurs
resetButton.addEventListener('click', reset);

//resets the game by refreshing page
function reset(e) {
    location.reload();
}
