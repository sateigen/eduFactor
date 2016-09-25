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
    console.log("yes, you clicked this button.")
})

$(window).on('load', function () {
  $nextPage.hide()
  console.log('loaded');
});
