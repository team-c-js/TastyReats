import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    RECIPES: '/recipes',
  },
};
axios.defaults.baseURL = API_CONFIG.BASE_URL;

const handleError = (error, context = '') => {
  console.error(`[${context}] Hata:`, error);
  const errorContainer = document.querySelector('.error-message');
  if (errorContainer) {
    errorContainer.textContent = `Veri yüklenirken hata oluştu: ${error.message}`;
    errorContainer.style.display = 'block';
  }
  return null;
};

const ApiService = {
  async getAllRecipes(page = 1, limit = 9) {
    try {
      const response = await axios.get(
        `${API_CONFIG.ENDPOINTS.RECIPES}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'getAllRecipes');
    }
  },
};

const UIManager = {
  createFoodsCard(food) {
    const foodsList = document.querySelector(`.foodsList`);
    foodsList.innerHTML = '';

    for (const k in food.results) {
      const item = food.results[k];
      const li = document.createElement('li');
      li.className = 'foodsList-item';
      const StarsHTML = this.Getstars(item.rating);

      li.innerHTML = `
  <img src="${item.thumb}" alt="${item.preview}" class="foodsList-itemImg">
   <div class="food-content">
                        
                            <h3 class="foodContent-title">${item.title}</h3>
                        <p class="foodContent-text"> ${item.description?.slice(0, 60)}...</p>
                        <div class="raiting-foodContainer">
                            <div class="raiting-food">
                                <span class="raiting-foodPoint">${item.rating}
                                    <span class="raiting-foodStars">
                                         ${StarsHTML}
                                                                       </span> </span>
                                <button 
                                class="raiting-foodButton"
                                data-id = ${item._id}
                                data-popup = popup-food
                                >See recipe</button>
                            </div>
                        </div>
                    </div>

      `;
      foodsList.appendChild(li);
    }
    this.renderPagination(food.totalPages, food.page);

  },
  Getstars(r) {
    let starsHtml = ``;
    const raitingStar = Math.floor(r);
    const TotalStars = 5;
    for (let i = 0; i < TotalStars; i++) {
      if (i < raitingStar) {
        starsHtml += `<i class="fa fa-star popup-star active" aria-hidden="true"></i>`;
      } else {
        starsHtml += `<i class="fa fa-star popup-star" aria-hidden="true"></i>`;
      }
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

    const createPageLink = (number, goPage, isActive = false) => {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = number;
      a.className = 'pagination-btn';
      if (isActive) a.classList.add('active');

      a.addEventListener('click', (e) => {
        e.preventDefault();
        GetFoodsApp.init(goPage);

      });

      return a;
    };

  

    if (currentPage > 4) {
        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.textContent = '...';
        paginationContainer.appendChild(dots);
    }

    console.log("sayfalnamaya başlamadı" + currentPage);

    let startPage = Math.max(1, Number(currentPage) - 2);
    let endPage = Math.min(Number(currentPage) + 2);


    if (totalPages <= 5) {
      startPage = 2;
      endPage = totalPages - 1;
    }

    for (let i = startPage; i < endPage; i++) {

      if (i > 0 && i <= totalPages) {

        paginationContainer.appendChild(createPageLink(i, i));
        if (i === 32) {
          i === 1;
        }
      }
    }

    if (currentPage < totalPages - 3) {
        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.textContent = '...';
        paginationContainer.appendChild(dots);
    }


  }
};

const GetFoodsApp = {
  async init(page = 1) {
    try {
      const food = await ApiService.getAllRecipes(page);

      if (food) {
        UIManager.createFoodsCard(food);
      }
    } catch (error) {
      console.error('Uygulama başlatılırken bir hata oluştu:', error);
    }
  },
};
document.addEventListener('DOMContentLoaded', () => GetFoodsApp.init());
