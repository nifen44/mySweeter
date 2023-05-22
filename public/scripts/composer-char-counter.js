let leftWord = 140;

$(".tweet-text").on('keypress', function(){
    leftWord--;
    $('.counter').val(leftWord);

    if(leftWord<0){
        $('.counter').css('color', 'red');
    }
})

