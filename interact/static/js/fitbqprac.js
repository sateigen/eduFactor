var $questionSolution = $('#answer').val()
var $description = $('#description')
var $answerSection = $('#answerSection')
var $submit = $('#submit')
var $nextPage = $('#nextPage')
var $isCorrect = false

$submit.click(function() {
  var $guessForm = $('#guess')
  var $guess = $('#guess').val()
  console.log($guess)
  $nextPage.show()
  if ($guess == $questionSolution) {
    $isCorrect = true
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
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/practice/" + $next + "/"
})

$(window).on('load', function () {
  $nextPage.hide()
  console.log('loaded');
});

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
