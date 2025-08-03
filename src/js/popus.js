import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    POPULAR: '/recipes/popular',
    RECIPE_DETAIL: '/recipes/',
    ORDERS: '/orders/add/',
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
  },
  
  async createOrder(orderData) {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}`,
        orderData
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'createOrder');
    }
  },
  
  async submitRating(ratingData) {
    try {
      console.log(ratingData.rating);
      console.log(ratingData.email);
      const response = await axios.patch(
        `${API_CONFIG.BASE_URL}/recipes/${ratingData.recipeId}/rating`,
      {
        rate: ratingData.rating,
        email: ratingData.email,
      },
        
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'submitRating');
    }
  }
};

const UIManager = {
  currentRecipeId: null,
  
  async openPopup(popupType, recipeId) {
    this.currentRecipeId = recipeId;
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup-food', 'popup-raiting', 'popup-order');
    popup.classList.add(`${popupType}`);
    popup.style.display = 'block';
    
    this.resetPopupContent();
    
    if(popupType === 'popup-food'){
      await this.fillPopupContent(recipeId);
    }else if(popupType === 'popup-order'){
      await this.fillPopupOrder(recipeId);
      this.setupOrderFormListener();
    }else if(popupType === 'popup-raiting'){
      await this.fillRatingPopup(recipeId);
      this.setupRatingListener();
    }
  },
  
  resetPopupContent() {
    const popup = document.querySelector('.popup-content');
    popup.innerHTML = '';
  },
  
  closePopup() {
    const closeBtn = document.querySelector('.popup-close');
    closeBtn.addEventListener('click', (e) => {
      const video = document.querySelector('.popup-video');
      e.preventDefault();
      const popup = document.querySelector('.popup');
      popup.style.display = 'none';
      popup.className = 'popup';
      video.innerHTML = '';
    });
  },
  
  async fillPopupContent(recipeId) {
    try {
      const recipe = await ApiService.getRecipeDetail(recipeId);
      if (!recipe) return;
        
      const popup = document.querySelector('.popup-content');
      popup.innerHTML = '';
      const videoId = new URL(recipe.youtube).searchParams.get("v");
      popup.innerHTML = `
        <h3 class="popup-title">${recipe.title}</h3>
        <div class="popup-video">
          <iframe 
            width="100%" 
            height="250" 
            src="https://www.youtube.com/embed/${videoId}" 
            title="" 
            frameborder="0" 
            allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
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
            ${recipe.ingredients.map(ing => `
                <li class="popup-recipt-item">
                    <b>${ing.name}</b>
                    <span>${ing.measure}</span>
                </li>`
            ).join('')}
        </ul>
        <div class="popup-desc">
            ${recipe.instructions}
        </div>

        <div class="popup-buttons">
            <button class="popup-green-btn">Add to Favorite</button>
            <button class="popup-outline-green-btn"
              data-id="${recipeId}"
              data-popup="popup-raiting"
            >Give a rating</button>
        </div>
      `;
      
    } catch (error) {
      console.error('Popup içeriği yüklenirken hata:', error);
    } 
  },

  async fillPopupOrder(recipeId) {
    try {
      const popup = document.querySelector('.popup-content');
      popup.innerHTML = `
        <h3 class="popup-title">ORDER NOW</h3>
        <form class="popup-order-form">
          <div class="form-row">
            <label for="name">Name</label>
            <input type="text" class="popup-input" id="name" required>
          </div>
          <div class="form-row">
            <label for="phone-number">Phone number</label>
            <input type="tel" class="popup-input" id="phone-number" required value="+380730000000"
                   placeholder="380730000000">
          </div>
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" class="popup-input" id="email" required>
          </div>
          <div class="form-row">
            <label for="comment">Comment</label>
            <textarea class="popup-input" id="comment"></textarea>
          </div>
          <button type="submit" class="popup-green-btn">Send</button>
        </form>
      `;
    } catch(error) {
      console.error('Order popup oluşturulurken hata:', error);
    }
  },
  
  async fillRatingPopup(recipeId) {
    try {
      const popup = document.querySelector('.popup-content');
      popup.innerHTML = `
        <h3 class="popup-title">Rating</h3>
        <div class="raiting">
            <span class="raiting-counter">0.0</span>
            <div class="raiting-stars">
                <i class="fa fa-star popup-star" data-value="1"></i>
                <i class="fa fa-star popup-star" data-value="2"></i>
                <i class="fa fa-star popup-star" data-value="3"></i>
                <i class="fa fa-star popup-star" data-value="4"></i>
                <i class="fa fa-star popup-star" data-value="5"></i>
            </div>
        </div>
        <form class="popup-order-form">
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" class="popup-input" id="email" required>
          </div>
          <button type="submit" class="popup-green-btn">Send Rating</button>
        </form>
      `;
    } catch(error) {
      console.error('Rating popup oluşturulurken hata:', error);
    }
  },
  
  setupRatingListener() {
    const stars = document.querySelectorAll('.raiting-stars .popup-star');
    const ratingCounter = document.querySelector('.raiting-counter');
    const ratingForm = document.querySelector('.popup-order-form');
    let currentRating = 0;

    // Yıldız tıklama ve hover etkileri
    stars.forEach(star => {
      star.addEventListener('click', () => {
        currentRating = parseInt(star.getAttribute('data-value'));
        ratingCounter.textContent = currentRating.toFixed(1);
        this.updateStars(stars, currentRating);
      });

      star.addEventListener('mouseover', () => {
        const hoverRating = parseInt(star.getAttribute('data-value'));
        this.updateStars(stars, hoverRating);
      });

      star.addEventListener('mouseout', () => {
        this.updateStars(stars, currentRating);
      });
    });

    // Form gönderimi
    if (ratingForm) {
      ratingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = ratingForm.querySelector('#email').value.trim();
        
        
        if (!email) {
          alert('Lütfen e-posta adresinizi girin');
          return;
        }
        
        if (currentRating === 0) {
          alert('Lütfen bir puan seçin');
          return;
        }

        try {
          const ratingData = {
            recipeId: this.currentRecipeId,
            rating: currentRating,
            email: email
          };
          
          const result = await ApiService.submitRating(ratingData);
          if (result) {
            alert('Değerlendirmeniz için teşekkür ederiz!');
            const popup = document.querySelector('.popup');
            popup.style.display = 'none';
          }
        } catch (error) {
          console.error('Değerlendirme gönderilirken hata:', error);
          alert('Değerlendirme gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
      });
    }
  },
  
  updateStars(stars, activeCount) {
    stars.forEach(star => {
      const value = parseInt(star.getAttribute('data-value'));
      if (value <= activeCount) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  },
  
  setupOrderFormListener() {
    const orderForm = document.querySelector('.popup-order-form');
    if (!orderForm) return;

    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = {
        name: orderForm.querySelector('#name').value.trim(),
        phone: orderForm.querySelector('#phone-number').value.trim(),
        email: orderForm.querySelector('#email').value.trim(),
        comment: orderForm.querySelector('#comment').value.trim()
      };
      
      if (!formData.name || !formData.phone || !formData.email) {
        alert('Lütfen zorunlu alanları doldurun');
        return;
      }
      
      if (!/^\+380\d{9}$/.test(formData.phone)) {
        alert('Lütfen geçerli bir telefon numarası girin (örn. +380730000000)');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert('Lütfen geçerli bir e-posta adresi girin');
        return;
      }

      try {
        const result = await ApiService.createOrder(formData);
        if (result) {
          console.log('Sipariş eklendi');
          const popup = document.querySelector('.popup');
          popup.style.display = 'none';
        }
      } catch (error) {
        console.error('Sipariş gönderilirken hata:', error);
        alert('Sipariş gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    });
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