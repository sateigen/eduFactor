var $questionSolution = $('.questionSolution')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('.selectionGroup')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $chosenAnswers = []
var $correctAnswers = []
var $answerObjects = $questionSolution.each(function(index) {$(this).attr('value')})


$description.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Description</strong></span>',
  content : 'This section tells you how to answer this type of question. Be sure to always read the description before answering the question, it may help you know how many answers to choose.<br><br>' + '<button type="button" id="' + $description.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$questionTitle.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Question</strong></span>',
  id: 'dataPopover',
  content : 'Here is the problem you are going to solve! Be sure to read it carefully.<br><br>' + '<button type="button" id="' + $questionTitle.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$answers.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Answer Section</strong></span>',
  id: 'dataPopover',
  content : 'These are all of the potential answers! Go ahead and click on all those you believe are right, the answers you have chosen will be a darker blue. You may click on an answer you have selected to deselct it.<br><br>' + '<button type="button" id="' + $answers.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$nextPage.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Go to the Next Question</strong></span>',
  id: 'submitPopover',
  content : "The correct answers are 4x4 and 2x8.<hr><br> You must have the correct answers chosen before moving to the next question.<br><br>Remember that once you click 'Next Page' you may not go back to change your answers."
})


$order = [$('#description'), $('#questionTitle'), $('.selectionGroup'), $('#nextPage')]
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
    highlight($description);
});

function highlight(focusPoint) {
  if (focusPoint == $nextPage) {
    focusPoint.popover('toggle')
    focusPoint.css('background-color', '#ECBE45')
  } else {
    focusPoint.popover('toggle')
    focusPoint.css({'background-color': '#ecbe45', 'border-radius': '.3em'})
}}


function unhighlight(focusPoint, next) {
  focusPoint.popover('toggle')
  focusPoint.popover('disable')
  focusPoint.css('background-color','transparent')
  if (next){
    highlight(next)
  }
}


$nextPage.click(function() {
  checkAnswers($correctAnswers, $chosenAnswers)
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    window.location.href = "/tutorial/" + $next + "/"
  }
  $chosenAnswers = []
})


$answers.click(function() {
  $selectButton.text('| The correct answers are ' + $correctAnswers[0] + ' and ' + $correctAnswers[1]);
})


function checkAnswers($correctAnswers, $chosenAnswers) {
  $('.answers').each(function(index) {
      if ($( this ).is(':checked') == true) {
          $chosenAnswers.push($(this).val())}})
  $correctAnswers.sort()
  $chosenAnswers.sort()
  $isCorrect = ($correctAnswers.length == $chosenAnswers.length) && $correctAnswers.every(function(element, index) {
    return element === $chosenAnswers[index]
  })
}


for(i=0; i < $answerObjects.length; i++){
  $correctAnswers.push($answerObjects[i].value)
}
