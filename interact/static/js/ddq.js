var $questionSolution = $('.questionSolution')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('#selectionGroup')
var $answersChosen = $('.active')
var $titleButton = $('#titleButton')
var $descriptionButton = $('#descriptionButton')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $submit = $('#submit')
var $droppable = $('.droppable')
var $selectButton = $('#selectButton')
var $draggable = $('.draggable')
var $chosenAnswers = []
var $correctAnswers = []

$titleButton.hide()
    // $descriptionButton.hide()
$selectButton.hide()
$nextPage.hide()

$(window).on('load', function() {
    console.log('loaded');
    highlight($description, $descriptionButton);
    unhighlight($description, $descriptionButton, $questionTitle, $titleButton);
    unhighlight($questionTitle, $titleButton, $answers, $selectButton);
});

function highlight(focusPoint, focusButton) {
    focusPoint.css('border-style', 'solid')
    focusButton.show()
}

function unhighlight(focusPoint, focusButton, next, nextButton) {
    focusButton.on('click', function() {
        focusButton.hide()
        nextButton.show()
        focusPoint.css('border-style', 'none')
        highlight(next, nextButton)
    })
}

$(function() {
    $(".draggable").draggable();
    $(".droppable").droppable({
        drop: function(event, ui) {
            $(this)
                .addClass("droppable-highlight")
                  $nextPage.show()
                .find("p");
            var targetElem = ui.draggable;
            var id = $(this).attr("id");
            targetElem.toggleClass('dropped')
            console.log(id + ":" + targetElem.html());
        }
    });
});


$nextPage.click(function(e) {
  e.preventDefault()
checkAnswers($correctAnswers, $chosenAnswers)
if ($isCorrect) {
  $curr = parseFloat(window.location.href.split('/')[4])
  $next = $curr + 1
  console.log($curr, typeof($curr))
  window.location.href = "/question/" + $next + "/"
  }
})


function checkAnswers (correctAnswers, chosenAnswers) {
  $('.droppable').each(function(index, item){
    $correctAnswers.push($(this).attr('value'))})
  $('.dropped').each(function(index, item){
    $chosenAnswers.push($(this).attr('value'))})
  $correctAnswers.sort()
  $chosenAnswers.sort()
  $isCorrect = ($correctAnswers.length == $chosenAnswers.length) &&
  $correctAnswers.every(function(element, index){
    return element === $chosenAnswers[index]})
}
