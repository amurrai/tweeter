/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
          <p> ${data.content.text} </p>
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
    for (let tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
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
  $newTweet.on('submit', function (event) {
    event.preventDefault();
    const tweetText = $("#tweet-text").val()
    if (tweetText === "") {
      alert("The tweet cannot be blank")
      return;
    }
    if (tweetText.length > 140) {
      alert("The tweet cannot be over 140 characters")
      return;
    }
    $.post($(this).serialize(), { method: 'POST'});
  })
});