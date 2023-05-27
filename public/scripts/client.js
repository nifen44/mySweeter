/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(()=>{
  // load all tweets
loadTweets();

// the animation of add tweet btn
(function chevronDownloop() {
  $('.add-tweet-btn').animate({top: '70px'}, {
    duration: 1000,
    complete: function() {
      $('.add-tweet-btn').animate({top: '80px'}, {
        duration: 1000,
        complete: chevronDownloop});
    }});
})();

// when scorll the container, the scroll up button shows, and the navigation bar gets dispear
$(window).on("scroll", function() {
  // console.log($(document.body).scrollTop());
  if ($(window).scrollTop() == 0) {
    $('.scroll-up-btn').hide();
    $('nav').css({
      "opacity": "1"
    });
  } else {
    $('.scroll-up-btn').show();
    $('nav').css({
      "opacity": "0"
    });
      
  }
});

// add event listener to that red scroll up button
$(".scroll-up-btn").click(function() {
  $("html, body").animate({
    scrollTop: 0
  }, "fast");
  return false;
});

// add event listener to add tweet btn
$('.add-tweet-btn').on('click', function() {
  $('.new-tweet').slideDown(500, function() {
    $('.tweet-text').focus();
  });
});

});

const createTweetElement = (data)=>{
  let eachTweet = $(`
    <article class="tweets-article">
    <header class="tweets-header">
        <div class="tweets-header-left">
            <img src="${data.user.avatars}" class="tweets-header-avatar"/>
            <span class="tweets-header-name">${data.user.name}</span>
        </div>
        <div>
            <span class="tweets-header-handler">${data.user.handle}</span>
        </div>
    </header>
    <div class="tweets-header-content">
        <p>${data.content.text}</p>
    </div>
    <footer>
        <span class="tweets-header-created">
            ${$.timeago(data.created_at)}
        </span>
        <span class="icon-span">
            <button><i class="fa-solid fa-flag"></i></button>
            <button><i class="fa-solid fa-retweet"></i></button>
            <button><i class="fa-solid fa-heart"></i></button>
        </span>
    </footer>
    </article>
`);
  return eachTweet;
};

const renderTweets = (users)=>{

  const $container = $('.tweets-container').empty();

  let eachTweet = '';
  users.forEach(tweet=>{
    eachTweet = createTweetElement(tweet);
    $container.prepend(eachTweet);
  });
    
};

const loadTweets = ()=>{
  const $tweetError = $('.tweet-error');

  $.get('/tweets/')
  .then(data=>{
    renderTweets(data);
  })
  .catch(error=>{
    $tweetError.empty();
    $tweetError.append("⚠ Sever Error, can not fetch tweets. ⚠ ");
    $tweetError.slideDown(400, function() {
            
    });
  });
    
};



$("#new-tweet-form").on("submit", function(event) {
  event.preventDefault();

  const $form = $(this);
  const $input = $form.find('.tweet-text');
  const $counter = $form.find('.counter');
  const $container = $form.closest('.container');
  const $tweetError = $container.find('.tweet-error');
  const $tweetsContainer = $container.find('.tweets-container');

    // if the counter value shows negative, show some error and can not submit the form
  if ($counter.val() < 0) {
    $tweetError.empty();
    $tweetError.append("⚠ You enter too much text, please limit it. ⚠ ");
    $tweetError.slideDown(400, function() {
            
    });

    return;
  } else if ($counter.val() == 140) {// if user didn't enter anything, show some error and can not submit the form
    $tweetError.empty();
    $tweetError.append("⚠ You haven't text yet, please text something. ⚠ ");
    $tweetError.slideDown(400, function() {
            
    });
    return;
  }

  // when user enter is correct, reset the counter to 140
  $counter.val(140);
  // when user enter is correct, reset the container by removing the error message
  $tweetError.slideUp(200, function() {
    $tweetError.empty();
  });

  // get the user input
  const str = $("#new-tweet-form").serialize();
  console.log(str);

  $.post('/tweets/', str)
    .then((data)=>{
      $input.val('');
      $input.focus();
      $counter.html(140);
      
      const articleHtml = `
            <article class="tweets-article">
            <header class="tweets-header">
                <div class="tweets-header-left">
                    <img src="${data.user.avatars}" class="tweets-header-avatar"/>
                    <span class="tweets-header-name">${data.user.name}</span>
                </div>
                <div>
                    <span class="tweets-header-handler">${data.user.handle}</span>
                </div>
            </header>
            <div class="tweets-header-content">
                <p>${data.content.text}</p>
            </div>
            <footer>
                <span class="tweets-header-created">
                    ${$.timeago(data.created_at)}
                </span>
                <span class="icon-span">
                    <button><i class="fa-solid fa-flag"></i></button>
                    <button><i class="fa-solid fa-retweet"></i></button>
                    <button><i class="fa-solid fa-heart"></i></button>
                </span>
            </footer>
            </article>
        `;
      $tweetsContainer.prepend(articleHtml);


    })

  // do ajax post submit
  // $.ajax({
  //   type: 'POST',
  //   url: '/tweets/',
  //   data: str,
  //   success: function(data) {
  //     const articleHtml = `
  //           <article class="tweets-article">
  //           <header class="tweets-header">
  //               <div class="tweets-header-left">
  //                   <img src="${data.user.avatars}" class="tweets-header-avatar"/>
  //                   <span class="tweets-header-name">${data.user.name}</span>
  //               </div>
  //               <div>
  //                   <span class="tweets-header-handler">${data.user.handle}</span>
  //               </div>
  //           </header>
  //           <div class="tweets-header-content">
  //               <p>${data.content.text}</p>
  //           </div>
  //           <footer>
  //               <span class="tweets-header-created">
  //                   ${$.timeago(data.created_at)}
  //               </span>
  //               <span class="icon-span">
  //                   <button><i class="fa-solid fa-flag"></i></button>
  //                   <button><i class="fa-solid fa-retweet"></i></button>
  //                   <button><i class="fa-solid fa-heart"></i></button>
  //               </span>
  //           </footer>
  //           </article>
  //       `;
  //     $('.tweets-container').prepend(articleHtml);

  //     $('.tweet-text').val('');
  //     $('.tweet-text').focus();
  //   }
  // });
});



