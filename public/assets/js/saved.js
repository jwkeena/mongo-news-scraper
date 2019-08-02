function displaySavedArticles() {
    $.get("/articles").then(function (articles) {
        $("#article-well").empty();
        articles.forEach(article => {
    
            // Only render article if it HAS been saved in favorites
            if (article.isSaved) {
                const parentDiv = $("<div>").addClass("card");
    
                const cardHeaderDiv = $("<div>").addClass("card-header");
                parentDiv.append(cardHeaderDiv);
    
                const h3 = $("<h3>");
                cardHeaderDiv.append(h3);
    
                const a = $("<a>").addClass("article-link").attr("target", "_blank");
                a.attr("href", article.link).attr("data-id", article._id).text(article.title);
                h3.append(a);
    
                const button = $("<a>").addClass("btn btn-danger delete").text("Delete Article");
                h3.append(button);
    
                $("#article-well").append(parentDiv);
    
                console.log(article);
            };
        });
    });
};

$(document).ready(function () {

    // On each page load, retrieve all articles in database
    displaySavedArticles();

    // Event delegation for deleting article from database
    $(document.body).on("click", ".delete", function () {
        const id = $(this).prev().attr("data-id");
        $.ajax("/articles/" + id, {
            type: "DELETE",
        }).then(function () {
            displaySavedArticles();
        });
    });

});