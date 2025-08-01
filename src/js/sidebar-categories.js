import axios from "axios"; 


const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    CATEGORIES: '/categories'
  }
};

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
  async getAllCategories() {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIES}`);
      return response.data;
    } catch (error) {
      return handleError(error, 'getAllCategories');
    }
  }
};

const UIManager = {
  renderCategories(categories) {
    const container = document.querySelector('.categories-list');
    if (!container) return;

    container.innerHTML = ''; 
    categories.forEach(category => {
      const item = document.createElement('li');
      item.className = 'category-list-item';
      const button = document.createElement('button');
      button.className = 'category-btn';
      button.textContent = category.name;
      button.dataset.id = category._id;
      item.appendChild(button);
      container.appendChild(item);
    });
  },
  clickCategories(){
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e)=> {
       
        const allButtons = document.querySelectorAll('.category-btn');

        allButtons.forEach(btn => btn.classList.remove('active'));
        
        e.target.classList.add('active');
         alert(e.target.dataset.id);
        });
    });
  },
  clearCategories(){
    
    const btn = document.querySelector('.all-categories-btn');

    btn.addEventListener('click', (e)=> {
        e.preventDefault();
        console.log('burada yemekler tekrar yüklenecek ve active classı silinecek');
    });
  }

};


const sidebarCategoriesApp = {
  async init() {
    try {
      const categories = await ApiService.getAllCategories();
      if (categories) {
        UIManager.renderCategories(categories);
        UIManager.clickCategories();
        UIManager.clearCategories();
      }
    } catch (error) {
      console.error('Uygulama başlatılırken bir hata oluştu:', error);
    }
  }
};


document.addEventListener('DOMContentLoaded', () => sidebarCategoriesApp.init());