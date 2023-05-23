/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let users = 
[
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1684693902375
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1684780302375
    }
];

const createTweetElement = (data)=>{
    let eachTweet = $(`
    <article>
    <header class="tweets-header">
        <div>
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
}

const renderTweets = (users)=>{
    let eachTweet = '';
    users.forEach(tweet=>{
        eachTweet = createTweetElement(tweet);
        $('.tweets-container').append(eachTweet);
    })
    
}

const loadTweets = ()=>{
    $.get('/tweets/', function(data){
        renderTweets(data);
    })
    
}


loadTweets();


$("#new-tweet-form").on("submit", function(event){
    const str = $("#new-tweet-form").serialize();
    console.log(str);
    event.preventDefault();

    $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: str
    }).done((msg)=>{
        console.log(msg);
    })
})