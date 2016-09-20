var $questionSolution = $('.questionSolution').attr('value')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answersChosen = $('.clicked')
var $descriptionButton = $('#descriptionButton')
var $titleButton = $('#titleButton')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $answers = $('.selectionGroup')
var $isCorrect = false

// $titleButton.hide()
// $selectButton.hide()
// $nextPage.hide()

$answers.click(function() {
  $selectButton.text('| The correct answer is ' + $questionSolution + ' shaded in.');
  $nextPage.show()
})

// check this function for is question correct
$nextPage.click(function() {
  checkAnswers()
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/tutorial/" + $next + "/"
  }
})

// $nextPage.hide()

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
  content : 'Here you will find the shape(s) that you must use to answer the question. Click on each section of the shape that you wish to be highlighted.<br><br>' + '<button type="button" id="' + $answers.attr('id') + 'Button" class="btn btn-default">Next</button>'
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
  // focusButton.show()
}

function unhighlight(focusPoint, next) {
  // focusButton.hide()
  // nextButton.show()
  focusPoint.popover('toggle')
  focusPoint.css('background-color','transparent')
  if (next){
    highlight(next)
  }
}


$("td").click(function(){
  $(this).toggleClass("clicked")
})


function checkAnswers() {
  var chosenAnswers = $('.clicked').each(function(index) {$(this).attr('value')})
  if (chosenAnswers.length == $questionSolution) {
        $isCorrect = true}}
