// Declaring a array of var birds
var birds= ["Eagle", "Osprey", "Kite", "Hawk", "Buzzard", "Harrier", "Vulture", "Falcon", "Caracara", "Owl"];

      // Function for displaying birds data
      function renderButtons() {

        // Deleting the bird buttons prior to adding new bird buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#birds-view").empty();

        // Looping through the array of birds
        // for (var n = 0; n < birds.length; n++) {
        for (var i = 0; i < birds.length; i++) {

          // Then dynamicaly generating buttons for each bird in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("bird");
          // Adding a data-attribute with a value of the bird at index i
          a.attr("data-name", birds[i]);
          // Providing the button's text with a value of the bird at index i
          a.text(birds[i]);
          // Adding the button to the HTML
          $("#birds-view").prepend(a);
        };
      };
// Adding click event listen listener to all buttons
$(document).on("click", "button", function() {
      // First emty the gifs, then storing the birds attributes
      $("#gifs-appear-here").empty();
      var birdI = $(this).attr("data-name");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        birdI + "&api_key=dc6zaTOxFJmzC&limit=10";

      console.log(queryURL);

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
          console.log(results);

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var birdDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var birdImage = $("<img>");
                    birdImage.attr({
                        "src" : results[i].images.fixed_height_still.url,
                        "data-still" : results[i].images.fixed_height_still.url,
                        "data-animate" : results[i].images.fixed_height.url,
                        "data-state" : "still"
            });

            // Appending the paragraph and image tag to the birdDiv
            birdDiv.prepend(p, birdImage);



            // Prependng the birdDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(birdDiv);

          }
          var topic = $("<h1>");
          topic.text(birdI);
          $("#gifs-appear-here").prepend(topic);
        });
    });

// Creating a click event to animate or stop the image when clicked
$(document).on("click", 'img', function(){
        var state = $(this).attr("data-state");
        if(state === "still"){
            $(this).attr("src",$(this).attr("data-animate"));
            $(this).attr("data-state","animate");

        } else {
            
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
});  

      // This function handles events where one button is clicked
      $("#add-bird").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var bird = $("#birds-input").val().trim();
        // The bird from the textbox is then added to our array
        birds.push(bird);

        // calling renderButtons which handles the processing of our bird array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of birds
      renderButtons();