$(document).ready(function() {
  console.log("JS started");
  const $charNum = $('#charNum');
  let len = 0;
  $( "textarea" ).on("input", function() {
    len = this.value.length;
    $charNum.text(140 - len);
    if (len > 140) {
      $charNum.css('color', '#c40000')
    }
    if (len <= 140) {
      $charNum.css('color', '#545149')
    }
  }).trigger('change');

  // reset counter on submit
  // $("#create-new-tweet").on('submit', function () {
  //   // len = $("textarea").value.length;
  //   $charNum.text(140);
  // });
});