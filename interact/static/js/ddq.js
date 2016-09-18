var $questionSolution = $('.questionSolution')
var $selectGroup = $('[name="optionsSelect"]')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('#selectionGroup')
var $titleButton = $('#titleButton')
var $descriptionButton = $('#descriptionButton')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $isCorrect = false

$titleButton.hide()
// $descriptionButton.hide()
$selectButton.hide()
$nextPage.hide()

$selectGroup.click(function() {
  var $guess = $(this).val()
  console.log($guess)
  $selectButton.text('| The correct answers are ' + allAnswers[0].value + ' and ' + allAnswers[1].value);
  $nextPage.show()
  if ($guess in allAnswers) {
    $isCorrect = true
    console.log('yes!')
  }
  if ($guess != allAnswers) {
    $isCorrect = false
    console.log('no!')
  }
})

$nextPage.click(function() {
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/question/" + $next + "/"
  }
})

$(window).on('load', function () {
  console.log('loaded');
  highlight($description, $descriptionButton);
  unhighlight($description, $descriptionButton, $questionTitle, $titleButton);
  unhighlight($questionTitle, $titleButton, $answers, $selectButton);
});

function highlight(focusPoint, focusButton) {
  focusPoint.css('border-style','solid')
  focusButton.show()
}

function unhighlight(focusPoint, focusButton, next, nextButton) {
  focusButton.on('click', function (){
    focusButton.hide()
    nextButton.show()
    focusPoint.css('border-style','none')
    highlight(next, nextButton)
  })
}

var allAnswers = []
var answerObjects = $questionSolution.each(function(index) {$(this).attr('value')})

for(i=0; i < answerObjects.length; i++){
  allAnswers.push(answerObjects[i].value)
}

  $(function() {
      $(".draggable, .draggable-nonvalid").draggable();
      $(".droppable1").droppable({
          accept: ".draggable1",
          classes: {
              "ui-droppable-active": "ui-state-active",
              "ui-droppable-hover": "ui-state-hover"
          },
          drop: function(event, ui) {
              $(this)
                  .addClass("ui-state-highlight")
                  .find("p")
                  .html("Correct!");
          }
      });
  });

  $(function() {
      $(".draggable, .draggable-nonvalid").draggable();
      $(".droppable2").droppable({
          accept: ".draggable2",
          classes: {
              "ui-droppable-active": "ui-state-active",
              "ui-droppable-hover": "ui-state-hover"
          },
          drop: function(event, ui) {
              $(this)
                  .addClass("ui-state-highlight")
                  .find("p")
                  .html("Correct!");
          }
      });
  });


  $(function() {
      $(".draggable, .draggable-nonvalid").draggable();
      $(".droppable3").droppable({
          accept: ".draggable3",
          classes: {
              "ui-droppable-active": "ui-state-active",
              "ui-droppable-hover": "ui-state-hover"
          },
          drop: function(event, ui) {
              $(this)
                  .addClass("ui-state-highlight")
                  .find("p")
                  .html("Correct!");
          }
      });
  });
