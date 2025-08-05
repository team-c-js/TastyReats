import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    RECIPES: '/recipes',
  },
};

axios.defaults.baseURL = API_CONFIG.BASE_URL;

const handleError = (error, context = '') => {
  iziToast.error({
    title: 'Hata',
    message: `Bir sorun oluştu (${context}): ${error.message}`,
    position: 'topRight',
    timeout: 4000,
  });
  return null;
};

const ApiService = {
  async getAllFavoriteRecipes(favoriteIds = []) {
    try {
      const recipePromises = favoriteIds.map(id =>
        axios.get(`${API_CONFIG.ENDPOINTS.RECIPES}/${id}`)
      );
      const responses = await Promise.all(recipePromises);
      const recipes = responses.map(response => response.data);
      return recipes;
    } catch (error) {
      return handleError(error, 'getAllFavoriteRecipes');
    }
  },
};

const UIManager = {
  currentState: {
    page: 1,
    category: null,
  },

  allCategories: [],
  categoriesLoaded: false,

  loader: document.getElementById('loader'),

  showLoader() {
    if (this.loader) {
      this.loader.style.display = 'block';
    }
  },

  hideLoader() {
    if (this.loader) {
      this.loader.style.display = 'none';
    }
  },

  createFoodsCard(food) {
    const foodList = document.querySelector('.favorites-food');
    if (!foodList) return;

    foodList.innerHTML = '';

    const paginationWrapper = document.querySelector('.pagination');
    if (paginationWrapper) {
      paginationWrapper.style.display = 'block';
    }

    if (!food.results || food.results.length === 0) {
      if (this.currentState.category) {
        foodList.innerHTML = `<p class="favorites-category-empty">No recipes found in the '${this.currentState.category}' category.</p>`;
      } else {
        this.showFavoritesError();
      }
      if (paginationWrapper) paginationWrapper.style.display = 'none';
      return;
    }

    for (const item of food.results) {
      const li = document.createElement('li');
      li.className = 'foodsList-item';
      li.dataset.id = item._id;

      const starsHTML = this.getStars(item.rating);
      const heartClass = 'fa-heart';

      li.innerHTML = `
        <img src="${item.thumb}" alt="${item.preview}" class="foodsList-itemImg" fetchpriority="high">
        <div class="food-content">
          <div class="heartDiv">
            <i class="fa ${heartClass} fa-2x foodsHeart" aria-hidden="true" data-id="${item._id}"></i>
          </div>
          <div class="food-box-content">
            <h3 class="foodContent-title">${item.title}</h3>
            <p class="foodContent-text">${item.description?.slice(0, 60)}...</p>
            <div class="raiting-foodContainer">
              <div class="raiting-food">
                <span class="raiting-foodPoint">${Math.ceil(item.rating * 10) / 10}
                  <span class="raiting-foodStars">${starsHTML}</span>
                </span>
                <button class="raiting-foodButton" data-id="${item._id}" data-popup="popup-food">See recipe</button>
              </div>
            </div>
          </div>
        </div>
      `;
      foodList.appendChild(li);
    }

    this.renderPagination(food.totalPages, food.page);
  },

  getStars(r) {
    let starsHTML = '';
    const ratingStar = Math.floor(r);
    for (let i = 0; i < 5; i++) {
      starsHTML +=
        i < ratingStar
          ? `<i class="fa fa-star popup-star active" aria-hidden="true"></i>`
          : `<i class="fa fa-star popup-star" aria-hidden="true"></i>`;
    }
    return starsHTML;
  },

  renderPagination(totalPages, currentPage) {
    currentPage = Number(currentPage);
    const paginationContainer = document.getElementById('paginationContainer');
    const paginationWrapper = document.querySelector('.pagination');

    if (!paginationContainer || !paginationWrapper) return;

    if (totalPages <= 1) {
      paginationWrapper.style.display = 'none';
      return;
    }
    paginationWrapper.style.display = 'flex';

    paginationContainer.innerHTML = '';
    const firstPageBtn = document.getElementById('firstPage');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const lastPageBtn = document.getElementById('lastPage');

    firstPageBtn.classList.toggle('disabled', currentPage === 1);
    prevPageBtn.classList.toggle('disabled', currentPage === 1);
    nextPageBtn.classList.toggle('disabled', currentPage === totalPages);
    lastPageBtn.classList.toggle('disabled', currentPage === totalPages);

    firstPageBtn.onclick = e => {
      e.preventDefault();
      if (currentPage !== 1) GetFavoritesApp.init(1);
    };

    prevPageBtn.onclick = e => {
      e.preventDefault();
      if (currentPage > 1) GetFavoritesApp.init(currentPage - 1);
    };

    nextPageBtn.onclick = e => {
      e.preventDefault();
      if (currentPage < totalPages) GetFavoritesApp.init(currentPage + 1);
    };

    lastPageBtn.onclick = e => {
      e.preventDefault();
      if (currentPage !== totalPages) GetFavoritesApp.init(totalPages);
    };

    const createPageLink = number => {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = number;
      a.className = 'pagination-btn';
      if (number === currentPage) a.classList.add('active');

      a.addEventListener('click', e => {
        e.preventDefault();
        GetFavoritesApp.init(number);
      });

      return a;
    };

    if (totalPages > 1) {
        paginationContainer.appendChild(createPageLink(1));
    }

    if (currentPage > 3) {
      paginationContainer.appendChild(document.createTextNode('...'));
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        paginationContainer.appendChild(createPageLink(i));
      }
    }

    if (currentPage < totalPages - 2) {
      paginationContainer.appendChild(document.createTextNode('...'));
    }

    if (totalPages > 1) {
      paginationContainer.appendChild(createPageLink(totalPages));
    }
  },

  showFavoritesError() {
    const errorSection = document.querySelector('.favorites-errors');
    const foodList = document.querySelector('.favorites-food');

    if (errorSection) {
      errorSection.style.display = 'flex';
    }
    const categoryList = document.querySelector('.favorites-list');
    if (categoryList) {
      categoryList.innerHTML = '';
    }
    if (foodList) {
      foodList.innerHTML = '';
    }
  },

  hideFavoritesError() {
    const errorSection = document.querySelector('.favorites-errors');
    if (errorSection) {
      errorSection.style.display = 'none';
    }
  },

  handleEmptyFavorites() {
    const paginationWrapper = document.querySelector('.pagination');
    this.showFavoritesError();

    if (paginationWrapper) paginationWrapper.style.display = 'none';

    this.categoriesLoaded = false;
    this.allCategories = [];
    GetFavoritesApp.allFavoriteRecipeObjects = [];
    this.currentState.category = null;
    this.currentState.page = 1;
  },

  renderCategoryButtons() {
    const categoryList = document.querySelector('.favorites-list');
    if (!categoryList) return;

    categoryList.innerHTML = `<button class="favorites-btn ${
      this.currentState.category === null ? 'active' : ''
    }" data-category="all">All Categories</button>`;

    this.allCategories.forEach(category => {
      const isActive = this.currentState.category === category;
      const button = document.createElement('button');
      button.className = `favorites-btn ${isActive ? 'active' : ''}`;
      button.textContent = category;
      button.dataset.category = category;
      categoryList.appendChild(button);
    });

    this.setupCategoryButtons();
  },

  setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.favorites-btn');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        UIManager.currentState.category =
          e.target.dataset.category === 'all'
            ? null
            : e.target.dataset.category;

        GetFavoritesApp.init(1);
      });
    });
  },

  setupEventDelegation() {
    document.addEventListener('click', e => {
      const target = e.target;

      if (target.classList.contains('foodsHeart')) {
        const foodId = target.dataset.id;
        let favorites = JSON.parse(localStorage.getItem('favoriteFoods')) || [];

        if (favorites.includes(foodId)) {
          const removedRecipe = GetFavoritesApp.allFavoriteRecipeObjects.find(
            r => r._id === foodId
          );
          const removedCategory = removedRecipe ? removedRecipe.category : null;

          favorites = favorites.filter(id => id !== foodId);
          localStorage.setItem('favoriteFoods', JSON.stringify(favorites));

          GetFavoritesApp.allFavoriteRecipeObjects =
            GetFavoritesApp.allFavoriteRecipeObjects.filter(
              r => r._id !== foodId
            );

          if (favorites.length === 0) {
            this.handleEmptyFavorites();
            return;
          }

          if (removedCategory) {
            const isCategoryNowEmpty =
              !GetFavoritesApp.allFavoriteRecipeObjects.some(
                r => r.category === removedCategory
              );

            if (isCategoryNowEmpty) {
              this.allCategories = this.allCategories.filter(
                c => c !== removedCategory
              );
              this.currentState.category = null;
              this.renderCategoryButtons();
              GetFavoritesApp.init(1);
              return;
            }
          }

          GetFavoritesApp.init(this.currentState.page);
        }
      }
    });
  },
};

const GetFavoritesApp = {
  allFavoriteRecipeObjects: [],

  async init(page = 1) {
    try {
      UIManager.showLoader();
      UIManager.currentState.page = page;

      const favoriteIds = JSON.parse(localStorage.getItem('favoriteFoods')) || [];

      if (favoriteIds.length === 0) {
        UIManager.handleEmptyFavorites();
        UIManager.hideLoader();
        return;
      }

      UIManager.hideFavoritesError();

      if (!UIManager.categoriesLoaded || GetFavoritesApp.allFavoriteRecipeObjects.length !== favoriteIds.length) {
        const allFavoriteRecipes = await ApiService.getAllFavoriteRecipes(
          favoriteIds
        );
        if (allFavoriteRecipes) {
          this.allFavoriteRecipeObjects = allFavoriteRecipes;
          const categories = [
            ...new Set(allFavoriteRecipes.map(item => item.category)),
          ].sort();
          UIManager.allCategories = categories;
          UIManager.categoriesLoaded = true;
          UIManager.renderCategoryButtons();
        } else {
            UIManager.handleEmptyFavorites();
            UIManager.hideLoader();
            return;
        }
      }

      const { category } = UIManager.currentState;
      const limit = 9;

      let recipesToDisplay = this.allFavoriteRecipeObjects;

      if (category) {
        recipesToDisplay = this.allFavoriteRecipeObjects.filter(
          food => food.category === category
        );
      }

      const totalPages = Math.ceil(recipesToDisplay.length / limit);
      const currentPage = Math.min(page, totalPages) || 1;
      UIManager.currentState.page = currentPage;

      const startIndex = (currentPage - 1) * limit;
      const paginatedResults = recipesToDisplay.slice(
        startIndex,
        startIndex + limit
      );

      const foodForDisplay = {
        page: currentPage,
        totalPages: totalPages,
        results: paginatedResults,
      };

      UIManager.createFoodsCard(foodForDisplay);

      UIManager.hideLoader();
    } catch (error) {
      iziToast.error({
        title: 'Yükleme Hatası',
        message: error.message,
        position: 'topRight',
        timeout: 4000,
      });
      UIManager.hideLoader();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  GetFavoritesApp.init();
  UIManager.setupEventDelegation();
});