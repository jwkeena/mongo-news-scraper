function displayArticles() {
    
    $.get("/articles").then(function(articles) {
        $("#article-well").empty();

        articles.forEach(article => {
            
            // Only render article if it hasn't been saved in favorites
            if (!article.isSaved) {
                const parentDiv = $("<div>").addClass("card");
        
                const cardHeaderDiv = $("<div>").addClass("card-header");
                parentDiv.append(cardHeaderDiv);
                
                const h4 = $("<h4>");
                cardHeaderDiv.append(h4);
        
                const a = $("<a>").addClass("article-link").attr("target", "_blank");
                a.attr("href", article.link).attr("data-id", article._id).text(article.title);
                h4.append(a);
        
                const button = $("<button>").addClass("btn btn-success save").text("SAVE");
                h4.append(button);
        
                $("#article-well").append(parentDiv);
                
                console.log(article);
            }
        });

      });
};

$(document).ready(function() {

    // On each page load, retrieve all articles in database
    displayArticles();

    // Scrape new articles, and alert user if no new ones are found
    $("#scraper").on("click", function() {
    
        $("#scraper").html('<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>getting new articles...</button>');

        $.get("/scrape").then(function(data) {
            console.log(data);
            displayArticles();
            $("#scraper").html('<button class="btn btn-primary">peel the onion!</button>').removeClass('disabled');
        });

    });

    $(document.body).on("click", ".save", function() {
        
        const id = $(this).prev().attr("data-id");

        $.ajax("/articles/" + id, {
            type: "PUT",
            data: {
                isSaved: true
            }
        }).then(function () {
            displayArticles();
        });

    });

});
