var $questionSolution = $('#answer').val()
var $description = $('#description')
var $descriptionButton = $('#descriptionButton')
var $questionTitle = $('#questionTitle')
var $titleButton = $('#titleButton')
var $answerSection = $('#answerSection')
var $encouragement = $('#encouragement')
var $submit = $('#submit')
var $nextPage = $('#nextPage')
var $isCorrect = false

$titleButton.hide()
// $descriptionButton.hide()
$encouragement.hide()
$nextPage.hide()

$submit.click(function() {
  var $guessForm = $('#guess')
  var $guess = $('#guess').val()
  console.log($guess)
  $encouragement.text('| The correct answer is ' + $questionSolution);
  $nextPage.show()
  if ($guess == $questionSolution) {
    $guessForm.css('background-color', '#6DC090')
    $isCorrect = true
    $answerSection.popover('toggle')
    console.log('yes!')
    return false
  }
  if ($guess != $questionSolution) {
    $isCorrect = false
    console.log('no!')
    return false
  }
})

$nextPage.click(function() {
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
  unhighlight($questionTitle, $titleButton, $answerSection, $encouragement);
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

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
