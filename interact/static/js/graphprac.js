var $isCorrect = false
var $nextPage = $('#nextPage')
var $correct = $('#correct').val()
var $final = {}
var $guesses = {}
var $user = $('.container.question').attr('user')
var $questionID = $('.container.question').attr('id')

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
    $nextPage.show()
  }
}

$nextPage.click(function() {
  if ($isCorrect) {
    console.log("CORRECT")
    $.ajax({
      url: "/api/score/",
      method: 'post',
      data: {'user': '/api/user/' + $user + '/' , 'question': '/api/question/' + $questionID + '/' , 'score': true , 'time_stamp': 'now'}
      }).done(function() {
        console.log('correct');
      });
  }
  else {
    $.ajax({
      url: "/api/score/",
      method: 'post',
      data: {'user': '/api/user/' + $user + '/' , 'question': '/api/question/' + $questionID + '/' , 'score': false , 'time_stamp': 'now'}
      }).done(function() {
        console.log('score incorrect');
      });
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
  focusPoint.popover('toggle')
  focusPoint.css('background-color','#ecbe45')
}

function unhighlight(focusPoint, next) {
    focusPoint.popover('toggle')
    focusPoint.css('background-color','transparent')
    if (next){
      highlight(next)
    }
}
