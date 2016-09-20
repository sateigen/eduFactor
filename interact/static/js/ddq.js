var $questionSolution = $('.questionSolution')
var $description = $('#description')
var $answerGroup = $('#selectionGroup')
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

$nextPage.hide()

$description.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Title</strong></span>',
  content : 'Here are your instructions!<br><br>' + '<button type="button" id="' + $description.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$questionTitle.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Question</strong></span>',
  id: 'dataPopover',
  content : 'Here is your question!<br><br>' + '<button type="button" id="' + $questionTitle.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$answerGroup.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Possible Answers</strong></span>',
  id: 'dataPopover',
  content : 'Here are the possible solutions, drag and drop them into the correct box then click submit.<br><br>' + '<button type="button" id="' + $answerGroup.attr('id') + 'Button" class="btn btn-default">Next</button>'
})

$order = [$('#description'), $('#questionTitle'), $('#radioGroup')]


function getNext(curr)
{
  for(var j=0; j<$order.length; j++)
  {
    if($order[j].is(curr)) {return $order[j+1]}
  }
}

for(var i = 0; i < $order.length; i++){
  $order[i].on('shown.bs.popover', function(){
    $('#' + $(this).attr('id') + 'Button').on('click', function() {
      //Bind binds the previous this to the current this... so in our current context
      //$(this) is the element from the $order array...  getNext finds the next one...  or something like that
      unhighlight($(this), getNext($(this)))
    }.bind(this))
  })
}

$(window).on('load', function() {
    console.log('loaded');
    highlight($description);
});

function highlight(focusPoint) {
  focusPoint.popover('toggle')
  focusPoint.css('background-color','#ecbe45')
}

function unhighlight(focusPoint, next) {
  focusPoint.popover('toggle')
  focusPoint.css('background-color','transparent')
  if (next){
    highlight(next)
  }
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
  window.location.href = "/tutorial/" + $next + "/"
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
