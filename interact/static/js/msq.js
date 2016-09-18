var $questionSolution = $('.questionSolution')
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

$answers.click(function() {
  $selectButton.text('| The correct answers are ' + correctAnswers[0] + ' and ' + correctAnswers[1]);
  $nextPage.show()
})

$nextPage.click(function() {
  checkAnswers(correctAnswers, chosenAnswers)
  if ($isCorrect) {
    console.log('yay!')
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

function checkAnswers(correctAnswers, chosenAnswers) {
  $('.answers').each(function(index) {
      if ($( this ).is(':checked') == true) {
          chosenAnswers.push($(this).val())}})
  $isCorrect = $(correctAnswers).not(chosenAnswers).length === 0 && $(chosenAnswers).not(correctAnswers).length === 0
}



var correctAnswers = []
var answerObjects = $questionSolution.each(function(index) {$(this).attr('value')})
for(i=0; i < answerObjects.length; i++){
  correctAnswers.push(answerObjects[i].value)
}

var chosenAnswers = []

var $isCorrect
