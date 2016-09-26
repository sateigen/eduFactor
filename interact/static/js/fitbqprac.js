var $questionSolution = $('#answer').val()
var $submit = $('#submit')
var $nextPage = $('#nextPage')
var $isCorrect = false


$submit.click(function() {
  var $guessForm = $('#guess')
  var $guess = $('#guess').val()
  if ($guess == $questionSolution) {
    $isCorrect = true
    $user = $('.container.question').attr('user')
    $questionID = $('.container.question').attr('id')
    $.ajax({
      url: "/api/score/",
      method: 'post',
      data: {'user': '/api/user/' + $user + '/' , 'question': '/api/question/' + $questionID + '/' , 'score': true , 'time_stamp': 'now'}
      }).done(function() {
        console.log('correct');
      });
  }
  if ($guess != $questionSolution) {
    $isCorrect = false
    $user = $('.container.question').attr('user')
    $questionID = $('.container.question').attr('id')
    $.ajax({
      url: "/api/score/",
      method: 'post',
      data: {'user': '/api/user/' + $user + '/' , 'question': '/api/question/' + $questionID + '/' , 'score': false , 'time_stamp': 'now'}
      }).done(function() {
        console.log('not very correct');
      });
  }
})

$nextPage.click(function() {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    window.location.href = "/practice/" + $next + "/"
})


$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
