function loadMeal(searchText) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBestMeals(data.meals));
}

const displayBestMeals = (meals) => {
  const mealsContainer = document.getElementById("mealsContainer");
  mealsContainer.innerText = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
        <div class="card h-100 w-90">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                        <!-- Button trigger modal -->
                <button onclick="mealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetailsModal">
                    Check Details
                </button>
            </div>
      
        </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

const searchMeals = () => {
  const searchTextField = document.getElementById("search-field");
  const searchText = searchTextField.value;
  searchTextField.value = "";
  loadMeal(searchText);
};

const mealDetails =(idMeal)=>{
    // console.log(idMeal);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails=(meal)=>{
    console.log(meal);
document.getElementById('mealDetailsModalLabel').innerText = meal.strMeal;
document.getElementById('modal-details').innerHTML =`

<img class="img-fluid" src="${meal.strMealThumb}" alt="">
<h3>${meal.strCategory}</h3>
<h4>${meal.strArea}</h4>
<h5>${meal.strIngredient1}</h5>
<p>${meal.strInstructions}</p>
`;
}

loadMeal("fish");
