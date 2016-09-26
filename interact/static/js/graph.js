var $title = $('#title')
var $dataTable = $('#dataTable')
var $isCorrect = false
var $graph = $('#graph')
var $graphTitle = $('#graphTitle')
var $nextPage = $('#nextPage')
var $correct = $('#correct').val()
var $final = {}
var $guesses = {}

$title.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Description</strong></span>',
  content : 'This section tells you how to answer this type of question. Be sure to always read the description before answering the question.<br><br>' + '<button type="button" id="' + $title.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$dataTable.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>The Data</strong></span>',
  id: 'dataPopover',
  content : 'Here is the data you will use to build your graph!<br><br>' + '<button type="button" id="' + $dataTable.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$graphTitle.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Answer Section</strong></span>',
  id: 'dataPopover',
  content : 'Here is the empty graph! Click and drag the mouse over each section to fill in your bar graph.<br><br>' + '<button type="button" id="' + $graphTitle.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$nextPage.popover({
  placement:'left',
  html: 'true',
  title : '<span class="text-info"><strong>Go to the Next Question</strong></span>',
  id: 'submitPopover',
  content : "The correct answer is to have 5 sections shaded in for bananas, 3 sections for oranges, 7 sections for pears, and 10 sections for apples.<hr><br> You must have the correct answers before moving to the next question.<br><br>Remember that once you click 'Next Page' you may not go back to change your answers."
})


$order = [$('#title'), $('#dataTable'), $('#graphTitle'), $('#nextPage')]
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


$(window).on('load', function () {
  highlight($title);
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
  focusPoint.popover('toggle')
  focusPoint.css('background-color','transparent')
  if (next){
    highlight(next)
  }
}


$nextPage.click(function() {
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    if ($next == 7) {
      window.location.href = '/'
    }
    else {
      window.location.href = "/tutorial/" + $next + "/"
    }
  }
})


function cleanCorrect() {
  $correct = $correct.replace(/\s+/g, '');
  $correct = $correct.replace('}','').replace('{','')
  temp = $correct.split(',')
  temp.forEach(function(item){
    answer = item.split(':')
    $final[answer[0].replace(/'+/g,"")] = answer[1].replace(/'+/g,"")
  })
}

function checkGraph() {
  cleanCorrect()
  var cols = $('col').slice(1);
  cols.each(function(index, col){
    $guesses[$('tfoot td')[index + 1].textContent] = $('.' + $(col).attr('class') + '.highlight').length.toString()
  })
  if (JSON.stringify($final) === JSON.stringify($guesses)) {
    $isCorrect = true
  }
}


$(function () {
  var isMouseDown = false,
    isHighlighted;
  $("#graph td")
    .mousedown(function () {
      isMouseDown = true;
      $(this).toggleClass("highlight");
      isHighlighted = $(this).hasClass("highlight");
      return false; // prevent text selection
    })
    .mouseover(function () {
      if (isMouseDown) {
        $(this).toggleClass("highlight", isHighlighted);
      }
    })
    .bind("selectstart", function () {
      return false;
    })

  $(document)
    .mouseup(function () {
      isMouseDown = false;
      checkGraph()
    });
});
