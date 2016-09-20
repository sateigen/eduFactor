var $questionSolution = $('#questionSolution').val()
var $radioGroup = $('[name="optionsRadios"]')
var $description = $('#description')
var $answers = $('#radioGroup')
var $radioButton = $('#radioButton')
var $nextPage = $('#nextPage')
var $isCorrect = false


$radioGroup.click(function() {
  var $guess = $(this).val()
  console.log($guess)
  $nextPage.show()
  if ($guess == $questionSolution) {
    $isCorrect = true
    console.log('yes!')
  }
  if ($guess != $questionSolution) {
    $isCorrect = false
    console.log('no!')
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


function unhighlight(focusPoint, focusButton, next, nextButton) {
  focusButton.on('click', function (){
    focusButton.hide()
    nextButton.show()
    focusPoint.popover('toggle')
    focusPoint.css('background-color','transparent')
    highlight(next, nextButton)
  })
}
