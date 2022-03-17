// First, you want to explain to yourself the full feature.
// Break down feature with (3 question rule):
// => a. At what time can I do this event? (e.g. domcontentloaded)
// => b. What's going to trigger this event? (e.g. click)
// => c. Effect (e.g. display homepage)

/** Global variables **/
const baseUrl = 'http://localhost:3000';
let meals = [];

/** NODE Getters **/
// Easy way to grab nodes, written in a function format.
// *****************************************************
// 1. First node, we want to grab is the "#main" div.
const mainDiv = () => document.getElementById("main");
// 1. a. Now, what do we want to do with this mainDiv function that is a variable...

// 7. Another node, to that grabs the navbar link for "Meal Planner", which can be clicked anytime you are on the page.
const homePageLink = () => document.getElementById("home-page-link");

// 9. Grab the node to "List Meals"
const mealListLink = () => document.getElementById("meal-list-link");
/** NODE Getters ***************************************/

/** Templates **/
// 2. The idea here is to be able to call upon this from other functions, such as Rendrers...
const homePageTemplate = () => {
  return `
    <h1 class="center-align">Welcome to our Meal Planner</h1>
  `
}

// 5. Another template for what would be displayed for clicking on Meal List
const mealListTemplate = () => {
  return `
  <h1>Meal List</h1>
  <table class="highlight">
    <thead>
      <tr>
        <th>Date</th>
        <th>Meal</th>
        <th>Meal Name</th>
        <th>Diet</th>
      </tr>
    </thead>

    <tbody>
    ${renderMeals()}
    </tbody>
  </table>
  `
}

const mealTemplate = (meal) => {
  return `
  <tr>
    <td>${meal.date}</td>
    <td>${meal.meal}</td>
    <td>${meal.name}</td>
    <td>${meal.diet}</td>
  </tr>
  `
}

/** Renderers **/
// 3. The idea here is, to render the content to the DOM
const renderHomePage = () => {
  // 3. a. Get our mainDiv function, and set its innerHTML to our homePageTemplate function. Which will return a string of "<h1 class="center-align">Welcome to our Meal Planner</h1>".
  // 3. b. So, now this renderHomePage function is reusable and can be used by "Events", like onClick, or when the DOM LOADS, to show our homepage by default!!!!
  mainDiv().innerHTML = homePageTemplate();
}

// 6. The idea here is, to render another piece of content to the DOM, when clicked upon by a link.
const renderMealList = () => {
  mainDiv().innerHTML = mealListTemplate();
}

const renderMeals = () => {
  return meals.map(meal => mealTemplate(meal));
}

/** Events **/
// 8. Here is what "event" will happen when something is done on the DOM...
// 8. a. For e.g., below is for when someone clicks on the "link" with the text that says "Meal Planner", it should render the homepage...
const homePageLinkEvent = () => {
  homePageLink().addEventListener('click', (e) => {
    e.preventDefault();
    renderHomePage();
  })
}

// 10. When we click on List Meals
const mealListLinkEvent = () => {
  mealListLink().addEventListener('click', async (e) => {
    e.preventDefault();
    await loadMeals();
    renderMealList();
  })
}

// 11. Load meal from the JSON server, the idea here it fetching...
// const loadMeals = () => {
//   fetch(baseUrl + '/meals')
//   .then(resp => resp.json())
//   .then(data => meals = data)
// }
const loadMeals = async () => {
  const resp = await fetch(baseUrl + '/meals')
  const data = await resp.json();
  meals = data;
}

/** WHEN THE DOM LOADS **/
// 4. So, here is where we can use renderHomePage function on an "EVENT", like 'DOMContentLoaded'...
document.addEventListener('DOMContentLoaded', () => {
  // 4. a. So, an evenListener will take for parameter two things:
  // => i. the name of the event...
  // => ii. and a function of what that event will do...
  // ... so here we are sayin, when the page loads the anonymous arrow function is asking you to call the renderHomePage();
  // .... which will say that mainDiv().innerHTML is assigned the homePageTemplate() function, which will return the h1 element string that contains "Welcome to our Meal Planner" text.

  renderHomePage();
  homePageLinkEvent();
  mealListLinkEvent();
})