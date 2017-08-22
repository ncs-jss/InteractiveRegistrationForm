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

window.onload = function(){
    var conversationalForm = window.cf.ConversationalForm.startTheConversation({
        formEl: document.getElementById("form"),

        flowStepCallback: function(dto, success, error)
        {

            if(dto.tag.id == "name"){
                if(dto.tag.value.trim() != ""){
                    return success();
                }else{
                    return error();
                }
                //conversationalForm.stop("Stopping form, but added value");
            } else if(dto.tag.id == "admission_no"){
                var re = /^[0-9]{2}\w{2,3}[0-9]{3}$/;
                if(re.test(dto.tag.value)){
                    return success();
                }else{
                    return error();
                }
            } else if(dto.tag.name == "email"){
                var re = /^\S+@\w+\.\w+$/;
                if(re.test(dto.tag.value)) {
                    return success();
                } else{
                    return error();
                }
            } else if(dto.tag.name == "mobile"){
                var re = /^[0-9]{10}$/;
                if(re.test(dto.tag.value)) {
                    return success();
                } else{
                    return error();
                }
            }
            return success();
        },
        submitCallback: function(){
            // be aware that this prevents default form submit.
            var formDataSerialized = conversationalForm.getFormData(true);
            console.log("Formdata, serialized:", formDataSerialized);
            $.post("http://a7038c42.ngrok.io", formDataSerialized,
            function(data, status){
                if (status) {
                    conversationalForm.addRobotChatResponse("Thanks for your response.");
                } else {
                    conversationalForm.addRobotChatResponse("Error, Please submit again");
                }
            });
        }
    });
};
