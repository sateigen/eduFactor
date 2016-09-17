var $questionSolution = $('.questionSolution')
var $selectGroup = $('[name="optionsSelect"]')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('#selectionGroup')
var $answersChosen = $('.acitve')
var $titleButton = $('#titleButton')
var $descriptionButton = $('#descriptionButton')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $isCorrect = false


$titleButton.hide()
// $descriptionButton.hide()
$selectButton.hide()
$nextPage.hide()

$selectGroup.click(function() {
  var $guess = $(this).val()
  console.log(correctAnswers)
  console.log($guess)
  $selectButton.text('| The correct answers are ' + correctAnswers[0] + ' and ' + correctAnswers[1]);
  $nextPage.show()
  if ($guess in allAnswers) {
    $isCorrect = true
    console.log('yes!')
  }
  if ($guess != allAnswers) {
    $isCorrect = false
    console.log('no!')
  }
})

$nextPage.click(function() {
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/question/" + $next + "/"
  }
})

$(window).on('load', function () {
  console.log('loaded');
  highlight($description, $descriptionButton);
  unhighlight($description, $descriptionButton, $questionTitle, $titleButton);
  unhighlight($questionTitle, $titleButton, $answers, $selectButton);
});

function highlight(focusPoint, focusButton) {
  focusPoint.css('border-style','solid')
  focusButton.show()
}

function unhighlight(focusPoint, focusButton, next, nextButton) {
  focusButton.on('click', function (){
    focusButton.hide()
    nextButton.show()
    focusPoint.css('border-style','none')
    highlight(next, nextButton)
  })
}


var correctAnswers = []
var answerObjects = $questionSolution.each(function(index) {$(this).attr('value')})
for(i=0; i < answerObjects.length; i++){
  correctAnswers.push(answerObjects[i].value)
}

// var chosen_answers = []
// var choicesSelected = $answersChosen.each(function(index) {$(this.)})
