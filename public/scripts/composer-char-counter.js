let leftWord = 140;

// counter user enter charater number
$(".tweet-text").on('input', function(event){
    const key = event.keyCode || event.charCode;

    leftWord = 140 - event.currentTarget.value.length;
    
    $('.counter').val(leftWord);

    // set the counter element color according the counter value
    if(leftWord<0){
        $('.counter').css('color', 'red');
    }else{
        $('.counter').css('color', '#555555');
    }
})

