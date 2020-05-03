const INPUTAREA = document.querySelector(".input-area");
const TESTAREA = document.querySelector("#test-area");
const TESTTEXT = document.querySelector("#test-text p").innerHTML;
const RESETBUTTON = document.querySelector("#reset");
const TIMER = document.querySelector(".timer");


// Add leading zero to numbers 9 or below (purely for aesthetics):
function zeroPadding(number) {
    if (number <= 9) {
        return "0" + number
    } else {
        return "" + number
    }
}

// Run a standard minute/second/hundredths timer:
var runTimer
var timerActive = false
var minutes = 0
var seconds = 0
var hundredths = 0

function tickTimer() {
    hundredths++
    if (hundredths == 60) {
        hundredths = 0
        seconds++
        if (seconds == 60) {
            seconds = 0
            minutes++
        }
    }
    TIMER.innerHTML = zeroPadding(minutes) + ":" + 
                      zeroPadding(seconds) + ":" +
                      zeroPadding(hundredths)
}

function startTimer() {
    let enteredTextLength = TESTAREA.value.length
    if (!enteredTextLength && !timerActive) {
        runTimer = setInterval(tickTimer, 10)
        timerActive = true
    }
}

function stopTimer() {
    clearInterval(runTimer)
}

function resetTimer() {
    stopTimer()
    timerActive = false
    TIMER.innerHTML = "00:00:00"
}

// Match the text entered with the provided text on the page:
function checkText() {
    if (TESTAREA.value == TESTTEXT) {
        stopTimer()
        INPUTAREA.style.borderColor = "green"
    } else if (TESTAREA.value != TESTTEXT.substring(0, TESTAREA.value.length)) {
        INPUTAREA.style.borderColor = "red"
    } else {
        INPUTAREA.style.borderColor = "grey"
    }
}

// Reset everything:
function reset() {
    stopTimer()
    resetTimer()
    TESTAREA.value = null
    INPUTAREA.style.borderColor = "grey"
}

// Event listeners for keyboard input and the reset button:
INPUTAREA.addEventListener('keypress', startTimer, false)
INPUTAREA.addEventListener('keyup', checkText, false)
RESETBUTTON.addEventListener('click', reset, false)