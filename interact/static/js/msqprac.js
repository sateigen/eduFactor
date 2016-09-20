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
var answerObjects = $questionSolution.each(function(index) {$(this).attr('value')})


$answers.click(function() {
  $nextPage.show()
})

$nextPage.click(function() {
  checkAnswers(correctAnswers, chosenAnswers)
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/practice/" + $next + "/"
})

$(window).on('load', function () {
  console.log('loaded');
  $nextPage.hide()
});

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
