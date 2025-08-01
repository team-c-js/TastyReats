import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    POPULAR: '/recipes/popular',
  },
};

axios.defaults.baseURL = API_CONFIG.BASE_URL;

const PopularRecipesAPI = {
  async getPopularRecipes(params = {}) {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POPULAR}`
    );

    return response.data;
  },
};

const PopularRecipesUI = {
  displayPopularRecipes(recipes) {
    const PopularRecipesList = document.querySelector('.recipe-list');
    PopularRecipesList.innerHTML = '';

    recipes.forEach(recipe => {
      const recipeList = document.createElement('recipeList');
      recipeList.classList.add('recipe-list-item');
      recipeList.setAttribute('data-recipe_name', recipe._id);
      recipeList.id = `recipe_item-${recipe._id}`;

      recipeList.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>${recipe.description?.slice(0, 100)}...</p>
      `;

      PopularRecipesList.appendChild(recipeList);
    });
  },
};

PopularRecipesList.addEventListener('click', event => {
  const onClickList = event.target.closest('.recipe-list-item');
  if (!onClickList) return;

  const recipeListName = onClickList.getAttribute('data-recipe_name');
  console.log('Tıklanan data-recipe_name:', recipeListName);
});
