var $questionSolution = $('.questionSolution')
var $description = $('#description')
var $answers = $('.selectionGroup')
var $answersChosen = $('.active')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $isCorrect = false
var chosenAnswers = []
var $isCorrect = false
var correctAnswers = []
var answerObjects = $questionSolution.each(function(index) {
    $(this).attr('value')
})


$answers.click(function() {
    $nextPage.show()
})

$nextPage.click(function() {
    checkAnswers(correctAnswers, chosenAnswers)
    $user = $('.container.question').attr('user')
    $questionID = $('.container.question').attr('id')
    if ($isCorrect) {
        $.ajax({
            url: "/api/score/",
            method: 'post',
            data: {
                'user': '/api/user/' + $user + '/',
                'question': '/api/question/' + $questionID + '/',
                'score': true,
                'time_stamp': 'now'
            }
        }).done(function() {
            console.log('hello');
        });
    } else {
        $.ajax({
            url: "/api/score/",
            method: 'post',
            data: {
                'user': '/api/user/' + $user + '/',
                'question': '/api/question/' + $questionID + '/',
                'score': false,
                'time_stamp': 'now'
            }
        }).done(function() {});
    }
})

$(window).on('load', function() {
    console.log('loaded');
});

function checkAnswers(correctAnswers, chosenAnswers) {
    $('.answers').each(function(index) {
        if ($(this).is(':checked') == true) {
            chosenAnswers.push($(this).val())
        }
    })
    correctAnswers.sort()
    chosenAnswers.sort()
    $isCorrect = (correctAnswers.length == chosenAnswers.length) && correctAnswers.every(function(element, index) {
        return element === chosenAnswers[index]
    })
    console.log(chosenAnswers)
}

for (i = 0; i < answerObjects.length; i++) {
    correctAnswers.push(answerObjects[i].value)
}
