var countDown = 10;
var timer = null;
var score = 0;
var globalScore = score;
var start = false;
var timeout;


var newProblems = function() {
    var firstNumber = Math.floor((Math.random() * 10) + 1);
    var secondNumber = Math.floor((Math.random() * 10) + 1);

    $('#first-number').html(firstNumber + '</h2>');
    $('#second-number').html('<h2>' + secondNumber + '</h2>');

    var answer = firstNumber + secondNumber;
    return answer; 
}

var updateScore = function(amount){
    score += amount;
    console.log(amount);
    $('#current-score').html(score);
    console.log(score);
    console.log('g' + globalScore);
    if(!(globalScore > score)){
        globalScore = score;
        console.log(score);
    }
    $('#global').html(globalScore);
}

var check = function (accurateAnswer){
    if (accurateAnswer === Number(document.querySelector('input').value)){
        updateScore(1);
        updateTimeLeft(1);
        document.querySelector('input').value = '';
        var accurate = newProblems();
        checkCorrectAnswer(accurate);
    }

} 

var checkCorrectAnswer = function(accurateAnswer){
    var timeout = null;

    check(accurateAnswer);
    $('input').on('keyup', function() {

        if(timeout != null) {
            clearTimeout(timeout);
        }
            
        timeout = setTimeout(function () {
            check(accurateAnswer)
        }, 500);
            
    });     
}

var updateTimeLeft = function (amount) {
    countDown += amount;
}

var countDownFunc = function() {
    if(!timer) {
        timer = setInterval(function () {
            updateTimeLeft(-1);
            var timerSpan = document.querySelector('#seconds');
            console.log(typeof(countDown));
            timerSpan.innerHTML = (countDown);
            if(countDown === 0) {
                score = 0;   
                $('#current-score').html(score);   
                 clearInterval(timer);
                 timer = null;
                 updateTimeLeft(11);
                 countDownFunc();
            }
        }, 1000); 
    }
}

$(document).ready(function () {

    var accurateAnswer = newProblems();
    document.addEventListener('keyup', function() {

        if(!start){
            countDownFunc();
            start = true;
            checkCorrectAnswer(accurateAnswer);

        }
    });
    
});