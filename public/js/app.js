// On page load
$(function() {
  pageLoad();
});

var foodTemplateURL = "/static/html/foodTemplate.html";

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
        $("#new-food-form")[0].reset();
        renderFood(res);
      });
  });
}

function getFoods() {
  $.get("/foods", function(res){ 
    var foods = res;
    // grab foods template
    renderFoods(foods)
  });
}

function renderFoods(foods) {
  // get template through ajax
  $.get(foodTemplateURL, function(templateHTML) {
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

function renderFood(food) {
  $.get(foodTemplateURL, function(templateHTML) {
    var template = _.template(templateHTML);
    // append foods to ul
    $("#food-ul").append(template(food));
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
