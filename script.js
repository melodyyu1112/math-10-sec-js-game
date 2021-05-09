$(document).ready(function () {
    
    var updateTimeLeft = function (amount) {
        countDown += amount;
        countDownFunc();
    }

    var updateScore = function(){
        score++;

        if(globalScore <= score) {
            globalScore = score;
        }

        $('#current-score').html(score);
        $('#high-score').html(globalScore);
    }

    var newProblems = function() {
        var firstNumber = Math.floor((Math.random() * 10) + 1);
        var secondNumber = Math.floor((Math.random() * 10) + 1);

        $('#first-number').html(firstNumber + '</h2>');
        $('#second-number').html('<h2>' + secondNumber + '</h2>');

        var answer = firstNumber + secondNumber;
        return answer; 
    }

    var checkCorrectAnswer = function(accurateAnswer, countDown){
        var input = document.querySelector('input');
        var timeout;

        input.addEventListener("input", function() {
        clearTimeout(timeout);
        if (input.value.length > 0) {
            // Below is the debounce
            timeout = setTimeout(function () {
            var isAvailable = true;
            
            if (isAvailable) {
                if (accurateAnswer == (input.value)){
                    countDown++;
                    updateScore();
                    input.value = '';
                    var accurate = newProblems();
                    checkCorrectAnswer(accurate);
                }
            }
        }, 500);
        } 
        });     
    }

    var countDownFunc = function() {
        timer = setInterval(function () {
            timerSpan.innerHTML = (countDown);
            countDown--;
            if(countDown === -1) {
                updateTimeLeft(10);
                clearInterval(timer);
                timer = null;
            }
            
        }, 1000); // Executed every 100 millisecond
    }

    var timerSpan = document.body.querySelector("#seconds");
    var countDown = 10;
    var timer = null;
    var score = 0;
    var globalScore = 0;
            
    if (!timer) {
        var accurateAnswer = newProblems();
        checkCorrectAnswer(accurateAnswer);
        countDownFunc(); 
    }
});




