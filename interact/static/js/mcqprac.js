var $questionSolution = $('#questionSolution').val()
var $radioGroup = $('[name="optionsRadios"]')
var $description = $('#description')
var $answers = $('#radioGroup')
var $radioButton = $('#radioButton')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $user = $('.container.question').attr('user')
var $questionID = $('.container.question').attr('id')

$radioGroup.click(function() {
  var $guess = $(this).val()
  console.log($guess)
  $nextPage.show()
  if ($guess == $questionSolution) {
    $isCorrect = true
    console.log('yes!')
  }
  if ($guess != $questionSolution) {
    $isCorrect = false
    console.log('no!')
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
    console.log("yes, you clicked this button.")
})

$(window).on('load', function () {
  console.log('loaded');
});
