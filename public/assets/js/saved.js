function displaySavedArticles() {
    $.get("/articles").then(function (articles) {
        $("#article-well").empty();

        let articlesRendered = 0;
        articles.forEach(article => {

            // Only render article if it HAS been saved in favorites
            if (article.isSaved) {

                articlesRendered = articlesRendered + 1;
                const parentDiv = $("<div>").addClass("card");

                const cardHeaderDiv = $("<div>").addClass("card-header");
                parentDiv.append(cardHeaderDiv);

                const h4 = $("<h4>");
                cardHeaderDiv.append(h4);

                const a = $("<a>").addClass("article-link").attr("target", "_blank");
                a.attr("href", article.link).attr("data-id", article._id).text(article.title);
                h4.append(a);

                const button = $("<button>").addClass("btn btn-danger delete").text("DELETE");
                h4.append(button);

                $("#article-well").append(parentDiv);

                console.log(article);
            };
        });

        if (articlesRendered === 0) {
            const parentDiv = $("<div>")

            const h3 = $("<h3>").css("text-align", "center");
            parentDiv.append(h3);

            const a = $("<a>").attr("href", "index.html").text("No articles saved! Return to home?");
            h3.append(a);

            $("#article-well").append(parentDiv);

        }
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