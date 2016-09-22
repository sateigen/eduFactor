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
var $droppable = $('.droppable')
var $selectButton = $('#selectButton')
var $draggable = $('.draggable')
var $chosenAnswers = []
var $correctAnswers = []

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
$answerGroup.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Potential Answers</strong></span>',
  id: 'dataPopover',
  content : 'Here are the answers! Click and drag the potential answers to the correct boxes.<br><br>' + '<button type="button" id="' + $answerGroup.attr('id') + 'Button" class="btn btn-default">Next</button>'
})


$order = [$('#description'), $('#questionTitle'), $('#selectionGroup')]
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
                  $nextPage.show()
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
