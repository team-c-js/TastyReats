import axios from "axios"; // AXIOS IMPORT ETME
// 1. API YAPILANDIRMA
/*
  ENDPOINTS İCİNDE SORGU ATMAMIZ GERKEN SAYFALARIN URL KISMINI VERIYORUZ
*/
const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    RECIPES: '/recipes',
    POPULAR: '/recipes/popular',
    CATEGORIES: '/categories',
    INGREDIENTS: '/ingredients',
    AREAS: '/areas'
  }
};

axios.defaults.baseURL = API_CONFIG.BASE_URL; // BASE URL ÇAĞIRMA KISMI

// HATA YÖNETİMİ
const handleError = (error, context = '') => {
  console.error(`[${context}] Hata:, error`);
  const errorContainer = document.querySelector('.error-message');
  //HATAYI BURADA GÖSTERİYORUZ. BOŞSA DA BURADA YAPACAĞIZ.
  if (errorContainer) {
    errorContainer.textContent = `Veri yüklenirken hata oluştu: ${error.message}`;
    errorContainer.style.display = 'block';
  }
  return null;
};

//SORGULAR BURADA OLACAK 
const ApiService = {
  //TÜM TARİFLERİ ÇEKMEK İÇİN BİR ÖRNEK SORGU
  async getAllTimes(){
    try{
        const areas = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECIPES}`);
        return areas.data.results;
    }catch(error){
        return handleError(error, 'getAllAreas');
    }
   
  },
  async getAllAreas(){
    try{
        const areas = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AREAS}`);
        return areas.data;
    }catch(error){
        return handleError(error, 'getAllAreas');
    }
  },
  async getAllIngredients(){
    try{
        const areas = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INGREDIENTS}`);
        return areas.data;
    }catch(error){
        return handleError(error, 'getAllIndredients');
    }
  },
  async searchRecipes(inputValue, selectedValues,category) {
  try {
    
    const [time, area, ingredient_ids] = selectedValues;
    
    try{
        const params  = {
          page : 1,
          limit :9,
        };
        if(inputValue){
          params.title = inputValue;
        }
        if(time){
          params.time = time;
        }
        if(area){
          params.area = area;
        }
        if(ingredient_ids){
          params.ingredients = ingredient_ids;
        }
        if(category){
          params.category = category;
        }

        console.log(params);
        const deneme = axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECIPES}`, 
          {params : params}
        );
        
        deneme.then(response => {
          console.log(response.data); 
        }).catch(error => {
          console.error('Hata:', error);
        });
    }catch(error){
        return handleError(error, 'getAllAreas');
    }
  } catch(error) {
    return handleError(error, 'searchRecipes');
  }
  }
};

const UIManager = {
    createTime(times){
        const timeSelect = document.querySelector('#search-time');
        for (let i = 5; i <= 120; i += 5) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = i;
          timeSelect.appendChild(option);
        }
    },
    createAreas(areas){
        const aresSelect = document.querySelector('#search-area');
        
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area.name;
            option.textContent = area.name;

            aresSelect.appendChild(option);
        });
    },
    createIngedients(ingredients){
        const ingredientsArea = document.querySelector('#search-ingredients');

        ingredients.forEach(ingredient => {
            const option = document.createElement('option');
            option.value = ingredient._id;
            option.textContent = ingredient.name;

            ingredientsArea.appendChild(option);
        });
    },
};


const App = { //buradaki App değişkenini kendi bölümüne özel bir isimle değiştir
  async init() {
    try {
        const areas = await ApiService.getAllAreas();
        const ingredients = await ApiService.getAllIngredients();
        await UIManager.createTime();
        await UIManager.createAreas(areas);
        await UIManager.createIngedients(ingredients);
      // Tüm tarifler sayfası
      /*if (document.querySelector('.recipes-container')) {
        await this.initRecipesPage();
      }*/
    } catch (error) {
      console.error('Uygulama başlatılırken bir hata oluştu:', error);
    }
  }
};

// UYGULAMAYI BAŞLATMA KISMI 
// SAYFA YÜKLENDİĞİNDE 69. SATIRDAKİ KISMI YÜKLÜYORUZ.
document.addEventListener('DOMContentLoaded', () => App.init()); // yukarıdaki değiştirdiğin app değişkenini burada kullan