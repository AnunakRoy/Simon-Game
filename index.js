var allButtons = [];
var i = 1, j = 0;

// Processing a click
function clickProcessing(event){
    var audio = new Audio('sounds/mouseClick.mp3');
    audio.play();
    var clickedClass = event.target.classList[1];
    $("." + clickedClass).addClass("pressed");
    setTimeout(function () {
        $("." + clickedClass).removeClass("pressed");
    }, 100);
    if(clickedClass === allButtons[j])
        return 1;
    else return 0;
}
// Generating a square to click
function randomSquareGenerator() {
    var randomNum = Math.floor(Math.random() * 4);
    var buttons = ["green", "red", "yellow", "blue"];
    var randomCol = buttons[randomNum];
    allButtons.push(randomCol);

    setTimeout(function () {
        $("." + randomCol).addClass("new-square");
    }, 1000);

    
    setTimeout(function () {
        $("." + randomCol).removeClass('new-square');
    }, 1100);

    var audio = new Audio('sounds/' + randomCol + '.mp3');
    audio.play();
}

// Event handler for keydown event
$("body").keydown(function (event) {
    if (i === 1 && event.key === " ") {
        $("#level-title").html("Level " + i);
        ++i;
        randomSquareGenerator();
    } 
});

// Event handler for click event
$(".btn").click(function (event) {
    if(i>1 && j!=allButtons.length)
    {
        var clicking = clickProcessing(event);
        if(clicking)
        {
            j++;
            if(j==allButtons.length)
            {
                $("#level-title").html("Level " + i++);
                j=0;
                randomSquareGenerator();
            }
        }
        else
        {
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
                var audio = new Audio('sounds/' + 'wrong' + '.mp3');
                audio.play();
            }, 100);
            $("#level-title").html(`Game Over. You reached till <em>Level ${i-1}</em> ! Press Spacebar to Restart`);
            i = 1;
            j = 0;
            allButtons = [];

        }
    }    
});