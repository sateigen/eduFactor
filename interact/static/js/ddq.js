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

$titleButton.hide()
// $descriptionButton.hide()
$selectButton.hide()
$nextPage.hide()

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

  $( function() {
      $( ".draggable" ).draggable();
      $( "#droppable3" ).droppable({
        drop: function( event, ui ) {
          $( this )
            .addClass( "droppable-highlight" )
            .find( "p" );
            var targetElem = ui.draggable;
     var id = $(this).attr("id");
     console.log(targetElem.html() +  " is dropped in " + id);
        }
      });
    });
    $( function() {
        $( ".draggable" ).draggable();
        $( "#droppable2" ).droppable({
          tolerance: "fit",
          drop: function( event, ui ) {
            $( this )
              .addClass( "droppable-highlight" )
              .find( "p" );
              var targetElem = ui.draggable;
       var id = $(this).attr("id");
       console.log(targetElem.html() +  " is dropped in " + id);
          }
        });
      });
      $( function() {
          $( ".draggable" ).draggable();
          $( "#droppable1" ).droppable({
            drop: function( event, ui ) {
              $( this )
                .addClass( "droppable-highlight" )
                .find( "p" );
                var targetElem = ui.draggable;
         var id = $(this).attr("id");
         console.log(targetElem.html() +  " is dropped in " + id);
         if ($('#droppable1').attr('value') == targetElem.html()) {
           $isCorrect = true;
           console.log('yay');
         }
            }
          });
        });
