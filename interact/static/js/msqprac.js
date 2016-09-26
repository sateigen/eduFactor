var $questionSolution = $('.questionSolution')
var $answers = $('.selectionGroup')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $chosenAnswers = []
var $correctAnswers = []
var $answerObjects = $questionSolution.each(function(index) {
    $(this).attr('value')
})


$answers.click(function() {
    $nextPage.show()
})

$nextPage.click(function() {
    checkAnswers($correctAnswers, $chosenAnswers)
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
        })
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
        })
    }
})


function checkAnswers($correctAnswers, $chosenAnswers) {
    $('.answers').each(function(index) {
        if ($(this).is(':checked') == true) {
            $chosenAnswers.push($(this).val())
        }
    })
    $correctAnswers.sort()
    $chosenAnswers.sort()
    $isCorrect = ($correctAnswers.length == $chosenAnswers.length) && $correctAnswers.every(function(element, index) {
        return element === $chosenAnswers[index]
    })
}

for (i = 0; i < $answerObjects.length; i++) {
    $correctAnswers.push($answerObjects[i].value)
}
