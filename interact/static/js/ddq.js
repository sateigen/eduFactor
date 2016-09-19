var $questionSolution = $('.questionSolution')
var $description = $('#description')
var $questionTitle = $('#questionTitle')
var $answers = $('#selectionGroup')
var $answersChosen = $('.acitve')
var $titleButton = $('#titleButton')
var $descriptionButton = $('#descriptionButton')
var $selectButton = $('#selectButton')
var $nextPage = $('#nextPage')
var $isCorrect = false
var $submit = $('#submit')
var $droppable = $('.droppable')
var $draggable = $('.draggable')

$titleButton.hide()
    // $descriptionButton.hide()
$selectButton.hide()
$nextPage.hide()

$(window).on('load', function() {
    console.log('loaded');
    highlight($description, $descriptionButton);
    unhighlight($description, $descriptionButton, $questionTitle, $titleButton);
    unhighlight($questionTitle, $titleButton, $answers, $selectButton);
});

function highlight(focusPoint, focusButton) {
    focusPoint.css('border-style', 'solid')
    focusButton.show()
}

function unhighlight(focusPoint, focusButton, next, nextButton) {
    focusButton.on('click', function() {
        focusButton.hide()
        nextButton.show()
        focusPoint.css('border-style', 'none')
        highlight(next, nextButton)
    })
}

$(function() {
    $(".draggable").draggable();
    $(".droppable").droppable({
        drop: function(event, ui) {
            $(this)
                .addClass("droppable-highlight")
                .find("p");
            var targetElem = ui.draggable;
            var id = $(this).attr("id");
            targetElem.toggleClass('dropped')
            console.log(id + ":" + targetElem.html());
        }
    });
});

$submit.click(function() {
  $('.dropped').each(function(index, item) {
      if ($('.droppable').attr('value') === $('.dropped').attr('value')) {
          $isCorrect = true;
          console.log('yay');
      }
  })
})

$nextPage.click(function() {
  if ($isCorrect) {
    $curr = parseFloat(window.location.href.split('/')[4])
    $next = $curr + 1
    console.log($curr, typeof($curr))
    window.location.href = "/question/" + $next + "/"
  }
})
