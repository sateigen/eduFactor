var $questionSolution = $('.questionSolution').attr('value')
var $nextPage = $('#nextPage')
var $isCorrect = false


// check this function for is question correct
$nextPage.click(function() {
  checkAnswers()
  $user = $('.container.question').attr('user')
  $questionID = $('.container.question').attr('id')
  console.log('yes!')
  if ($isCorrect) {
    $.ajax({
      url: "/api/score/",
      method: 'post',
      data: {'user': '/api/user/' + $user + '/' , 'question': '/api/question/' + $questionID + '/' , 'score': true , 'time_stamp': 'now'}
      }).done(function() {
        console.log('hello');
      });
  } else {
    $.ajax({
      url: "/api/score/",
      method: 'post',
      data: {'user': '/api/user/' + $user + '/' , 'question': '/api/question/' + $questionID + '/' , 'score': false , 'time_stamp': 'now'}
      }).done(function() {
        console.log('false');
      });
  }
  })

$(window).on('load', function () {
  $nextPage.show()
  console.log('loaded');
});

$("td").click(function(){
  $(this).toggleClass("clicked")
})

function checkAnswers() {
  var chosenAnswers = $('.clicked').each(function(index) {$(this).attr('value')})
  if (chosenAnswers.length == $questionSolution) {
        $isCorrect = true}}
