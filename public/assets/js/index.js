function displayArticles(articlesArray) {
    console.log(articlesArray);
    articlesArray.forEach(article => {
        
        const parentDiv = $("<div>").attr("data-id", article._id).addClass("card");

        const cardHeaderDiv = $("<div>").addClass("card-header");
        parentDiv.append(cardHeaderDiv);
        
        const h3 = $("<h3>");
        cardHeaderDiv.append(h3);

        const a = $("<a>").addClass("article-link").attr("target", "_blank");
        a.attr("href", article.link).text(article.title);
        h3.append(a);

        const button = $("<a>").addClass("btn btn-success save").text("Save Article");
        h3.append(button);

        $("#article-well").append(parentDiv);
        
        console.log(article);
    });
};

$(document).ready(function() {
    
    // On each page load, retrieve all articles in database
    $.get("/articles").then(function(data) {
        console.log("page reloaded")
        displayArticles(data);
      });

    // Scrape new articles, and alert user if no new ones are found
    $(".scrape-new").on("click", function() {
    
        $.get("/scrape").then(function(data) {
            if (data === "Scrape complete: no new articles added.") {
                alert("Scrape complete: no new articles added.")
            } else {
                location.reload();
            };
        });

    });

});
