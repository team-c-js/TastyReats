import Swiper from 'swiper';
import {
  Pagination,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    EVENTS: '/events',
  },
};

axios.defaults.baseURL = API_CONFIG.BASE_URL;

const handleError = (error,
  context = '') => {
  console.error (`[${context}] Hata: `, error);

  const errorContainer = document.querySelector ('.error-message');
  if (errorContainer) {
    errorContainer.textContent = `Veri yüklenirken hata oluştu: ${error.message}`;
    errorContainer.style.display = 'block';
  }

  return null;
};

const ApiService = {
  async getEvents () {
    try {
      const response = await axios.get (`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENTS}`);
      return response.data;
    } catch (error) {
      return handleError (error, 'getEvents');
    }
  },
};

const sliderWrapper = document.querySelector ('.swiper-wrapper');

const UIManager = {
  createSliderCard (item) {
    const {
      cook,
      topic,
    } = item;

    const slide = document.createElement ('div');
    slide.className = 'swiper-slide';

    const sliderCard = document.createElement ('div');
    sliderCard.className = 'slider-card';

    const cookerCard = document.createElement ('div');
    cookerCard.className = 'cooker-card';
    cookerCard.style.backgroundImage = `url(${cook.imgWebpUrl})`;

    const mainCard = document.createElement ('div');
    mainCard.className = 'main-card';

    const cardPreview = document.createElement ('div');
    cardPreview.className = 'card-preview';
    cardPreview.style.backgroundImage = `url(${topic.previewWebpUrl})`;

    const cardTitle = document.createElement ('p');
    cardTitle.className = 'card-title';
    cardTitle.textContent = topic.name;

    const cardNation = document.createElement ('p');
    cardNation.className = 'card-nation';
    cardNation.textContent = topic.area;

    const card = document.createElement ('div');
    card.className = 'card';
    card.style.backgroundImage = `url(${topic.imgWebpUrl})`;

    mainCard.appendChild (cardPreview);
    mainCard.appendChild (cardTitle);
    mainCard.appendChild (cardNation);

    sliderCard.appendChild (cookerCard);
    sliderCard.appendChild (mainCard);
    sliderCard.appendChild (card);

    slide.appendChild (sliderCard);

    return slide;
  },
};

function markUp (data) {
  sliderWrapper.innerHTML = '';
  const fragment = document.createDocumentFragment ();

  data.forEach (item => {
    const slide = UIManager.createSliderCard (item);
    fragment.appendChild (slide);
  });
  sliderWrapper.appendChild (fragment);
}

const HeroApp = {
  swiperInstance: null,

  async init () {
    try {
      if (document.querySelector ('.section-hero')) {
        await this.initHeroSlider ();
      }
    } catch (error) {
      console.error ('Uygulama başlatılırken bir hata oluştu: ', error);
    }
  },
  async initHeroSlider () {
    const data = await ApiService.getEvents ();
    if (data) {
      markUp (data);

      if (this.swiperInstance) {
        this.swiperInstance.destroy (true, true);
      }

      this.swiperInstance = new Swiper ('.swiper', {
        modules: [Pagination, Navigation, Autoplay],

        allowSlideNext: true,

        pagination: {
          el: '.slider-pagination',
          clickable: true,
        },

        autoplay: {
          delay: 3500,
        },

        loop: true,

        spaceBetween: 16,
      });
    }
  },

  setupEventListeners () {
    window.addEventListener ('resize', () => {
      if (this.swiperInstance) {
        this.swiperInstance.update ();
      }
    });
  },
};

document.addEventListener ('DOMContentLoaded', () => HeroApp.init ());