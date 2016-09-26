var $questionSolution = $('#questionSolution').val()
var $radioGroup = $('[name="optionsRadios"]')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $user = $('.container.question').attr('user')
var $questionID = $('.container.question').attr('id')

$radioGroup.click(function() {
  var $guess = $(this).val()
  $nextPage.show()
  if ($guess == $questionSolution) {
    $isCorrect = true
  }
  if ($guess != $questionSolution) {
    $isCorrect = false
  }
})

$nextPage.click(function() {
  if ($isCorrect){
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
        console.log('very incorrect');
      });
  }
})
