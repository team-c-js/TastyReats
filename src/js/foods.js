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
  async getAllRecipes(inputValue = null, selectedValues = [null, null, null], category = null, page = 1) {
    try {
      const [time, area, ingredient_ids] = selectedValues;
      const params = { page, limit: 9 };
      if (inputValue) params.title = inputValue;
      if (time) params.time = time;
      if (area) params.area = area;
      if (ingredient_ids) params.ingredient = ingredient_ids;
      if (category) params.category = category;

      const response = await axios.get(API_CONFIG.ENDPOINTS.RECIPES, { params });
      return response.data;
    } catch (error) {
      return handleError(error, 'getAllRecipes');
    }
  },
};

const UIManager = {
  currentState: {
    page: 1,
    inputValue: null,
    selectedValues: [null, null, null],
    category: null,
  },

  createFoodsCard(food) {
    const foodsList = document.querySelector('.foodsList');
    if (!foodsList) return;

    foodsList.innerHTML = '';

    if (!food.results || food.results.length === 0) {
      iziToast.warning({
        title: 'Sonuç Yok',
        message: 'Aradığınız kriterlere uygun yemek bulunamadı.',
        position: 'topCenter',
        timeout: 4000,
      });
      this.renderPagination(1, 1);
      return;
    }

    for (const item of food.results) {
      const li = document.createElement('li');
      li.className = 'foodsList-item';
      const StarsHTML = this.Getstars(item.rating);

      const favorites = JSON.parse(localStorage.getItem('favoriteFoods')) || [];
      const isFavorite = favorites.includes(item._id);
      const heartClass = isFavorite ? 'fa-heart' : 'fa-heart-o';

      li.innerHTML = `
        <img src="${item.thumb}" alt="${item.preview}" class="foodsList-itemImg">
        <div class="food-content">
          <div class="heartDiv">
            <i class="fa ${heartClass} fa-2x foodsHeart" aria-hidden="true" data-id="${item._id}"></i>
          </div>
          <div class="food-box-content">
            <h3 class="foodContent-title">${item.title}</h3>
            <p class="foodContent-text">${item.description?.slice(0, 60)}...</p>
            <div class="raiting-foodContainer">
              <div class="raiting-food">
                <span class="raiting-foodPoint">${item.rating}
                  <span class="raiting-foodStars">${StarsHTML}</span>
                </span>
                <button class="raiting-foodButton" data-id="${item._id}" data-popup="popup-food">See recipe</button>
              </div>
            </div>
          </div>
          
        </div>
      `;
      foodsList.appendChild(li);
    }

    this.renderPagination(food.totalPages, food.page);
  },

  Getstars(r) {
    let starsHtml = '';
    const ratingStar = Math.floor(r);
    for (let i = 0; i < 5; i++) {
      starsHtml += i < ratingStar
        ? `<i class="fa fa-star popup-star active" aria-hidden="true"></i>`
        : `<i class="fa fa-star popup-star" aria-hidden="true"></i>`;
    }
    return starsHtml;
  },

  renderPagination(totalPages, currentPage) {
    currentPage = Number(currentPage);
    const paginationContainer = document.getElementById('paginationContainer');
    const firstPageBtn = document.getElementById('firstPage');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const lastPageBtn = document.getElementById('lastPage');

    paginationContainer.innerHTML = '';

    firstPageBtn.classList.toggle('disabled', currentPage === 1);
    prevPageBtn.classList.toggle('disabled', currentPage === 1);
    nextPageBtn.classList.toggle('disabled', currentPage === totalPages);
    lastPageBtn.classList.toggle('disabled', currentPage === totalPages);

    firstPageBtn.onclick = (e) => {
      e.preventDefault();
      if (currentPage !== 1) GetFoodsApp.init(1);
    };

    prevPageBtn.onclick = (e) => {
      e.preventDefault();
      if (currentPage > 1) GetFoodsApp.init(currentPage - 1);
    };

    nextPageBtn.onclick = (e) => {
      e.preventDefault();
      if (currentPage < totalPages) GetFoodsApp.init(currentPage + 1);
    };

    lastPageBtn.onclick = (e) => {
      e.preventDefault();
      if (currentPage !== totalPages) GetFoodsApp.init(totalPages);
    };

    const createPageLink = (number) => {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = number;
      a.className = 'pagination-btn';
      if (number === currentPage) a.classList.add('active');

      a.addEventListener('click', (e) => {
        e.preventDefault();
        GetFoodsApp.init(number);
      });

      return a;
    };

    const createDots = () => {
      const span = document.createElement('span');
      span.className = 'dots';
      span.textContent = '...';
      return span;
    };

    paginationContainer.appendChild(createPageLink(1));
    if (currentPage > 4) {
      paginationContainer.appendChild(createDots());
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      paginationContainer.appendChild(createPageLink(i));
    }

    if (currentPage < totalPages - 3) {
      paginationContainer.appendChild(createDots());
    }

    if (totalPages > 1) {
      paginationContainer.appendChild(createPageLink(totalPages));
    }
  },

  listenSearchForm() {
    const searchInput = document.querySelector('#search-input-text');
    const searchSelects = document.querySelectorAll('select');
    let timeout;

    const updateStateAndFetch = () => {
      this.currentState.inputValue = searchInput.value;

      const activeBtn = document.querySelector('.category-btn.active');
      this.currentState.category = activeBtn ? activeBtn.dataset.id : null;

      this.currentState.selectedValues = Array.from(searchSelects).map(select =>
        select.multiple
          ? Array.from(select.selectedOptions).map(opt => opt.value)
          : select.value
      );

      this.currentState.page = 1;
      GetFoodsApp.init();
    };

    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateStateAndFetch, 300);
    });

    searchSelects.forEach(select => {
      select.addEventListener('change', updateStateAndFetch);
    });
  },

  clearForm() {
    const clearBtn = document.querySelector('.form-reset');
    if (!clearBtn) return;

    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#search-input-text').value = '';
      document.querySelectorAll('.search-form select').forEach(select => {
        select.value = '';
      });

      const activeCategoryBtn = document.querySelector('.category-btn.active');
      const currentCategory = activeCategoryBtn ? activeCategoryBtn.dataset.id : null;

      this.currentState = {
        page: 1,
        inputValue: null,
        selectedValues: [null, null, null],
        category: currentCategory,
      };

      GetFoodsApp.init();
    });
  },

  setupEventDelegation() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('foodsHeart')) {
        const foodId = target.dataset.id;
        let favorites = JSON.parse(localStorage.getItem('favoriteFoods')) || [];

        if (favorites.includes(foodId)) {
          favorites = favorites.filter(id => id !== foodId);
          target.classList.replace('fa-heart', 'fa-heart-o');
        } else {
          favorites.push(foodId);
          target.classList.replace('fa-heart-o', 'fa-heart');
        }

        localStorage.setItem('favoriteFoods', JSON.stringify(favorites));
      }

      if (target.classList.contains('category-btn')) {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        this.currentState.category = target.dataset.id;
        this.currentState.page = 1;
        GetFoodsApp.init();
      }

      if (target.classList.contains('all-categories-btn')) {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        this.currentState.category = null;
        this.currentState.page = 1;
        GetFoodsApp.init();
      }
    });
  },
};

const GetFoodsApp = {
  async init(page = UIManager.currentState.page) {
    try {
      UIManager.currentState.page = page;
      const { inputValue, selectedValues, category } = UIManager.currentState;
      const food = await ApiService.getAllRecipes(inputValue, selectedValues, category, page);
      if (food) UIManager.createFoodsCard(food);
    } catch (error) {
      iziToast.error({
        title: 'Yükleme Hatası',
        message: error.message,
        position: 'topRight',
        timeout: 4000,
      });
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  GetFoodsApp.init();
  UIManager.listenSearchForm();
  UIManager.clearForm();
  UIManager.setupEventDelegation();
});
