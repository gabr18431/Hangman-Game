const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
    let span = document.createElement("span");

    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
    programming: [
        "php",
        "javascript",
        "go",
        "scala",
        "fortran",
        "r",
        "mysql",
        "python",
    ],
    movies: [
        "Prestige",
        "Inception",
        "Parasite",
        "Interstellar",
        "Whiplash",
        "Memento",
        "Coco",
        "Up",
    ],
    people: [
        "Albert Einstein",
        "Hitchcock",
        "Alexander",
        "Cleopatra",
        "Mahatma Ghandi",
    ],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get random properties

let allKeys = Object.keys(words);

let randomPropertyNum = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropertyNum];
let randomPropValue = words[randomPropName];
let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNum];
document.querySelector(".category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach((letter) => {
    let emptySpan = document.createElement("span");

    if (letter === " ") {
        emptySpan.className = "with-space";
    }

    lettersGuessContainer.appendChild(emptySpan);
});

guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
    let theStatus = false; // الاختيار غلط
    if (e.target.classList.contains("letter-box")) {
        e.target.classList.add("clicked");

        let clickedLitter = e.target.innerHTML.toLowerCase();
        // console.log(clickedLitter);
        let wordLetters = Array.from(randomValueValue.toLowerCase());
        wordLetters.forEach((wordLetter, wordIndex) => {
            if (clickedLitter == wordLetter) {
                theStatus = true; // تم اختيار الحرف صح
                guessSpans.forEach((span, spanIndex) => {
                    if (spanIndex === wordIndex) {
                        span.innerHTML = wordLetter;
                        span.classList.add("success");
                    }
                });
            }
        });
        if (theStatus !== true) {
            wrongAttempts++;
            document.getElementById("fail").currentTime = 1.9;
            document.getElementById("fail").play();
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts == 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            document.getElementById("success").play();
            let spanSuc = document.querySelectorAll(".success").length;
            if (spanSuc == wordLetters.length) {
                document.getElementById("success").play();
                // let textPopup = document.createTextNode(`Successfully , The World is : ("${randomValueValue}")`);
                let div = document.querySelector(".overlay");
                div.innerHTML = `<div class="box-popup">
                                    <p>You Have Won The Correct Word is : (${randomValueValue})</p>
                                    <span onclick="playAgain()">Play Again</span>
                                </div>`;

                setTimeout(() => {
                    div.style.display = "block";
                }, 500);
                lettersContainer.classList.add("finished");
            }
        }
    }
});

function endGame() {
    // let div = document.createElement('div');
    // let textPopup = document.createTextNode(`Game Over, The World is : ("${randomValueValue}")`);
    // div.className = 'popup';
    // div.appendChild(textPopup)

    // document.body.appendChild(div);
    // let textPopup = document.createTextNode(`Game Over , The World is : ("${randomValueValue}")`);
    let div = document.querySelector(".overlay");
    div.innerHTML = `<div class="box-popup">
                        <p>Game Over , The World is : (${randomValueValue})</p>
                        <span onclick="playAgain()">Play Again</span>
                    </div>`;
    setTimeout(() => {
        div.style.display = "block";
    }, 500);
}

function playAgain() {
    setTimeout(() => {
        window.location.reload();
    }, 500);
}
