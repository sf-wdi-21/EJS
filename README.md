# EJS_to_Eatly

An example app using EJS (and an underscore template).

**Steps**
* Install ejs: `npm install --save ejs`
* Require it in the project: `app.set('view engine', 'ejs');`
* Render a template: `res.render('index');`
* Require an ejs partial (optional): `<% include partials/head %>`
* Pass in data (optional): `res.render('index', {foodItems: foods});`
* Iterate through the data (optional): 

```html
<% foodItems.forEach(function(food) { %>
  <li class='list-group-item'><%= food.name %>
    <span class="label label-default"><%= food.yumminess%></span>
    <button data-id="<%= food.id %>" onclick="deleteFood(this)" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  </li>
<% }); %>
```

**Bonus**
* Use Underscore with ejs. One method is to use an AJAX request to grab your underscore templates.
  * Placing them in the same document creates conflicts as the `<%=...%>` syntax is apparent in both underscore and ejs, so we must place them in seperate documents to avoid it.
  * Another option would be to [change](http://stackoverflow.com/questions/17462069/cant-get-underscore-js-to-use-curly-braces-without-syntax-error#answers-header) the `<%=...%>` syntax to something else, such as `{{=...}}`.

For more information on how to use EJS refer to this [tutorial](https://scotch.io/tutorials/use-ejs-to-template-your-node-application).
