/* empty css                      */import{a as d,S as q,P as D,N as B,A as U,i as S,d as F}from"./assets/vendor-Dj3mOgk7.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const P=document.querySelector(".mobile-menu"),_=document.querySelector(".burger-menu"),x=document.querySelector("#mobile-close"),A=document.getElementById("switch");_.addEventListener("click",e=>{e.preventDefault(),P.style.display="flex"});x.addEventListener("click",e=>{e.preventDefault(),P.style.display="none"});A.addEventListener("change",()=>{A.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),A.checked=!0)});const C={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{EVENTS:"/events"}};d.defaults.baseURL=C.BASE_URL;const M=(e,t="")=>{console.error(`[${t}] Hata: `,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},H={async getEvents(){try{return(await d.get(`${C.BASE_URL}${C.ENDPOINTS.EVENTS}`)).data}catch(e){return M(e,"getEvents")}}},R=document.querySelector(".swiper-wrapper"),G={createSliderCard(e){const{cook:t,topic:a}=e,r=document.createElement("div");r.className="swiper-slide";const o=document.createElement("div");o.className="slider-card";const n=document.createElement("div");n.className="cooker-card",n.style.backgroundImage=`url(${t.imgWebpUrl})`;const s=document.createElement("div");s.className="main-card";const i=document.createElement("div");i.className="card-preview",i.style.backgroundImage=`url(${a.previewWebpUrl})`;const l=document.createElement("p");l.className="card-title",l.textContent=a.name;const h=document.createElement("p");h.className="card-nation",h.textContent=a.area;const y=document.createElement("div");return y.className="card",y.style.backgroundImage=`url(${a.imgWebpUrl})`,s.appendChild(i),s.appendChild(l),s.appendChild(h),o.appendChild(n),o.appendChild(s),o.appendChild(y),r.appendChild(o),r}};function V(e){R.innerHTML="";const t=document.createDocumentFragment();e.forEach(a=>{const r=G.createSliderCard(a);t.appendChild(r)}),R.appendChild(t)}const z={swiperInstance:null,async init(){try{document.querySelector(".section-hero")&&await this.initHeroSlider()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu: ",e)}},async initHeroSlider(){const e=await H.getEvents();e&&(V(e),this.swiperInstance&&this.swiperInstance.destroy(!0,!0),this.swiperInstance=new q(".swiper",{modules:[D,B,U],allowSlideNext:!0,pagination:{el:".slider-pagination",clickable:!0},autoplay:{delay:3500},loop:!0,spaceBetween:16}))},setupEventListeners(){window.addEventListener("resize",()=>{this.swiperInstance&&this.swiperInstance.update()})}};document.addEventListener("DOMContentLoaded",()=>z.init());const N={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{CATEGORIES:"/categories"}},J=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},W={async getAllCategories(){try{return(await d.get(`${N.BASE_URL}${N.ENDPOINTS.CATEGORIES}`)).data}catch(e){return J(e,"getAllCategories")}}},Y={renderCategories(e){const t=document.querySelector(".categories-list");t&&(t.innerHTML="",e.forEach(a=>{const r=document.createElement("li");r.className="category-list-item";const o=document.createElement("button");o.className="category-btn",o.textContent=a.name,o.dataset.id=a.name,r.appendChild(o),t.appendChild(r)}))}},j={async init(){try{const e=await W.getAllCategories();e&&Y.renderCategories(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>j.init());const w={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},K=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},Q={async getPopularRecipes(){try{return(await d.get(`${w.BASE_URL}${w.ENDPOINTS.POPULAR}`)).data}catch(e){return K(e,"getPopularRecipes")}}},X={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{var o;const r=document.createElement("li");r.classList.add("recipe-list-item"),r.dataset.id=a._id,r.dataset.popup="popup-food",r.dataset.recipe_name=a.title,r.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${(o=a.description)==null?void 0:o.slice(0,90)}...</p>

        </div>
      `,t.appendChild(r)}),t.addEventListener("click",a=>{const r=a.target.closest(".recipe-list-item");if(!r)return;const o=r.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",o)}))}},Z={async init(){try{const e=await Q.getPopularRecipes();e&&X.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>Z.init());const u={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes",POPULAR:"/recipes/popular",CATEGORIES:"/categories",INGREDIENTS:"/ingredients",AREAS:"/areas"}};d.defaults.baseURL=u.BASE_URL;const v=(e,t="")=>{console.error(`[${t}] Hata:, error`);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},k={async getAllTimes(){try{return(await d.get(`${u.BASE_URL}${u.ENDPOINTS.RECIPES}`)).data.results}catch(e){return v(e,"getAllAreas")}},async getAllAreas(){try{return(await d.get(`${u.BASE_URL}${u.ENDPOINTS.AREAS}`)).data}catch(e){return v(e,"getAllAreas")}},async getAllIngredients(){try{return(await d.get(`${u.BASE_URL}${u.ENDPOINTS.INGREDIENTS}`)).data}catch(e){return v(e,"getAllIndredients")}},async searchRecipes(e,t,a){try{const[r,o,n]=t;try{const s={page:1,limit:9};e&&(s.title=e),r&&(s.time=r),o&&(s.area=o),n&&(s.ingredients=n),a&&(s.category=a),console.log(s),d.get(`${u.BASE_URL}${u.ENDPOINTS.RECIPES}`,{params:s}).then(l=>{console.log(l.data)}).catch(l=>{console.error("Hata:",l)})}catch(s){return v(s,"getAllAreas")}}catch(r){return v(r,"searchRecipes")}}},L={createTime(e){document.querySelector("#search-time")},createAreas(e){const t=document.querySelector("#search-area");e.forEach(a=>{const r=document.createElement("option");r.value=a.name,r.textContent=a.name,t.appendChild(r)})},createIngedients(e){const t=document.querySelector("#search-ingredients");e.forEach(a=>{const r=document.createElement("option");r.value=a._id,r.textContent=a.name,t.appendChild(r)})}},ee={async init(){try{const e=await k.getAllAreas(),t=await k.getAllIngredients();await L.createTime(),await L.createAreas(e),await L.createIngedients(t)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>ee.init());function te(){const e=document.getElementById("loader");e&&(e.style.display="block")}function ae(){const e=document.getElementById("loader");e&&(e.style.display="none")}const O={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes"}};d.defaults.baseURL=O.BASE_URL;const re=(e,t="")=>(S.error({title:"Hata",message:`Bir sorun oluştu (${t}): ${e.message}`,position:"topRight",timeout:4e3}),null),oe={async getAllRecipes(e=null,t=[null,null,null],a=null,r=1){try{const[o,n,s]=t,i={page:r,limit:9};return e&&(i.title=e),o&&(i.time=o),n&&(i.area=n),s&&(i.ingredient=s),a&&(i.category=a),(await d.get(O.ENDPOINTS.RECIPES,{params:i})).data}catch(o){return re(o,"getAllRecipes")}}},g={currentState:{page:1,inputValue:null,selectedValues:[null,null,null],category:null},createFoodsCard(e){var a;const t=document.querySelector(".foodsList");if(t){if(t.innerHTML="",!e.results||e.results.length===0){S.warning({title:"Sonuç Yok",message:"Aradığınız kriterlere uygun yemek bulunamadı.",position:"topCenter",timeout:4e3}),this.renderPagination(1,1);return}for(const r of e.results){const o=document.createElement("li");o.className="foodsList-item",o.dataset.id=r._id;const n=this.Getstars(r.rating),l=(JSON.parse(localStorage.getItem("favoriteFoods"))||[]).includes(r._id)?"fa-heart":"fa-heart-o";o.innerHTML=`
        <img src="${r.thumb}" alt="${r.preview}" class="foodsList-itemImg">
        <div class="food-content">
          <div class="heartDiv">
            <i class="fa ${l} fa-2x foodsHeart" aria-hidden="true" data-id="${r._id}"></i>
          </div>
          <div class="food-box-content">
            <h3 class="foodContent-title">${r.title}</h3>
            <p class="foodContent-text">${(a=r.description)==null?void 0:a.slice(0,60)}...</p>
            <div class="raiting-foodContainer">
              <div class="raiting-food">
                <span class="raiting-foodPoint">${r.rating}
                  <span class="raiting-foodStars">${n}</span>
                </span>
                <button class="raiting-foodButton" data-id="${r._id}" data-popup="popup-food">See recipe</button>
              </div>
            </div>
          </div>
        </div>
      `,t.appendChild(o)}this.renderPagination(e.totalPages,e.page)}},Getstars(e){let t="";const a=Math.floor(e);for(let r=0;r<5;r++)t+=r<a?'<i class="fa fa-star popup-star active" aria-hidden="true"></i>':'<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t},renderPagination(e,t){t=Number(t);const a=document.getElementById("paginationContainer"),r=document.getElementById("firstPage"),o=document.getElementById("prevPage"),n=document.getElementById("nextPage"),s=document.getElementById("lastPage");a.innerHTML="",r.classList.toggle("disabled",t===1),o.classList.toggle("disabled",t===1),n.classList.toggle("disabled",t===e),s.classList.toggle("disabled",t===e),r.onclick=c=>{c.preventDefault(),t!==1&&p.init(1)},o.onclick=c=>{c.preventDefault(),t>1&&p.init(t-1)},n.onclick=c=>{c.preventDefault(),t<e&&p.init(t+1)},s.onclick=c=>{c.preventDefault(),t!==e&&p.init(e)};const i=c=>{const f=document.createElement("a");return f.href="#",f.textContent=c,f.className="pagination-btn",c===t&&f.classList.add("active"),f.addEventListener("click",T=>{T.preventDefault(),p.init(c)}),f},l=()=>{const c=document.createElement("span");return c.className="dots",c.textContent="...",c};a.appendChild(i(1)),t>4&&a.appendChild(l());const h=Math.max(2,t-2),y=Math.min(e-1,t+2);for(let c=h;c<=y;c++)a.appendChild(i(c));t<e-3&&a.appendChild(l()),e>1&&a.appendChild(i(e))},listenSearchForm(){const e=document.querySelector("#search-input-text"),t=document.querySelectorAll("select"),a=()=>{this.currentState.inputValue=e.value.trim();const o=document.querySelector(".category-btn.active");this.currentState.category=o?o.dataset.id:null,this.currentState.selectedValues=Array.from(t).map(n=>n.multiple?Array.from(n.selectedOptions).map(s=>s.value):n.value),this.currentState.page=1,p.init()},r=F(a,300);e.addEventListener("input",()=>{r()}),t.forEach(o=>{o.addEventListener("change",a)})},clearForm(){const e=document.querySelector(".form-reset");e&&e.addEventListener("click",t=>{t.preventDefault(),document.querySelector("#search-input-text").value="",document.querySelectorAll(".search-form select").forEach(o=>{o.value=""});const a=document.querySelector(".category-btn.active"),r=a?a.dataset.id:null;this.currentState={page:1,inputValue:null,selectedValues:[null,null,null],category:r},p.init()})},setupEventDelegation(){document.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("foodsHeart")){const a=t.dataset.id;let r=JSON.parse(localStorage.getItem("favoriteFoods"))||[];r.includes(a)?(r=r.filter(o=>o!==a),t.classList.replace("fa-heart","fa-heart-o")):(r.push(a),t.classList.replace("fa-heart-o","fa-heart")),localStorage.setItem("favoriteFoods",JSON.stringify(r))}t.classList.contains("category-btn")&&(document.querySelectorAll(".category-btn").forEach(a=>a.classList.remove("active")),t.classList.add("active"),this.currentState.category=t.dataset.id,this.currentState.page=1,p.init()),t.classList.contains("all-categories-btn")&&(document.querySelectorAll(".category-btn").forEach(a=>a.classList.remove("active")),this.currentState.category=null,this.currentState.page=1,p.init())})}},p={async init(e=g.currentState.page){try{te();const t=document.querySelector(".foodsList");t&&(t.innerHTML=""),g.currentState.page=e;const{inputValue:a,selectedValues:r,category:o}=g.currentState,n=await oe.getAllRecipes(a,r,o,e);n&&g.createFoodsCard(n)}catch(t){S.error({title:"Yükleme Hatası",message:t.message,position:"topRight",timeout:4e3})}finally{ae()}}};document.addEventListener("DOMContentLoaded",()=>{p.init(),g.listenSearchForm(),g.clearForm(),g.setupEventDelegation()});const $=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.scrollY>300?$.style.display="block":$.style.display="none"});$.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const m={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular",RECIPE_DETAIL:"/recipes/",ORDERS:"/orders/add/"}},E=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},b={async getFood(){try{return(await d.get(`${m.BASE_URL}${m.ENDPOINTS.POPULAR}`)).data}catch(e){return E(e,"getPopularRecipes")}},async getRecipeDetail(e){try{return(await d.get(`${m.BASE_URL}${m.ENDPOINTS.RECIPE_DETAIL}${e}`)).data}catch(t){return E(t,"getRecipeDetail")}},async createOrder(e){try{return(await d.post(`${m.BASE_URL}${m.ENDPOINTS.ORDERS}`,e)).data}catch(t){return E(t,"createOrder")}},async submitRating(e){try{return console.log(e.rating),console.log(e.email),(await d.patch(`${m.BASE_URL}/recipes/${e.recipeId}/rating`,{rate:e.rating,email:e.email})).data}catch(t){return E(t,"submitRating")}}},I={currentRecipeId:null,async openPopup(e,t){this.currentRecipeId=t;const a=document.querySelector(".popup");a.classList.remove("popup-food","popup-raiting","popup-order"),a.classList.add(`${e}`),a.style.display="block",this.resetPopupContent(),e==="popup-food"?await this.fillPopupContent(t):e==="popup-order"?(await this.fillPopupOrder(t),this.setupOrderFormListener()):e==="popup-raiting"&&(await this.fillRatingPopup(t),this.setupRatingListener())},resetPopupContent(){const e=document.querySelector(".popup-content");e.innerHTML=""},closePopup(){const e=document.querySelector(".popup-close"),t=document.querySelector(".popup-video"),a=document.querySelector(".popup");function r(){a.style.display="none",a.className="popup",t.innerHTML=""}e.addEventListener("click",o=>{o.preventDefault(),r()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&r()})},async fillPopupContent(e){try{const t=await b.getRecipeDetail(e);if(!t)return;const a=document.querySelector(".popup-content");a.innerHTML="";const r=new URL(t.youtube).searchParams.get("v"),n=(JSON.parse(localStorage.getItem("favoriteFoods"))||[]).includes(e),s=n?"Remove To Favorite":"Add to Favorite";a.innerHTML=`
        <h3 class="popup-title">${t.title}</h3>
        <div class="popup-video">
          <iframe 
            width="100%" 
            height="250" 
            src="https://www.youtube.com/embed/${r}" 
            title="" 
            frameborder="0" 
            allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>
        <div class="popup-tags-raiting">
            <ul class="popup-tag-list">
              ${t.tags.length>0?t.tags.map(i=>`<li class='tag-list-item'># ${i}</li>`).join(""):""}
            </ul>
            <div class="popup-raiting-food">
                <span class="popup-rainting-counter">
                    ${t.rating}
                </span>
                <div class="popup-starts">
                    ${this.Getstars(t.rating)}
                </div>
                <span class="popup-time">
                    ${t.time} min
                </span>
            </div> 
        </div>

        <ul class="popup-recipt">
            ${t.ingredients.map(i=>`
                <li class="popup-recipt-item">
                    <b>${i.name}</b>
                    <span>${i.measure}</span>
                </li>`).join("")}
        </ul>
        <div class="popup-desc">
            ${t.instructions}
        </div>

        <div class="popup-buttons">
            <button class="popup-green-btn"
            data-favorite="${n?"true":"false"}"
            data-id="${e}"
            id="addtofavotie"
            >${s}</button>
            <button class="popup-outline-green-btn"
              data-id="${e}"
              data-popup="popup-raiting">
              Give a rating
            </button>
        </div>
      `}catch(t){console.error("Popup içeriği yüklenirken hata:",t)}},async fillPopupOrder(e){try{const t=document.querySelector(".popup-content");t.innerHTML=`
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
      `}catch(t){console.error("Order popup oluşturulurken hata:",t)}},async fillRatingPopup(e){try{const t=document.querySelector(".popup-content");t.innerHTML=`
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
            <input type="email" class="popup-input" id="email" pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})" required />
          </div>
          <button type="submit" class="popup-green-btn">Send Rating</button>
        </form>
      `}catch(t){console.error("Rating popup oluşturulurken hata:",t)}},setupRatingListener(){const e=document.querySelectorAll(".raiting-stars .popup-star"),t=document.querySelector(".raiting-counter"),a=document.querySelector(".popup-order-form");let r=0;e.forEach(o=>{o.addEventListener("click",()=>{r=parseInt(o.getAttribute("data-value")),t.textContent=r.toFixed(1),this.updateStars(e,r)}),o.addEventListener("mouseover",()=>{const n=parseInt(o.getAttribute("data-value"));this.updateStars(e,n)}),o.addEventListener("mouseout",()=>{this.updateStars(e,r)})}),a&&a.addEventListener("submit",async o=>{o.preventDefault();const n=a.querySelector("#email").value.trim();if(!n){alert("Lütfen e-posta adresinizi girin");return}if(r===0){alert("Lütfen bir puan seçin");return}try{const s={recipeId:this.currentRecipeId,rating:r,email:n};if(await b.submitRating(s)){const l=document.querySelector(".popup");l.style.display="none",S.success({title:"Teşekkürler!",message:"Değerlendirmeniz için teşekkür ederiz!",position:"topRight",timeout:3e3})}}catch{S.success({title:"Hata!",message:"Bazı Şeyler Yanlış Gitti...",position:"topRight",timeout:3e3})}})},updateStars(e,t){e.forEach(a=>{parseInt(a.getAttribute("data-value"))<=t?a.classList.add("active"):a.classList.remove("active")})},setupOrderFormListener(){const e=document.querySelector(".popup-order-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a={name:e.querySelector("#name").value.trim(),phone:e.querySelector("#phone-number").value.trim(),email:e.querySelector("#email").value.trim(),comment:e.querySelector("#comment").value.trim()};if(!a.name||!a.phone||!a.email){alert("Lütfen zorunlu alanları doldurun");return}if(!/^\+380\d{9}$/.test(a.phone)){alert("Lütfen geçerli bir telefon numarası girin (örn. +380730000000)");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)){alert("Lütfen geçerli bir e-posta adresi girin");return}try{if(await b.createOrder(a)){console.log("Sipariş eklendi");const o=document.querySelector(".popup");o.style.display="none"}}catch(r){console.error("Sipariş gönderilirken hata:",r),alert("Sipariş gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")}})},setupPopupListeners(){document.body.addEventListener("click",async e=>{const t=e.target.closest("[data-popup][data-id]");if(!t)return;const a=t.getAttribute("data-id"),r=t.getAttribute("data-popup");await this.openPopup(r,a)})},Getstars(e){let t="";const a=Math.floor(e),r=5;for(let o=0;o<r;o++)o<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t},addFavoriteBtn(){document.addEventListener("click",e=>{const t=e.target.closest("#addtofavotie");if(!t)return;const a=t.dataset.id;if(t.dataset.favorite==="true"){let o=JSON.parse(localStorage.getItem("favoriteFoods"))||[];o=o.filter(s=>s!==a),localStorage.setItem("favoriteFoods",JSON.stringify(o));const n=document.querySelector(`.foodsList-item [data-id="${a}"]`);console.log(n),n&&(n.classList.remove("fa-heart"),n.classList.add("fa-heart-o"),t.textContent="Add to Favorite"),t.dataset.favorite="false"}else{let o=JSON.parse(localStorage.getItem("favoriteFoods"))||[];o.includes(a)||(o.push(a),localStorage.setItem("favoriteFoods",JSON.stringify(o)));const n=document.querySelector(`.foodsList-item [data-id="${a}"]`);console.log(n),n&&(n.classList.remove("fa-heart-o"),n.classList.add("fa-heart"),t.textContent="Remove To Favorite"),t.dataset.favorite="true"}})}},ne={async init(){try{I.setupPopupListeners(),I.closePopup(),I.addFavoriteBtn()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>ne.init());
//# sourceMappingURL=index.js.map
