/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//escape function to prevent script text input 
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(() => {
  const createTweetElement = function(data) {
    const $tweet = `
    <article class="tweet">
          <header>
            <div class="tweet-avatar">
              <img src=${data.user.avatars}> 
              <h3>${data.user.name}</h3>
            </div>
            <div>
              <h3>${data.user.handle}</h3>
            </div>
          </header>
          <p> ${escape(data.content.text)} </p>
          <footer>
            ${timeago.format(data.created_at)}
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
    `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();

  const $newTweet = $('#create-new-tweet');
  $("#tweet-blank").hide();
  $("#tweet-140").hide();  
  
  $newTweet.on('submit', function (event) {
    event.preventDefault();
    $("#tweet-blank").hide();
    $("#tweet-140").hide();  
    const tweetText = $("#tweet-text").val()
    if (tweetText === "") {
      $("#tweet-blank").slideDown();
      return;
    }
    if (tweetText.length > 140) {
      $("#tweet-140").slideDown();
      return;
    }
    $.post("/tweets", $(this).serialize(), function() { 
      $newTweet[0].reset();
      loadTweets();
    });    
  })
});