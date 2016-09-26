var $questionSolution = $('#answer').val()
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answerSection = $('#answerSection')
var $encouragement = $('#encouragement')
var $submit = $('#submit')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $guessForm = $('#guessForm')


$nextPage.click(function() {
  var $guessForm = $('#guess')
  var $guess = $('#guess').val()
  console.log($guess)
  $encouragement.text('| The correct answer is ' + $questionSolution);
  if ($guess == $questionSolution) {
    $guessForm.css('background-color', '#6DC090')
    $isCorrect = true
    $answerSection.popover('toggle')
    console.log('yes!')
  }
  if ($guess != $questionSolution) {
    $isCorrect = false
    console.log('no!')
  }
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/tutorial/" + $next + "/"
  }
})

$description.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Description</strong></span>',
  content : 'The description tells you how to answer this type of question. Be sure to always read the description before answering the question, it may tell you what characters(letters, numbers, commas, etc.) you are allowed to use in your answer.<br><br>' + '<button type="button" id="' + $description.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$questionTitle.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Question</strong></span>',
  id: 'dataPopover',
  content : 'Here is the problem you are going to solve! Be sure to read it carefully.<br><br>' + '<button type="button" id="' + $questionTitle.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$guessForm.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Your Answer</strong></span>',
  id: 'dataPopover',
  content : 'Type your answer into the blank box!<br><br>' + '<button type="button" id="' + $guessForm.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$nextPage.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Go to the next question</strong></span>',
  id: 'submitPopover',
  content : "The correct answer is 3.<hr><br> You must have the correct answer typed before moving to the next question.<br><br>Remember that once you click 'Next Page' you may not go back to change your answers."
})


$order = [$('#description'), $('#questionTitle'), $('#guessForm'), $('#nextPage')]
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
  if (focusPoint == $nextPage) {
    focusPoint.popover('toggle')
    focusPoint.css('background-color', '#ECBE45')
  } else {
    focusPoint.popover('toggle')
    focusPoint.css({'background-color': '#ecbe45', 'border-radius': '.5em'})
}}


function unhighlight(focusPoint, next) {
  // focusButton.hide()
  // nextButton.show()
  focusPoint.popover('toggle')
  focusPoint.css('background-color','transparent')
  if (next){
    highlight(next)
  }
}

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
