function displaySavedArticles() {
    $("#article-well").html('<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>');

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

                const button2 = $("<button>").addClass("btn btn-danger view-note").text("NOTES");
                h4.append(button2);

                $("#article-well").append(parentDiv);

                console.log(article);
            };
        });

        if (articlesRendered === 0) {
            const parentDiv = $("<div>")

            const h3 = $("<h3>").css("text-align", "center");
            parentDiv.append(h3);

            const a = $("<a>").attr("href", "index.html").text("No articles saved!");
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

    $(document.body).on("click", ".view-note", function() {
        const id = $(this).prev().prev().attr("data-id");
        $.get("/articles/" + id).then(function(data) {
            // Constructing our initial HTML to add to the notes modal
            const modalText = $("<div class='container-fluid text-center'>").append(
              $("<h4>").text("Notes For Article: " + id).attr("article-id", id).addClass("modalID"),
              $("<hr>"),
              $("<ul class='list-group note-container'>"),
              $("<textarea placeholder='New Note' rows='4' cols='60'>"),
              $("<button class='btn btn-success save'>Save Note</button>")
            );
            // Adding the formatted HTML to the note modal
            bootbox.dialog({
              message: modalText,
              closeButton: true
            });
        
        // const id = $(this).prev().prev().attr("data-id");
        // console.log(id);
        // $.ajax("/articles/" + id, {
        //     type: "PUT",
        //     data: {
        //         note: "test"
        //     }
        // }).then(function () {
        //     displaySavedArticles();
        // });
        });
    });

    $(document.body).on("click", ".save", function() {

        const articleID = $(".modalID").attr("article-id");
        console.log(articleID);

    });

});