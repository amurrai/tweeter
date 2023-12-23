$(document).ready(function() {
  const $charNum = $('#charNum');
  let len = 0;
  $( "textarea" ).on("input", function() {
    len = this.value.length;
    $charNum.text(140 - len);
    // color change to alert invalid character count
    if (len > 140) {
      $charNum.css('color', '#c40000')
    }
    // reset color if back to valid value
    if (len <= 140) {
      $charNum.css('color', '#545149')
    }
  }).trigger('change');

  // reset counter on submit
  $("#create-new-tweet").on('submit', function () {
    len = $("textarea").value.length;
    $(".counter").text(140);
  });
});