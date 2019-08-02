function displayArticles() {
    
    $.get("/articles").then(function(articles) {
        $("#article-well").empty();

        articles.forEach(article => {
            
            // Only render article if it hasn't been saved in favorites
            if (!article.isSaved) {
                const parentDiv = $("<div>").addClass("card");
        
                const cardHeaderDiv = $("<div>").addClass("card-header");
                parentDiv.append(cardHeaderDiv);
                
                const h3 = $("<h3>");
                cardHeaderDiv.append(h3);
        
                const a = $("<a>").addClass("article-link").attr("target", "_blank");
                a.attr("href", article.link).attr("data-id", article._id).text(article.title);
                h3.append(a);
        
                const button = $("<a>").addClass("btn btn-success save").text("Save Article");
                h3.append(button);
        
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
    $(".scrape-new").on("click", function() {
    
        $(this).html('<span class="btn-primary spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');

        $.get("/scrape").then(function(data) {
            console.log(data);
            displayArticles();
            $("#scraper").html('<a class="btn-primary scrape-new">peel the onion!</a>').removeClass('disabled');
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
