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
  async searchRecipes(inputValue, selectedValues) {
  try {
    const [time, area_ids, ingredient_ids] = selectedValues;

    const params = {
      title: inputValue,
      time: time || "", // Tek değer
    };

    // Alan ID'leri (dizi) - Sadece dolu dizileri ekle
    if (area_ids && area_ids.length > 0) {
      params.area_ids = area_ids.join(','); // ID'leri virgülle ayrılmış stringe çevir
    }

    // Malzeme ID'leri (dizi) - Sadece dolu dizileri ekle
    if (ingredient_ids && ingredient_ids.length > 0) {
      params.ingredient_ids = ingredient_ids.join(',');
    }

    const response = await axios.get(API_CONFIG.ENDPOINTS.RECIPES, { params });
    console.log("API Response:", response.data.results);
    return response.data.results;
    
  } catch(error) {
    return handleError(error, 'searchRecipes');
  }
}
};

// DOM YÖNETİMİ
//HTML SAYFANIZA GELEN VERİYİ İŞLEME
const UIManager = {
    createTime(times){
        const timeSelect = document.querySelector('#search-time');
    },
    createAreas(areas){
        const aresSelect = document.querySelector('#search-area');
        
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area._id;
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
    listenSearchForm(){
       const searchInput = document.querySelector('#search-input-text');
       const searchSelects = document.querySelectorAll('select');
       let timeout;

       searchInput.addEventListener('input', function() {
            clearTimeout(timeout);

            timeout = setTimeout(function() {
                logValues();
            }, 300);
        });

        searchSelects.forEach(select => {
            select.addEventListener('change', function() {
                logValues();
            });
        });

        function logValues() {
            const inputValue = searchInput.value;
            const selectedValues = Array.from(searchSelects).map(select => {
                // Çoklu seçimler için tüm seçili değerleri dizi olarak al
                if (select.multiple) {
                    return Array.from(select.selectedOptions).map(option => option.value);
                } 
                // Tekli seçimler için normal değer
                else {
                    return select.value;
                }
            });
            ApiService.searchRecipes(inputValue,selectedValues);
        }
        
    }
};

//UYGULAMAYI  İŞLEMEK 

const App = { //buradaki App değişkenini kendi bölümüne özel bir isimle değiştir
  async init() {
    try {
        const areas = await ApiService.getAllAreas();
        const ingredients = await ApiService.getAllIngredients();
        await UIManager.createTime();
        await UIManager.createAreas(areas);
        await UIManager.createIngedients(ingredients);
        await UIManager.listenSearchForm();
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