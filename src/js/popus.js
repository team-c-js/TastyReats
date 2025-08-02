import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    POPULAR: '/recipes/popular',
    RECIPE_DETAIL: '/recipes/' 
  },
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
  async getFood() {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POPULAR}`
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'getPopularRecipes');
    }
  },

  async getRecipeDetail(recipeId) {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECIPE_DETAIL}${recipeId}`
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'getRecipeDetail');
    }
  }
};

const UIManager = {
  async openPopup(popupType, recipeId) {
    
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup-food', 'popup-raiting', 'popup-order');
    popup.classList.add(`${popupType}`);
    popup.style.display = 'block';
    
    // Popup içeriğini sıfırla
    this.resetPopupContent();
    if(popupType === 'popup-food'){
        await this.fillPopupContent(recipeId);
    }else if(popupType === 'popup-order'){
        await this.fillPopupRaiting(recipeId);
    }
  },
  
  resetPopupContent() {
    const popup = document.querySelector('.popup');
    
    const ingredientsList = popup.querySelector('.popup-tag-list');
    if (ingredientsList) ingredientsList.innerHTML = '';
    
    const instructionsList = popup.querySelector('.popup-instructions');
    if (instructionsList) instructionsList.innerHTML = '';
  },
  
  closePopup() {
    const closeBtn = document.querySelector('.popup-close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const popup = document.querySelector('.popup');
      popup.style.display = 'none';
      popup.className = 'popup';
    });
  },

  
  async fillPopupContent(recipeId) {
    try {
      const recipe = await ApiService.getRecipeDetail(recipeId);
      if (!recipe) return;
        
      const popup = document.querySelector('.popup-content');
      popup.innerHTML = '';
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = recipe.youtube.match(regExp);
        
        let  videoId = (match && match[2].length === 11) ? match[2] : null;
        
        // Embed URL oluştur
        videoId =  videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        
      popup.innerHTML = 
      `
         <h3 class="popup-title">${recipe.title}</h3>
            <div class="popup-video">
            
            <iframe src="${videoId}"
             frameborder="0" allow="accelerometer; autoplay; 
             clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowfullscreen></iframe>
            </div>
            <div class="popup-tags-raiting">
                <ul class="popup-tag-list">
                  
                ${recipe.tags.length > 0
                    ? recipe.tags.map(tag => `<li class='tag-list-item'># ${tag}</li>`).join('')
                    : ''}
                </ul>
                <div class="popup-raiting-food">
                    <span class="popup-rainting-counter">
                        ${recipe.rating}
                    </span>
                    <div class="popup-starts">
                        ${this.Getstars(recipe.rating)}
                    </div>
                    <span class="popup-time">
                        ${recipe.time} min
                    </span>
                </div> 
            </div>

            <ul class="popup-recipt">
                ${recipe.ingredients.map(ing =>
                        `
                        <li class="popup-recipt-item">
                            <b>${ing.name}</b>
                            <span>${ing.measure}</span>
                        </li>
                        `
                ).join('')}
                
            </ul>
            <div class="popup-desc">
                ${recipe.instructions}
            </div>

            <div class="popup-buttons">
                <button class="popup-green-btn">Add to Favorite</button>
                <button class="popup-outline-green-btn">Give a raiting</button>
            </div>
      `;
      
      // Malzemeleri doldur
      
    } catch (error) {
      console.error('Popup içeriği yüklenirken hata:', error);
    } 
  },
  async fillPopupRaiting(recipeId){
    try{
        const popup = document.querySelector('.popup-content');
        popup.innerHTML = 
        `
        <h3 class="popup-title">ORDER NOW</h3>
            <form action="" class="popup-order-form">
              <div class="form-row">
                <label for="name">Name</label>
                <input type="text" class="popup-input"  id="name" required>
              </div>
              <div class="form-row">
                <label for="phone-number">Name</label>
                <input type="text" class="popup-input"  id="phone-number" required>
              </div>
              <div class="form-row">
                <label for="email">Name</label>
                <input type="text" class="popup-input"  id="email" required>
              </div>
              <div class="form-row">
                <label for="Comment">Comment</label>
                <textarea name="" id="" class="popup-input"></textarea>
              </div>
              <button class="popup-green-btn">Send</button>
            </form>
        `;
    }catch(error){
        console.log('ata');
    }
  },
  setupPopupListeners() {
    document.body.addEventListener('click', async (event) => {
      const trigger = event.target.closest('[data-popup][data-id]');
      if (!trigger) return;

      const recipeId = trigger.getAttribute('data-id');
      const popupType = trigger.getAttribute('data-popup');
      await this.openPopup(popupType, recipeId);
    });
  },
  
  Getstars(star) {
    let starsHtml = ``;
    const raitingStar = Math.floor(star);
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
};

const PopupApp = {
  async init() {
    try {
      UIManager.setupPopupListeners();
      UIManager.closePopup();
    } catch (error) {
      console.error('Uygulama başlatılırken bir hata oluştu:', error);
    }
  },
};

document.addEventListener('DOMContentLoaded', () => PopupApp.init());