$(document).ready(function() {
  console.log("JS started");
  const $charNum = $('#charNum');
  
  $( "textarea" ).on("input", function() {
    let len = this.value.length;
    $charNum.text(140 - len);
    if (len > 140) {
      $charNum.css('color', '#c40000')
    }
  }).trigger('input');
  
});