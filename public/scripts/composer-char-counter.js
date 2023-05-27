let leftWord = 140;

// counter user enter charater number
$(".tweet-text").on('input', function(event){

    const $tweetText = $(this);
    const $form = $tweetText.closest('form');
    const $counter = $form.find('.counter');

    leftWord = 140 - event.currentTarget.value.length;
    
    $counter.val(leftWord);

    // set the counter element color according the counter value
    if(leftWord<0){
        $counter.addClass('counter-red');
    }else{
        $counter.removeClass('counter-red');
    }
})

