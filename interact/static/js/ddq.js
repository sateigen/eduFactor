var $description = $('#description')
var $answerGroup = $('#selectionGroup')
var $questionTitle = $('#questionTitle')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $chosenAnswers = []
var $correctAnswers = []


$description.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Description</strong></span>',
  content : 'This section tells you how to answer this type of question. Be sure to always read the description before answering the question.<br><br>' + '<button type="button" id="' + $description.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$questionTitle.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Question</strong></span>',
  id: 'dataPopover',
  content : 'Here is the problem you are going to solve! Be sure to read it carefully.<br><br>' + '<button type="button" id="' + $questionTitle.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$answerGroup.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Answer Section</strong></span>',
  id: 'dataPopover',
  content : "Here are the answer choices! Click and drag one answer at a time to the correct box Do not click the 'Next Page' button until you have dragged an answer to each box.<br><br>" + '<button type="button" id="' + $answerGroup.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$nextPage.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Go to the Next Question</strong></span>',
  id: 'submitPopover',
  content : "The correct answers are thousands: 5000; hundreds: 5500; tens: 5480.<hr><br> You must have the correct answers chosen before moving to the next question.<br><br>Remember that once you click 'Next Page' you may not go back to change your answers."
})


$order = [$('#description'), $('#questionTitle'), $('#selectionGroup'), $('#nextPage')]
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
  focusPoint.css('background-color','transparent')
  if (next){
    highlight(next)
  }
}


$nextPage.click(function(e) {
  e.preventDefault()
  checkAnswers($correctAnswers, $chosenAnswers)
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    window.location.href = "/tutorial/" + $next + "/"
  }
})


$(function() {
    $(".draggable").draggable({
      start: function() {
        var $this = $(this);
        $this.removeClass('dropped')
        $this.data('is-correct', false);
      }
    });

    $(".droppable").droppable({
        drop: function(event, ui) {
            $(this)
                .addClass("droppable-highlight")
                .find("p");
            var targetElem = ui.draggable;
            var id = $(this).attr("id");
            targetElem.addClass('dropped')
            var $this = $(this);
             if ($this.attr("value") == targetElem.attr("value")) {
                targetElem.data('is-correct', true);
             } else {
               targetElem.data('is-correct', false);
             }
        }
    });
    $(".droppable").droppable({
      out: function(event, ui) {
        $(this)
        .toggleClass("droppable-highlight")
      }
    })
});


function checkAnswers () {
  var howManyCorrectAnswers = $('.droppable').length;
  var correctAnswers = 0;

  $('.dropped').each(function(index, item) {
    var isCorrect = $(this).data('is-correct');
    if (isCorrect) {
      correctAnswers++;
    }
  })
  $isCorrect = howManyCorrectAnswers == correctAnswers;
}
