var countDown = 10;
var timer = null;
var score = 0;
var start = false;
var timeout;

$(document).ready(function () {
    
    var newProblems = function() {
        var firstNumber = Math.floor((Math.random() * 10) + 1);
        var secondNumber = Math.floor((Math.random() * 10) + 1);

        $('#first-number').html(firstNumber + '</h2>');
        $('#second-number').html('<h2>' + secondNumber + '</h2>');

        var answer = firstNumber + secondNumber;
        return answer; 
    }

    var updateScore = function(amount){
        score+= amount

        $('#current-score').html(score)
        $('#highestScore').html(score);
    }

    var checkCorrectAnswer = function(accurateAnswer){
    
        var input = document.querySelector('input');
        input.addEventListener('input', function (event) {
            var userInput = $(this).val();
    
            clearTimeout(timeout);
                if (userInput.length > 0) {
                    timeout = setTimeout(function () {
    
                        if (accurateAnswer === Number(userInput)){
                            updateTimeLeft(1);
                            document.querySelector('input').value = '';
                            updateScore(1);
    
                            var accurate = newProblems();
                            checkCorrectAnswer(accurate);
                        }
                    }, 500);
                }
        });     
    }

    var updateTimeLeft = function (amount) {
        countDown += amount;
        console.log('in the updateTimeLeft function')

        countDownFunc();
    }

    var countDownFunc = function() {
        if(!timer) {
            timer = setInterval(function () {
                countDown--;
                timerSpan.innerHTML = (countDown);
                if(countDown === 0) {
                    score = 0;
                     clearInterval(timer);
                     timer = null;
                     updateTimeLeft(11);
                     console.log('at the bottom')
                }
            }, 1000); 
        }
    }

    var timerSpan = document.body.querySelector("#seconds");
    var input = document.querySelector('input');
    
    var accurateAnswer = newProblems();
        
    $('input').on('keyup', function() {
        if(!start){
            //console.log("keydown")
            countDownFunc();
            start = true;
            checkCorrectAnswer(accurateAnswer);
        }
    });
});




