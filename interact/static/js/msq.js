var $questionSolution = $('.questionSolution')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('.selectionGroup')
var $answersChosen = $('.active')
var $titleButton = $('#titleButton')
var $descriptionButton = $('#descriptionButton')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $isCorrect = false
var chosenAnswers = []
var $isCorrect = false
var correctAnswers = []
var answerObjects = $questionSolution.each(function(index) {$(this).attr('value')})


$titleButton.hide()
$selectButton.hide()
$nextPage.hide()

$answers.click(function() {
  $selectButton.text('| The correct answers are ' + correctAnswers[0] + ' and ' + correctAnswers[1]);
  $nextPage.show()
})

$nextPage.click(function() {
  checkAnswers(correctAnswers, chosenAnswers)
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/tutorial/" + $next + "/"
  }
  chosenAnswers = []
})

$(window).on('load', function () {
  console.log('loaded');
  highlight($description, $descriptionButton);
  unhighlight($description, $descriptionButton, $questionTitle, $titleButton);
  unhighlight($questionTitle, $titleButton, $answers, $selectButton);
});

function highlight(focusPoint, focusButton) {
  focusPoint.popover('toggle')
  focusPoint.css('background-color','#ecbe45')
  focusButton.show()
}

function unhighlight(focusPoint, focusButton, next, nextButton) {
  focusButton.on('click', function (){
    focusButton.hide()
    nextButton.show()
    focusPoint.popover('toggle')
    focusPoint.css('background-color','transparent')
    highlight(next, nextButton)
  })
}

function checkAnswers(correctAnswers, chosenAnswers) {
  $('.answers').each(function(index) {
      if ($( this ).is(':checked') == true) {
          chosenAnswers.push($(this).val())}})
  correctAnswers.sort()
  chosenAnswers.sort()
  $isCorrect = (correctAnswers.length == chosenAnswers.length) && correctAnswers.every(function(element, index) {
    return element === chosenAnswers[index]
  })
  console.log(chosenAnswers)
}


for(i=0; i < answerObjects.length; i++){
  correctAnswers.push(answerObjects[i].value)
}
