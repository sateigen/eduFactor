var $questionSolution = $('#questionSolution').val()
var $radioGroup = $('[name="optionsRadios"]')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('#radioGroup')
var $titleButton = $('#titleButton')
var $descriptionButton = $('#descriptionButton')
var $radioButton = $('#radioButton')
var $nextPage = $('#nextPage')
var $isCorrect = false

$titleButton.hide()
// $descriptionButton.hide()
$radioButton.hide()
$nextPage.hide()

$radioGroup.click(function() {
  var $guess = $(this).val()
  console.log($guess)
  $radioButton.text('| The correct answer is ' + $questionSolution);
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
  unhighlight($questionTitle, $titleButton, $answers, $radioButton);
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
