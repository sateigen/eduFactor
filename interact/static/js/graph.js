var $title = $('#title')
var $dataTable = $('#dataTable')
var $isCorrect = false
var $graph = $('#graph')
var $graphTitle = $('#graphTitle')
var $nextPage = $('#nextPage')
var $correct = $('#correct').val()
var $final = {}
var $guesses = {}


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
      window.location.href = "/question/" + $next + "/"
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
  if (focusPoint.attr('id') == 'title') {
    console.log('Title')
  }
  else if (focusPoint.attr('id') == 'dataTable') {
    console.log('dataTable')
  }
  focusPoint.popover('toggle')
  focusPoint.css('background-color','#ecbe45')

}

function unhighlight(focusPoint, next) {
  $('#' + focusPoint.attr('id') + 'Button').on('click', function (){
    console.log('clicked')
    focusPoint.popover('toggle')
    focusPoint.css('background-color','transparent')
    highlight(next)
  })
}

$(window).on('load', function () {
  console.log('loaded');
  highlight($title);
  $('#titleButton').ready(function(){console.log('yes')
    unhighlight($title, $dataTable)})
});

$title.popover({
  placement:'bottom',
  html: 'true',
  title : '<span class="text-info"><strong>The Title</strong></span>',
  content : 'Here are your instructions! ' + '<button type="button" id="' + $title.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
$dataTable.popover({
  placement:'bottom',
  html: 'true',
  title : '<span class="text-info"><strong>The Data</strong></span>',
  id: 'dataPopover',
  content : 'Here is your data! ' + '<button type="button" id="' + $dataTable.attr('id') + 'Button" class="btn btn-default">Next</button>'
})
// 
// $('#dataTableButton').ready(function(){console.log('yes again')
// unhighlight($dataTable, $graphTitle)})
