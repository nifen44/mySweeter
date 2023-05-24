let leftWord = 140;

$(".tweet-text").on('keydown', function(event){
    const key = event.keyCode || event.charCode;

    if(key == 8 || key == 46){
        
        if(leftWord<140){
            leftWord++;
        }
    }else{
        leftWord--;
        
    }
    
    $('.counter').val(leftWord);

    if(leftWord<0){
        $('.counter').css('color', 'red');
    }else{
        $('.counter').css('color', '#555555');
    }
})

$(".tweet-text").on('')

