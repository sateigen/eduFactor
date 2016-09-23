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
var questions = {{ questions }};

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


$nextPage.click(function(e) {
  e.preventDefault()
  checkAnswers($correctAnswers, $chosenAnswers)
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1 //
    console.log($curr, typeof($curr))
    if ($next == 11) {
      window.location.href = '/'
    }
    else {
      window.location.href = "/practice/" + $next + "/"
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
