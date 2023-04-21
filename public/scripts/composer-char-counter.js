$(document).ready(function () {
  const tweetLimit = 140;
  $("#tweet-text").on("input", function () {
    const content = $(this).val(); // Get the content of the textarea
    const remainingLength = tweetLimit - content.length;
    $("#counter").text(remainingLength);
    if (remainingLength < 0) {
      return $("#counter").css({
        color: "red",
      });
    } else {
      return $("#counter").css({
        color: "black",
      });
    }
  });
});

$("#btn").on("click", function () {
  console.log(this); //The this keyword is a reference to the button
});
