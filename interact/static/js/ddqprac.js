var $questionSolution = $('.questionSolution')
var $answersChosen = $('.active')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $submit = $('#submit')
var $droppable = $('.droppable')
var $selectButton = $('#selectButton')
var $draggable = $('.draggable')
var $chosenAnswers = []
var $correctAnswers = []
// var questions = {{ questions|safe }}

$(window).on('load', function() {
    console.log('loaded');
});

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

// Array ['question 1', 'question 2'];
$nextPage.click(function(e) {
  checkAnswers($correctAnswers, $chosenAnswers)
  $user = $('.container.question').attr('user')
  $questionID = $('.container.question').attr('id')
  console.log($isCorrect)
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
