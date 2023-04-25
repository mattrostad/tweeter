/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#error-messages").slideUp();
  // handle the form submit event
  $("#new-tweets").submit(function (event) {
    // prevent the default form submit action
    event.preventDefault();

    // serialize the form data
    const formData = $(this).serialize();
    /////
    //1. Condition Form text has value
    // select the error message container
    const errorMessageContainer = $("#error-messages");
    let tweetText = $("#tweet-text").val();
    if (tweetText === "") {
      return errorMessageContainer
        .html("Please fill in the tweet!")
        .slideDown();
    }
    if (tweetText.length > 140) {
      return errorMessageContainer
        .html("Please make tweet shorter!")
        .slideDown();
    }

    /////
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function (response) {
        // handle successful response from server
        $(".tweets").empty();
        loadTweets();
        errorMessageContainer.slideUp();
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

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (data) {
  const safeTweetText = `<p>${escape(data.content.text)}</p>`;
  const $tweet = $(`<article class="tweet">
    <header class="tweet-header">
      <span> 
        <img class="avatar" alt="profile-image" src=${data.user.avatars}/>
        <span class="user">${data.user.name}</span>
      </span>
      <h3 class="handle">${data.user.handle}</h3>
    </header>
    <section class="tweet-text">${safeTweetText}</section>
    <div class="line"> </div>
    <footer>
      <span class="time" >${timeago.format(data.created_at)}</span>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  return $tweet;
};

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};
