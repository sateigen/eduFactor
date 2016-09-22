var $questionSolution = $('.questionSolution')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('.selectionGroup')
var $answersChosen = $('.active')
var $titleButton = $('#titleButton')
var $descriptionButton = $('#descriptionButton')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $isCorrect = false
var chosenAnswers = []
var $isCorrect = false
var correctAnswers = []
var answerObjects = $questionSolution.each(function(index) {$(this).attr('value')})

$answers.click(function() {
  $selectButton.text('| The correct answers are ' + correctAnswers[0] + ' and ' + correctAnswers[1]);
})

$nextPage.click(function() {
  checkAnswers(correctAnswers, chosenAnswers)
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/tutorial/" + $next + "/"
  }
  chosenAnswers = []
})

$description.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Description</strong></span>',
  content : 'The description tells you how to answer this type of question. Be sure to always read the description before answering the question.<br><br>' + '<button type="button" id="' + $description.attr('id') + 'Button" class="btn btn-default">Next</button>'
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
  title : '<span class="text-info"><strong>Potential Answers</strong></span>',
  id: 'dataPopover',
  content : 'This section has all of the potential answers! Go ahead and pick all those you believe are right!<br><br>' + '<button type="button" id="' + $answers.attr('id') + 'Button" class="btn btn-default">Next</button>'
})


$order = [$('#description'), $('#questionTitle'), $('.selectionGroup')]
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
  focusPoint.css({'background-color': '#ecbe45', 'border-radius': '.5em'})
}

function unhighlight(focusPoint, next) {
  focusPoint.popover('toggle')
  focusPoint.css('background-color','transparent')
  if (next){
    highlight(next)
  }
  else {
    $nextPage.show()
  }
}

function checkAnswers(correctAnswers, chosenAnswers) {
  $('.answers').each(function(index) {
      if ($( this ).is(':checked') == true) {
          chosenAnswers.push($(this).val())}})
  correctAnswers.sort()
  chosenAnswers.sort()
  $isCorrect = (correctAnswers.length == chosenAnswers.length) && correctAnswers.every(function(element, index) {
    return element === chosenAnswers[index]
  })
  console.log(chosenAnswers)
  console.log($isCorrect)
}


for(i=0; i < answerObjects.length; i++){
  correctAnswers.push(answerObjects[i].value)
}
