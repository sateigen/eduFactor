var $questionSolution = $('.questionSolution')
var $answersChosen = $('.active')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $submit = $('#submit')
var $droppable = $('.droppable')
var $selectButton = $('#selectButton')
var $draggable = $('.draggable')
var $chosenAnswers = []
var $correctAnswers = []


$(window).on('load', function() {
    console.log('loaded');
    $nextPage.hide()
});

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
  $curr = parseFloat(window.location.href.split('/')[4])
  $next = $curr + 1
  console.log($curr, typeof($curr))
  window.location.href = "/practice/" + $next + "/"
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
