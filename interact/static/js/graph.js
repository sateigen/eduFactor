var $title = $('#title')
var $titleButtonClicked = true
var $dataTable = $('#dataTable')
var $isCorrect = false
var $graph = $('#graph')
var $graphTitle = $('#graphTitle')
var $nextPage = $('#nextPage')
var $correct = $('#correct').val()
var $final = {}

function cleanCorrect() {
  $correct = $correct.replace(/\s+/g, '');
  $correct = $correct.replace('}','').replace('{','')
  temp = $correct.split(',')
  temp.forEach(function(item){
    answer = item.split(':')
    $final[answer[0]] = answer[1].replace(/'+/g,"")
  })
}

$nextPage.hide()

function checkGraph() {
  guesses = {}
  var cols = $('col').slice(1);
  cols.each(function(index, col){
    console.log($(col).attr('class'))
    guesses[$('tfoot td')[index + 1].textContent] = $('.' + $(col).attr('class') + '.highlight').length.toString()
  })
  console.log("'"+ JSON.stringify(guesses) + "'")
  // if guesses ===
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
    });
});

function highlight(focusPoint) {
  if (focusPoint.attr('id') == 'title') {
    focusPoint.popover({
      placement:'bottom',
      html: 'true',
      title : '<span class="text-info"><strong>The Title</strong></span>',
      content : 'Here are your instructions! ' + '<button type="button" id="' + focusPoint.attr('id') + 'Button" class="btn btn-default">Next</button>'
    })}
  else if (focusPoint.attr('id') == 'dataTable') {
    focusPoint.popover({
      placement:'bottom',
      html: 'true',
      title : '<span class="text-info"><strong>The Title</strong></span>',
      content : 'Here is your data! ' + '<button type="button" id="' + focusPoint.attr('id') + 'Button" class="btn btn-default">Next</button>'
    })}
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
  return true
}

$(window).on('load', function () {
  console.log('loaded');
  highlight($title);
  unhighlight($title, $dataTable)
});

if ($titleButtonClicked == true) {
  console.log('true')
  unhighlight($dataTable, $graphTitle)};
