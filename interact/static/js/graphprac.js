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
  placement:'bottom',
  html: 'true',
  title : '<span class="text-info"><strong>The Description</strong></span>',
  content : 'The description tells you how to answer this type of question. Be sure to always read the description before answering the question.<br><br>' + '<button type="button" id="' + $title.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$dataTable.popover({
  placement:'bottom',
  html: 'true',
  title : '<span class="text-info"><strong>The Data</strong></span>',
  id: 'dataPopover',
  content : 'Here is your data!<br><br>' + '<button type="button" id="' + $dataTable.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$graphTitle.popover({
  placement:'bottom',
  html: 'true',
  title : '<span class="text-info"><strong>The Data</strong></span>',
  id: 'dataPopover',
  content : 'Here is the graph! Click and drag the mouse over each section to fill in your bar graph.<br><br>' + '<button type="button" id="' + $graphTitle.attr('id') + 'Button" class="btn btn-default">Next</button>'
})



$order = [$('#title'), $('#dataTable'), $('#graphTitle')]
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


// for(var i = 0; i < $order.length-1; i++){
//   console.log($order[i])
//   $order[i].attr('i', i)
//   $order[i].on('shown.bs.popover', function(){
//     console.log($order)
//     $('#' + $(this).attr('id') + 'Button').attr('i', $(this).i)
//     $('#' + $(this).attr('id') + 'Button').on('click', function() {
//       console.log('now')
//       unhighlight($order[$(this).i], $order[$(this).i+1])
//     })
//   })
// }

// $('#title').on('shown.bs.popover', function(){
//   console.log('hello')
//   $('#' + $title.attr('id') + 'Button').on('click', function() {
//     console.log('now')
//     unhighlight($title, $dataTable)
//   })
// })
//
// $('#dataTable').on('shown.bs.popover', function(){
//   console.log('hello')
//   $('#' + $dataTable.attr('id') + 'Button').on('click', function() {
//     console.log('now')
//     unhighlight($dataTable, $graphTitle)
//   })
// })


function cleanCorrect() {
  $correct = $correct.replace(/\s+/g, '');
  $correct = $correct.replace('}','').replace('{','')
  temp = $correct.split(',')
  temp.forEach(function(item){
    answer = item.split(':')
    $final[answer[0].replace(/'+/g,"")] = answer[1].replace(/'+/g,"")
  })
}

$nextPage.hide()

function checkGraph() {
  cleanCorrect()
  var cols = $('col').slice(1);
  cols.each(function(index, col){
    $guesses[$('tfoot td')[index + 1].textContent] = $('.' + $(col).attr('class') + '.highlight').length.toString()
  })
  if (JSON.stringify($final) === JSON.stringify($guesses)) {
    $isCorrect = true
    $nextPage.show()
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
      window.location.href = "/practice/" + $next + "/"
    }
  }
})

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

function highlight(focusPoint) {
  // if (focusPoint.attr('id') == 'title') {
  //   console.log('Title')
  // }
  // else if (focusPoint.attr('id') == 'dataTable') {
  //   console.log('dataTable')
  // }
  focusPoint.popover('toggle')
  focusPoint.css('background-color','#ecbe45')
}

function unhighlight(focusPoint, next) {
  // $('.popover:visible button').on('click', function (){
  // $('#' + focusPoint.attr('id') + 'Button').on('click', function (){
    console.log('clicked')
    focusPoint.popover('toggle')
    focusPoint.css('background-color','transparent')
    if (next){
      highlight(next)
    }
}

$(window).on('load', function () {
  console.log('loaded');
  highlight($title);
  // $('#titleButton').ready(function(){console.log('yes')
  //   unhighlight($title, $dataTable)})
  // $('#dataTableButton').ready(function(){
  //   unhighlight($dataTable, $graphTitle)
  // })
});