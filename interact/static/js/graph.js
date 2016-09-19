$("td").click(function(){
  $('table tr td:last-child').toggleClass('highlight');
  // $("table td:nth-child(" + lastIndex + ")").toggleClass("highlight");
  // $(this).toggleClass("highlight");
});
