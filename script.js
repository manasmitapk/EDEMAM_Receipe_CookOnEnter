const searchForm = document.querySelector('form');
const searchResultDiv =  document.querySelector('.search-result');
const container = document.querySelector('.container');
let selectQuery ='';
const APP_ID = 'd28c7bea';
const APP_key = 'de30e6b4447a768a3a09095aa5ead839';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
});

async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=40`;
    const response = await fetch(baseURL); 
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML (results){
    let generateHTML = '';
    results.map(result => {
        generateHTML +=
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div>
            <h2 class="title">${result.recipe.label}</h2>
        </div>
        <a href="${result.recipe.url}"> view recipe</a>
        <p class="item-data">Health label: ${result.recipe.healthLabels}</p>
        <p class="item-data">Ingredient: ${result.recipe.ingredientLines}</p>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>
        <p class="item-data">Calcium: ${result.recipe.totalNutrients.CA.quantity.toFixed(3)}mg</p>
        <p class="item-data">Protein: ${result.recipe.totalNutrients.PROCNT.quantity.toFixed(3)}g</p>
        <p class="item-data">Vitamin A: ${result.recipe.totalNutrients.VITA_RAE.quantity.toFixed(3)}µg</p>
        <p class="item-data">Vitamin B12: ${result.recipe.totalNutrients.VITB12.quantity.toFixed(3)}µg</p>
        <p class="item-data">Zinc: ${result.recipe.totalNutrients.ZN.quantity.toFixed(3)}mg</p>
        
    </div>
    `
    });
    searchResultDiv.innerHTML = generateHTML;
}
