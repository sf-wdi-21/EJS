// On page load
$(function() {
  pageLoad();
});

// function definitions

function pageLoad() {
  // set event listeners
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post to food#create
    $.post("/foods", $(this).serialize())
      .done(function(res){
        // append new food to the page
        getFoods();
        $("#new-food-form")[0].reset();
      });
  });
}

function getFoods() {
  $.get("/foods", function(res){ 
    var foods = res.reverse();
    // grab foods template
    renderFoods(foods)
  });
}

function renderFoods(foods) {
  // get template through ajax
  $.get("/static/html/foodTemplate.html", function(templateHTML) {
    var template = _.template(templateHTML);
    // input foods into template and append to parent
    var foodItems = foods.map(function(food) {
      return template(food);
    });
    // clear content (for repeated use)
    $("#food-ul").html("");
    // append foods to ul
    $("#food-ul").append(foodItems);
  })
}

function deleteFood(context) {
  var foodId = $(context).data().id;
  $.ajax({
    url: '/foods/' + foodId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all foods
      getFoods();
    }
  });
}
