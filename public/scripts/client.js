/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const form = $("#new-tweets");

  // handle the form submit event
  form.submit(function (event) {
    // prevent the default form submit action
    event.preventDefault();

    // serialize the form data
    const formData = form.serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function (response) {
        // handle successful response from server
        $(".tweets").empty();
        loadTweets();
        console.log(response);
      },
      error: function (error) {
        // handle error response from server
        console.log(error);
      },
    });
  });
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
      success: function (tweets) {
        console.log(tweets);
        renderTweets(tweets);
      },
      error: function (errorThrown) {
        console.error("Error fetching tweets:", errorThrown);
        // Handle the error appropriately
      },
    });
  }
  loadTweets();
});

const createTweetElement = function (data) {
  const $tweet = `<article class="tweet">
        <header class="tweet-header">
          <span> 
            <img class="avatar" alt="profile-image" src=${data.user.avatars}/>
            <span>${data.user.name}</span>
          </span>
          <h3>${data.user.handle}</h3>
        </header>
      <section class="tweet-text">${data.content.text}</section>
      <div class="line"> </div>
      <footer>
          <span class="time" >${timeago.format(data.created_at)}</span>
            <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            </div>
      </footer>
    </article>`;
  return $tweet;
};

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  }
};
