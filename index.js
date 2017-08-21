$(document).ready(function() {

    $(".button").click(function() {
        // $(".sidebar").toggle();
        console.log($(".section1").css("display"));
        if ($(".section1").css("display") == "none") {
            $(".section1").css({"display" : "block"});
            $(".section1").animate({left: '0'});
            $(".button div").css({"background-color": "#fff"});
        } else {
            $(".section1").animate({left: '-100%'}, function() {
                $(".section1").css({"display": "none"});
                $(".button div").css({"background-color": "#222"});
            });
        }
    });

});
