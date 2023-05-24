/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
        type: 'POST',
        url: '/tweets/',
        data: str,
        success: function(data, status){
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
        `
            $('.tweets-container').prepend(articleHtml);
        }
    })
})