let leftWord = 140;

// counter user enter charater number
$(".tweet-text").on('keydown', function(event){
    const key = event.keyCode || event.charCode;

    // if user enter backspace or delete key, need to add counter value
    if(key == 8 || key == 46){
        
        if(leftWord<140){
            leftWord++;
        }
    }else{
        // if user enter other charater, need to minus counter value
        leftWord--;
        
    }
    
    $('.counter').val(leftWord);

    // set the counter element color according the counter value
    if(leftWord<0){
        $('.counter').css('color', 'red');
    }else{
        $('.counter').css('color', '#555555');
    }
})

