const SPELER1               = 0;    // o.a. index 0 in de array ronde_scores en totaal_scores
const SPELER2               = 1;    // o.a. index 1 in de array ronde_scores en totaal_scores
const CARD_BACK             = 0;    // Index in de array van speelveld om aan te kunnen geven...
const CARD_FRONT            = 1;    // ...of we de voorkant of de achterkant willen bedoelen

const OFF                   = false;
const ON                    = true;
const YES                   = true;
const NO                    = false;

const NO_CARD_CLICKED       = -1;   // -1 kan geen index waarde zijn, daarom hebben deze waarde hier gekozen
const FIRST_CARD_CLICKED    = 0;    // Index 0 in de array cards_clicked
const LAST_CARD_CLICKED     = 1;    // Index 1 in de array cards_clicked

var clickedcards = ['']; //maakt array voor akaarten die zijn gelikkt
var clickloop = 0;

var speelveld;                      // Element met alle kaarten op het scherm
                                    // Hierin zitten dus alle kaarten op het scherm
                                    // met per kaart een voorkant en een achterkant
var game_button;                    // Element met de button
var score_speler_1 = 0;                 // Element met de score van speler 1 om deze te kunnen tonen
var score_speler_2 = 0;                 // Element met de score van speler 2 om deze te kunnen tonen
var huidige_speler = SPELER1;       // HULPVARIABELE: Welke speler is aan de beurt
var naam_speler_1;                  // Element met de naam van speler 1 om deze te kunnen tonen
var naam_speler_2;                  // Element met de naam van speler 2 om deze te kunnen tonen
var cards = [                       // De nummers zijn tevens de namen van de jpeg
    1, 2, 3, 4, 5, 6, 7, 8,         // afbeeldingen (1.jpg bijvoorbeeld)
    1, 2, 3, 4, 5, 6, 7, 8          // Daarom zien we de nummers twee keer.
];

var totaal_speler_1 = 0;
var totaal_speler_2 = 0;

var cards_clicked = [ NO_CARD_CLICKED, NO_CARD_CLICKED ];   // Welke kaarten heeft een speler al aangeklikt?

var ronde_scores = [ 0, 0 ];    // Hier houden we tijdelijk de rondescores bij
var totaal_scores = [ 0, 0 ];   // Hier houden we de totaal scores per speler bij

window.onload = function(){
    game_button = document.getElementById("game-button");
    score_speler_1 = document.getElementById("score-speler-1");
    score_speler_2 = document.getElementById("score-speler-2");
    totaal_speler_1 = document.getElementById("totaal-speler-1");
    totaal_speler_2 = document.getElementById("totaal-speler-2");
    naam_speler_1 = document.getElementById('name-speler-1');
    naam_speler_2 = document.getElementById('name-speler-2');
    speelveld = document.getElementsByClassName('play-card');

    // Wat coderen we hieronder?
    // Click event koppelen aan de game button
    // Click event koppelen aan de game button
    game_button.addEventListener("click", clickOnGameButton );

};

function resetScores(){
    ronde_scores[0] = 0;
    ronde_scores[1] = 0;
    updateScores();
}
function resetTotal(){
    totaal_scores[0] = 0;
    totaal_scores[1] = 0;
}

function getCardImageTag(card_index){
    return '<img  class="play-card-img" src="img/' + cards[card_index] + ".jpg\" />"
}

function clickOnGameButton(event){
    // Hier coderen we alles wat moet worden gedaan zodra een speler op de game button clicked
    // Click event van de game button programmeren. Wat moet er allemaal gebeuren na een klik?
    if (game_button.innerHTML === 'Start') {
        shuffleCards();                                 // Kaarten schudden
        game_button.innerHTML = 'Reset';                // Knoptekst veranderen
        huidige_speler = Math.round(Math.random());     // Bepalen wie mag beginnen
        showCurrentPlayer();                            // Tonen wie mag beginnen
        for (var index = 0; index < speelveld.length; index++) {    // Met deze lus lopen we langs alle kaarten
            speelveld[index].addEventListener('click', clickOnCard);    // Klikken mogelijk maken
        }
    } else {
        game_button.innerHTML = 'Start';        // Knoptekst veranderen
        resetScores();
        resetTotal();
        naam_speler_1.style.color = "black";    // Kleur speler 1 herstellen naar standaard
        naam_speler_2.style.color = "black";    // Kleur speler 2 herstellen naar standaard

        // Alle open kaarten terug draaien en klikken onmogelijk maken voor alle kaarten
        for (var index = 0; index < speelveld.length; index++) {    // Met deze lus lopen we langs alle kaarten
            if (speelveld[index].classList.contains('flipped')) {   // Is de kaart omgedraaid?
                flipCard(index);                                    // Zo ja, dan terug draaien
            }
            speelveld[index].removeEventListener('click', clickOnCard); // Stop klikken
        }
    }
    
}

function disableClick(){
    for (var index = 0; index < cards.length; index++) {    // Met deze lus lopen we langs alle kaarten
        if(cards[index] === -1){
        }else {
            speelveld[index].removeEventListener('click', clickOnCard); // Stop klikken
        }
    }
}

function enableClick(){
    for (var index = 0; index < cards.length; index++) {    // Met deze lus lopen we langs alle kaarten
        if (cards[index] === -1) {
        } else {
            speelveld[index].addEventListener('click', clickOnCard); // Stop klikken
        }
    }
}

function pairDisable(){
        speelveld[-1].removeEventListener('click', clickOnCard); // Stop klikken
}

function updateScores(){
        score_speler_1.innerHTML = ronde_scores[0];
        score_speler_2.innerHTML = ronde_scores[1];
        totaal_speler_1.innerHTML = totaal_scores[0];
        totaal_speler_2.innerHTML = totaal_scores[1];
}

function checkEnd(card){
    return card === -1;
}

function clickOnCard(event){
    // Voorbereiden van lokale variabelen
    var parentDiv = event.target.parentElement.parentElement;
    var card_back = event.target.parentElement.parentElement.children[0];
    var card_front = event.target.parentElement.parentElement.children[1];
    var cellNumber = event.target.parentElement.parentElement.parentElement.cellIndex;
    var rowNumber = event.target.parentElement.parentElement.parentElement.parentElement.rowIndex;
    var cardNumber = (rowNumber * 4) + cellNumber;
    var delay = 2000;
    /* Wat coderen we hieronder?
        - Als de speler die aan de beurt is (huidige_speler) nog niet
        het maximaal aantal kaarten heeft aangeklikt dan:
        */

    // TODO: kijk als kaart is geklikt

    flipCard(cardNumber);
    cards_clicked[clickloop] = cardNumber;
    clickedcards.unshift(cardNumber);
    clickloop++;


        if (cards_clicked[0] != -1 && cards_clicked[1] != -1){ // kijkt of beide kaarten niet niet aangeklikt zijn, -1 is niet
            disableClick(); // zet klikken uit
            setTimeout(function(){ // 1000 ms delay

                if(cards[cards_clicked[0]] === cards[cards_clicked[1]]){
                    ronde_scores[huidige_speler]++;
                    updateScores();
                    cards[cards_clicked[0]] = -1; // -1 zodat de loop de kaart niet clickable kaan maken
                    cards[cards_clicked[1]] = -1;
                    if(cards.every(checkEnd) == true){
                        endRound();
                    }
                }else{
                    flipCard(cards_clicked[0]);
                    flipCard(cards_clicked[1]); // draait deze om
                }

                if (huidige_speler === 0){
                    huidige_speler = 1;
                } else if (huidige_speler === 1){
                    huidige_speler = 0;
                }

                clickedcards = [];
                clickloop = 0;
                cards_clicked[0] = -1;
                cards_clicked[1] = -1;

                    showCurrentPlayer();
                enableClick(); // zet klik aan
                }, delay);
            }
}

function endRound(){
    if (ronde_scores[0] === ronde_scores[1]){
        var winner = 0;
        alert('Gelijk!');
    }else if(ronde_scores[0] > ronde_scores[1]){
        var winner = 1;
        alert('Speler 1 heeft gewonnen!');
    }else if(ronde_scores[0] < ronde_scores[1]){
        var winner = 2;
        alert('Speler 2 heeft gewonnen!');
    }else{
        var winner = -1;
        alert('Niemand heeft nog gewonnen.');
    }

    cards = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    var nogeenkeer = confirm('Nog een keer?');

    if(nogeenkeer == true){

        if(winner == 1){
            totaal_scores[0]++;
            updateScores();
        }else if(winner == 2){
            totaal_scores[1]++;
            updateScores();
        }

        for(var i = 0; i < cards.length; i++){
            flipCard(i);
        }

        resetScores();
        updateScores();
        shuffleCards();
        enableClick();

        if(winner <= 0){
            huidige_speler = Math.round(Math.random());     // Bepalen wie mag beginnen
            showCurrentPlayer();                            // Tonen wie mag beginnen
        }else if(winner == 1){
            huidige_speler = 1
        } else if(winner ==2){
            huidige_speler = 0;
        }
    }else{
        resetTotal();
        clickOnGameButton();
    }
}

function shuffleCards()
{
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = cards.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}


function showCurrentPlayer(){
    if(huidige_speler === SPELER1) {
        naam_speler_1.style.color = "red";
        naam_speler_2.style.color = "black";
    } else if(huidige_speler === SPELER2) {
        naam_speler_1.style.color = "black";
        naam_speler_2.style.color = "red";
    } else {
        naam_speler_1.style.color = "black";
        naam_speler_2.style.color = "black";
    }
}

function flipCard(card_index){
    if(speelveld[card_index].classList.contains('flipped')) {	// Bevat de kaart al de css class flipped?
        /*
            Ja!
            Dan gaan de kaart weer terugdraaien door de css class flipped weer weg te halen
        */
        speelveld[card_index].classList.remove('flipped');			// Hier halen we de css class flipped weg
        speelveld[card_index].children[CARD_FRONT].innerHTML = "";	// We gaan de img-tag ook weer verwijderen
    }else{
        /*
            Nee!
            Dan draaien we de kaart om zodat de afbeelding zichtbaar wordt.
            Dit doen we door de css class flipped toe te voegen aan de kaart en de tweede div
            in de kaart te vullen met de img-tag van de echte afbeelding
        */
        speelveld[card_index].children[CARD_FRONT].innerHTML = getCardImageTag(card_index);	// Toon de afbeelding
        speelveld[card_index].classList.add('flipped');										// Voeg de css class flipped toe.
    }
}

