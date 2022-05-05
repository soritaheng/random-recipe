const content = document.querySelector(".content");
const mealName = document.querySelector("h2");
const mealPhoto = document.querySelector("img");
const btn = document.querySelector("button");
const ingredients = document.querySelector(".ingredients");
const measure = document.querySelector(".measure");
const instruction = document.querySelector(".instruction");
const qMark = document.querySelector(".q-mark");

btn.addEventListener("click", () => {
  //put criteria for string query?
  fetch("https://www.themealdb.com/api/json/v1/1/random.php", {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let recipe = data.meals[0];
      mealPhoto.src = recipe.strMealThumb;
      // content.style.opacity = 1;
      mealPhoto.style.opacity = 0;
      mealName.style.opacity = 0;
      ingredients.style.opacity = 0;
      measure.style.opacity = 0;
      instruction.style.opacity = 0;
      qMark.style.opacity = 0;
      mealPhoto.addEventListener("load", () => {
        mealName.innerHTML = "";
        ingredients.innerHTML = instruction.innerHTML = "";
        measure.innerHTML = "";
        mealName.style.opacity = 1;
        mealPhoto.style.opacity = 1;
        mealName.innerHTML = recipe.strMeal;
        for (i = 1; i <= 20; i++) {
          if (recipe[`strIngredient${i}`]) {
            let list = document.createElement("li");
            ingredients.appendChild(list);
            list.innerHTML = recipe[`strIngredient${i}`];
            let quantity = document.createElement("li");
            measure.appendChild(quantity);
            quantity.innerHTML = recipe[`strMeasure${i}`];
            ingredients.style.opacity = 1;
            measure.style.opacity = 1;
          }
        }
        instruction.style.opacity = 1;
        instruction.innerHTML = recipe.strInstructions;
      });
    });
});
