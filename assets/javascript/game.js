//Declare game object
var game = {
    wins: 0,
    losses: 0,
    crystalMin: 1,
    crystalMax: 12,
    gameMin: 19,
    gameMax: 120,
    gameScore: 0,

    gameNum: function() {
        $(".gameNbr").text(Math.floor(Math.random()*(this.gameMax-this.gameMin+1)+this.gameMin));
        game.gameScore = 0;
        $(".gameScr").text(this.gameScore);
    },

    crystalVal: function(){
        for (let i=1; i<5; i++) {
            $("#c"+i).val(Math.floor(Math.random()*(this.crystalMax-this.crystalMin+1)+this.crystalMin));
        };

    },

    onClick: function() {

        //On click function
        $(".crystalImage").on("click", function () {

            //Get crystal value and add it to game score
            crystalValue = parseInt($(this).val());
            game.gameScore += crystalValue;

            //Update game score display
            $(".gameScr").text(game.gameScore)

            //Is Game Score Greater Than Game Number is a loss

            if (game.gameScore > parseInt($(".gameNbr").text())){
                game.losses += 1;
                $(".losses").text("Losses: "+game.losses);

                //Pick a new game number
                game.gameNum();
                //Reset crystal values
                game.crystalVal();
            };

            //Is game score equal to game number is a win
            if (game.gameScore === parseInt($(".gameNbr").text())){
                game.wins += 1;
                $(".wins").text("Wins: "+game.wins);

                //Pick a new game number
                game.gameNum();
                //Reset crystal values
                game.crystalVal();
            };
        });
    }
};

$(document).ready(function(){
    game.gameNum();
    game.crystalVal();
    game.onClick();
});
