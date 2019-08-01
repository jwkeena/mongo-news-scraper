$(document).ready(function() {
    
    $(".scrape-new").on("click", function() {
    
        $.get("/scrape").then(function(data) {
            console.log(data);
        })
    });




});
