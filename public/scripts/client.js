/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  renderTweets(data);
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
          <span class="time" >${data.created_at}</span>
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
