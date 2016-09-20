var $questionSolution = $('.questionSolution').attr('value')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answersChosen = $('.clicked')
var $descriptionButton = $('#descriptionButton')
var $titleButton = $('#titleButton')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $answers = $('#selectionGroup')
var $isCorrect = false

$titleButton.hide()
$selectButton.hide()
$nextPage.hide()

$answers.click(function() {
  $selectButton.text('| The correct answer is ' + $questionSolution + ' shaded in.');
  $nextPage.show()
})

// check this function for is question correct
$nextPage.click(function() {
  checkAnswers()
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/tutorial/" + $next + "/"
  }
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

$("td").click(function(){
  $(this).toggleClass("clicked")
})


function checkAnswers() {
  var chosenAnswers = $('.clicked').each(function(index) {$(this).attr('value')})
  if (chosenAnswers.length == $questionSolution) {
        $isCorrect = true}}
