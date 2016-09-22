var $questionSolution = $('.questionSolution').attr('value')
var $description = $('#description')
var $answersChosen = $('.clicked')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $answers = $('.selectionGroup')
var $isCorrect = false


// check this function for is question correct
$nextPage.click(function() {
  checkAnswers()
  console.log($isCorrect)
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/practice/" + $next + "/"
})

$(window).on('load', function () {
  $nextPage.show()
  console.log('loaded');
});

$("td").click(function(){
  $(this).toggleClass("clicked")
})

function checkAnswers() {
  var chosenAnswers = $('.clicked').each(function(index) {$(this).attr('value')})
  if (chosenAnswers.length == $questionSolution) {
        $isCorrect = true}}
