const submit = document.querySelector('#submit'),
  search = document.querySelector('#search-input'),
  random = document.querySelector('.random'),
  resultHeading = document.querySelector('.result-heading'),
  mealsEl = document.querySelector('.meals'),
  singleMeal = document.querySelector('.single-meal');

function getMeals(e) {
  e.preventDefault();
  singleMeal.innerHTML = '';
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<p>Your result for search about "${term}" :</p>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>"${term}" is not available. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `
              <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealid="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>
            `
            )
            .join('');
        }
      });
  } else {
    alert('Please fill the field');
  }

  search.value = '';
}

function getMealByID(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      addMealToDom(data.meals[0]);
    });
}

function addMealToDom(meal) {
  let ingredient = [];

  for (let i = 1; ingredient.length <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
    <div class="single-meal-container">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="meal-category">
        <p>${meal.strArea ? `<p>${meal.strArea}</p>` : ''}</p>
        <p>${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}</p>
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredient.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

function getRandomMeal() {
  resultHeading.innerHTML = '';
  mealsEl.innerHTML = '';
  singleMeal.innerHTML = '';

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      addMealToDom(data.meals[0]);
    });
}
submit.addEventListener('submit', getMeals);
mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealByID(mealID);
  }
});

random.addEventListener('click', getRandomMeal);
