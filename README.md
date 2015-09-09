# EJS-to-Eatly

###An example app using EJS (and an underscore template).
<br>
We're going to be doing two lessons in one: one about EJS and the other focusing on git branches. Being the responsible developer you are, you've already made a github repo of your work and are pushing to it regularly. We will be making a new branch for EJS, and at the end of the lesson, we will add/commit and push that branch to your repo. From there we can merge to the master branch and hopefully not have any merge conflicts (but if we do, we'll resolve them along the way). 

**Steps**
* In your terminal type `git checkout -b ejs` to make and checkout a new git branch
* Install ejs: `npm install --save ejs`
* Require it in the project in your index.js file: `app.set('view engine', 'ejs');`
* For the purpose of learning we will make `profile.ejs` in your views folder

* We will work on one route, and for simplicity let's choose "/profile". In our route, we will have something similar to:

```js
req.currentUser(function(err, user) {
  res.render('profile.ejs', {taco: user});
});
```

In our profile.ejs
```html
Hello <%= taco.email %>
```

* In our profile route instead of res.sendFile(etc) we will have: `res.render('profile', {taco: user});` This means that we are sending the data of `user` into ejs as a variable of `taco`
* For partials we will make a new directory called partials in our views folder `mkdir views/partials` and add a head partial `touch views/partials/head.ejs` 
```html
<head>
  <title>PARTIAL HEAD</title>
</head>
```
* Then require that partial at the top of your `profile.ejs` file. Ejs partial (optional): `<% include partials/head %>`
* You'll notice now that if you go to your `/profile` route, the title of your page is "PARTIAL HEAD" and you should have "HELLO myemail@email.com"

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
