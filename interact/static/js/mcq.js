var $questionSolution = $('#questionSolution').val()
var $radioGroup = $('[name="optionsRadios"]')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('#radioGroup')
var $nextPage = $('#nextPage')
var $isCorrect = false

// $nextPage.hide()

$description.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Title</strong></span>',
  content : 'Here are your instructions!<br><br>' + '<button type="button" id="' + $description.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$questionTitle.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Data</strong></span>',
  id: 'dataPopover',
  content : 'Here is your question!  You will want to try and solve the equation.<br><br>' + '<button type="button" id="' + $questionTitle.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$answers.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Data</strong></span>',
  id: 'dataPopover',
  content : 'This section contains all possible solutions to the question.  Click the button next to the answer you think might be correct.<br><br>' + '<button type="button" id="' + $answers.attr('id') + 'Button" class="btn btn-default">Next</button>'
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

$radioGroup.click(function() {
  var $guess = $(this).val()
  console.log($guess)
  // $answers.popover('hide')
  // $radioButton.text('| The correct answer is ' + $questionSolution);
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
    window.location.href = "/tutorial/" + $next + "/"
  }
})

$(window).on('load', function () {
  // console.log('loaded');
  highlight($description);
  // unhighlight($description, $questionTitle);
  // unhighlight($questionTitle, $answers);
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
