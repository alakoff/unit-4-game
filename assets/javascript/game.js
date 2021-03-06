//Declare the game object
var game = {

    //Game variables
    wins: 0,
    losses: 0,
    crystalMin: 1,
    crystalMax: 12,
    gameMin: 19,
    gameMax: 120,
    gameScore: 0,


    //Determines the random number for the game
    gameNum: function() {
        $(".gameNbr").text(Math.floor(Math.random()*(this.gameMax-this.gameMin+1)+this.gameMin));
        game.gameScore = 0;
        $(".gameScr").text(this.gameScore);
    },


    //Sets the randon values for each crystal
    crystalVal: function() {
        for (let i=1; i<5; i++) {
            $("#c"+i).val(Math.floor(Math.random()*(this.crystalMax-this.crystalMin+1)+this.crystalMin));
        };
    },


    //Plays the game music
    playSound: function() {
        $(".sound").trigger("load");
        $(".sound").trigger("play");
        //Hide moving crystal
    },


    //Move Crystal after winning
    moveCrystal: function() {
        $(".movingCrystal").css("display","block");
        $(".movingCrystal").animate({
            "marginLeft":"+=900px",
            "animation-duration": "100s"
        });
        $(".movingCrystal").animate({
            "marginTop":"-=300px",
            "animation-duration": "100s"
        });
        $(".movingCrystal").animate({
            "marginLeft":"-=900px",
            "animation-duration": "100s"
        });
        $(".movingCrystal").animate({
            "marginTop":"+=300px",
            "animation-duration": "100s"
        });
        $(".movingCrystal").append("<img src='assets/images/moving.jpg' height='75' width='75'>");
    },


    //Main game play function
    playGame: function() {

        //Reset game number and game score
        game.gameNum();

        //Reset crystal values
        game.crystalVal();

        //On click function
        $(".crystalImage").on("click", function () {

            //pause sound playing
            $(".sound").trigger('pause');

            //set play time to 0
            $(".sound").prop("currentTime",0);

            //Clear game messages
            $(".messages").text("");

            //Reset border color for won loss total box
            $(".WonLossTotal").css("border-color", "blue");

            //Get crystal value and add it to game score
            crystalValue = parseInt($(this).val());
            game.gameScore += crystalValue;

            //Update game score display
            $(".gameScr").text(game.gameScore)

            //Is Game Score Greater Than Game Number is a loss
            if (game.gameScore > parseInt($(".gameNbr").text())){
                game.losses += 1;
                $(".losses").text("Losses: "+game.losses);
                $(".WonLossTotal").css("border-color", "red");
                $(".messages").text("Your score exceeded the game number. Click on a crystal to play again.")

                //Play sound
                // game.playSound();

                //Pick a new game number
                game.gameNum();

                //Reset crystal values
                game.crystalVal();
            };

            //Is game score equal to game number is a win
            if (game.gameScore === parseInt($(".gameNbr").text())){
                game.wins += 1;
                $(".wins").text("Wins: "+game.wins);
                $(".WonLossTotal").css("border-color", "green");
                $(".messages").text("Your score matched the game number. Click on a crystal to play again.");

                //Animate crystal
                game.moveCrystal();

                //Play sound
                game.playSound();

                //Pick a new game number
                game.gameNum();

                //Reset crystal values
                game.crystalVal();
            };
        });
    }
};


//Main program block below
$(document).ready(function(){
    game.playGame();
});
