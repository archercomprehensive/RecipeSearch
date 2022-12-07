const appId = '6c93c5b1'
const appKey = 'a333bcd0af27be4501023fb58b08fda6'

//https://api.edamam.com/api/recipes/v2/{id}

const recipeurl = 'https://api.edamam.com/search?q='
const searchInput = document.querySelector('.search-input');
const searchResult = document.querySelector('.search-result');
const form = document.querySelector('.form1')

form.addEventListener('submit', (p) => {
    p.preventDefault();
    const searchQuery = searchInput.value;
    fetchRecipes(searchQuery);
})

async function fetchRecipes(searchQuery) {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=6c93c5b1&app_key=a333bcd0af27be4501023fb58b08fda6&to=30`);
    const data = await response.json();
    displayRecipe(data.hits);
}

function displayRecipe(recipesResults) {
    let recipeEl = ''

    recipesResults.forEach(recipesResult => {
        recipeEl += ` 
        <div class="item">
            <img src="${recipesResult.recipe.image}"/>
            <div class="content-wrapper">
                <h2 class="recipe-title">${recipesResult.recipe.label}</h2>
                <a href="${recipesResult.recipe.url}" target="_blank" class="view-recipe">View Recipe</a>
            </div>
            <div class="recipe-desc">
                <p class="item-data">Calories: ${recipesResult.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet Label: ${recipesResult.recipe.dietLabels}</p>
                <p class="item-data">Health Label: ${recipesResult.recipe.healthLabels}</p>
                <p class="item-data">Source: ${recipesResult.recipe.source}</p>
            </div>
        </div>
        `        

        searchResult.innerHTML = recipeEl
    });
}