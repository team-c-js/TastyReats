import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{a as p,S as D,P as T,N as q,A as U,i as C}from"./assets/vendor-BPewsEMl.js";const w=document.querySelector(".mobile-menu"),B=document.querySelector(".burger-menu"),_=document.querySelector("#mobile-close"),L=document.getElementById("switch");B.addEventListener("click",e=>{e.preventDefault(),w.style.display="flex"});_.addEventListener("click",e=>{e.preventDefault(),w.style.display="none"});L.addEventListener("change",()=>{L.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),L.checked=!0)});const A={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{EVENTS:"/events"}};p.defaults.baseURL=A.BASE_URL;const x=(e,t="")=>{console.error(`[${t}] Hata: `,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},M={async getEvents(){try{return(await p.get(`${A.BASE_URL}${A.ENDPOINTS.EVENTS}`)).data}catch(e){return x(e,"getEvents")}}},I=document.querySelector(".swiper-wrapper"),H={createSliderCard(e){const{cook:t,topic:a}=e,r=document.createElement("div");r.className="swiper-slide";const n=document.createElement("div");n.className="slider-card";const o=document.createElement("div");o.className="cooker-card",o.style.backgroundImage=`url(${t.imgWebpUrl})`;const s=document.createElement("div");s.className="main-card";const c=document.createElement("div");c.className="card-preview",c.style.backgroundImage=`url(${a.previewWebpUrl})`;const l=document.createElement("p");l.className="card-title",l.textContent=a.name;const f=document.createElement("p");f.className="card-nation",f.textContent=a.area;const y=document.createElement("div");return y.className="card",y.style.backgroundImage=`url(${a.imgWebpUrl})`,s.appendChild(c),s.appendChild(l),s.appendChild(f),n.appendChild(o),n.appendChild(s),n.appendChild(y),r.appendChild(n),r}};function F(e){I.innerHTML="";const t=document.createDocumentFragment();e.forEach(a=>{const r=H.createSliderCard(a);t.appendChild(r)}),I.appendChild(t)}const G={swiperInstance:null,async init(){try{document.querySelector(".section-hero")&&await this.initHeroSlider()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu: ",e)}},async initHeroSlider(){const e=await M.getEvents();e&&(F(e),this.swiperInstance&&this.swiperInstance.destroy(!0,!0),this.swiperInstance=new D(".swiper",{modules:[T,q,U],allowSlideNext:!0,pagination:{el:".slider-pagination",clickable:!0},autoplay:{delay:3500},loop:!0,spaceBetween:16}))},setupEventListeners(){window.addEventListener("resize",()=>{this.swiperInstance&&this.swiperInstance.update()})}};document.addEventListener("DOMContentLoaded",()=>G.init());const R={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{CATEGORIES:"/categories"}},V=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},z={async getAllCategories(){try{return(await p.get(`${R.BASE_URL}${R.ENDPOINTS.CATEGORIES}`)).data}catch(e){return V(e,"getAllCategories")}}},W={renderCategories(e){const t=document.querySelector(".categories-list");t&&(t.innerHTML="",e.forEach(a=>{const r=document.createElement("li");r.className="category-list-item";const n=document.createElement("button");n.className="category-btn",n.textContent=a.name,n.dataset.id=a.name,r.appendChild(n),t.appendChild(r)}))}},J={async init(){try{const e=await z.getAllCategories();e&&W.renderCategories(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>J.init());const $={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},j=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},Y={async getPopularRecipes(){try{return(await p.get(`${$.BASE_URL}${$.ENDPOINTS.POPULAR}`)).data}catch(e){return j(e,"getPopularRecipes")}}},K={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{var n;const r=document.createElement("li");r.classList.add("recipe-list-item"),r.dataset.id=a._id,r.dataset.popup="popup-food",r.dataset.recipe_name=a.title,r.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${(n=a.description)==null?void 0:n.slice(0,90)}...</p>

        </div>
      `,t.appendChild(r)}),t.addEventListener("click",a=>{const r=a.target.closest(".recipe-list-item");if(!r)return;const n=r.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",n)}))}},Q={async init(){try{const e=await Y.getPopularRecipes();e&&K.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>Q.init());const u={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes",POPULAR:"/recipes/popular",CATEGORIES:"/categories",INGREDIENTS:"/ingredients",AREAS:"/areas"}};p.defaults.baseURL=u.BASE_URL;const v=(e,t="")=>{console.error(`[${t}] Hata:, error`);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},k={async getAllTimes(){try{return(await p.get(`${u.BASE_URL}${u.ENDPOINTS.RECIPES}`)).data.results}catch(e){return v(e,"getAllAreas")}},async getAllAreas(){try{return(await p.get(`${u.BASE_URL}${u.ENDPOINTS.AREAS}`)).data}catch(e){return v(e,"getAllAreas")}},async getAllIngredients(){try{return(await p.get(`${u.BASE_URL}${u.ENDPOINTS.INGREDIENTS}`)).data}catch(e){return v(e,"getAllIndredients")}},async searchRecipes(e,t,a){try{const[r,n,o]=t;try{const s={page:1,limit:9};e&&(s.title=e),r&&(s.time=r),n&&(s.area=n),o&&(s.ingredients=o),a&&(s.category=a),console.log(s),p.get(`${u.BASE_URL}${u.ENDPOINTS.RECIPES}`,{params:s}).then(l=>{console.log(l.data)}).catch(l=>{console.error("Hata:",l)})}catch(s){return v(s,"getAllAreas")}}catch(r){return v(r,"searchRecipes")}}},E={createTime(e){document.querySelector("#search-time")},createAreas(e){const t=document.querySelector("#search-area");e.forEach(a=>{const r=document.createElement("option");r.value=a.name,r.textContent=a.name,t.appendChild(r)})},createIngedients(e){const t=document.querySelector("#search-ingredients");e.forEach(a=>{const r=document.createElement("option");r.value=a._id,r.textContent=a.name,t.appendChild(r)})}},X={async init(){try{const e=await k.getAllAreas(),t=await k.getAllIngredients();await E.createTime(),await E.createAreas(e),await E.createIngedients(t)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>X.init());const P={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes"}};p.defaults.baseURL=P.BASE_URL;const Z=(e,t="")=>(C.error({title:"Hata",message:`Bir sorun oluştu (${t}): ${e.message}`,position:"topRight",timeout:4e3}),null),ee={async getAllRecipes(e=null,t=[null,null,null],a=null,r=1){try{const[n,o,s]=t,c={page:r,limit:9};return e&&(c.title=e),n&&(c.time=n),o&&(c.area=o),s&&(c.ingredient=s),a&&(c.category=a),(await p.get(P.ENDPOINTS.RECIPES,{params:c})).data}catch(n){return Z(n,"getAllRecipes")}}},g={currentState:{page:1,inputValue:null,selectedValues:[null,null,null],category:null},createFoodsCard(e){var a;const t=document.querySelector(".foodsList");if(t){if(t.innerHTML="",!e.results||e.results.length===0){C.warning({title:"Sonuç Yok",message:"Aradığınız kriterlere uygun yemek bulunamadı.",position:"topCenter",timeout:4e3}),this.renderPagination(1,1);return}for(const r of e.results){const n=document.createElement("li");n.className="foodsList-item";const o=this.Getstars(r.rating),l=(JSON.parse(localStorage.getItem("favoriteFoods"))||[]).includes(r._id)?"fa-heart":"fa-heart-o";n.innerHTML=`
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
                  <span class="raiting-foodStars">${o}</span>
                </span>
                <button class="raiting-foodButton" data-id="${r._id}" data-popup="popup-food">See recipe</button>
              </div>
            </div>
          </div>
          
        </div>
      `,t.appendChild(n)}this.renderPagination(e.totalPages,e.page)}},Getstars(e){let t="";const a=Math.floor(e);for(let r=0;r<5;r++)t+=r<a?'<i class="fa fa-star popup-star active" aria-hidden="true"></i>':'<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t},renderPagination(e,t){t=Number(t);const a=document.getElementById("paginationContainer"),r=document.getElementById("firstPage"),n=document.getElementById("prevPage"),o=document.getElementById("nextPage"),s=document.getElementById("lastPage");a.innerHTML="",r.classList.toggle("disabled",t===1),n.classList.toggle("disabled",t===1),o.classList.toggle("disabled",t===e),s.classList.toggle("disabled",t===e),r.onclick=i=>{i.preventDefault(),t!==1&&d.init(1)},n.onclick=i=>{i.preventDefault(),t>1&&d.init(t-1)},o.onclick=i=>{i.preventDefault(),t<e&&d.init(t+1)},s.onclick=i=>{i.preventDefault(),t!==e&&d.init(e)};const c=i=>{const h=document.createElement("a");return h.href="#",h.textContent=i,h.className="pagination-btn",i===t&&h.classList.add("active"),h.addEventListener("click",O=>{O.preventDefault(),d.init(i)}),h},l=()=>{const i=document.createElement("span");return i.className="dots",i.textContent="...",i};a.appendChild(c(1)),t>4&&a.appendChild(l());const f=Math.max(2,t-2),y=Math.min(e-1,t+2);for(let i=f;i<=y;i++)a.appendChild(c(i));t<e-3&&a.appendChild(l()),e>1&&a.appendChild(c(e))},listenSearchForm(){const e=document.querySelector("#search-input-text"),t=document.querySelectorAll("select");let a;const r=()=>{this.currentState.inputValue=e.value;const n=document.querySelector(".category-btn.active");this.currentState.category=n?n.dataset.id:null,this.currentState.selectedValues=Array.from(t).map(o=>o.multiple?Array.from(o.selectedOptions).map(s=>s.value):o.value),this.currentState.page=1,d.init()};e.addEventListener("input",()=>{clearTimeout(a),a=setTimeout(r,300)}),t.forEach(n=>{n.addEventListener("change",r)})},clearForm(){const e=document.querySelector(".form-reset");e&&e.addEventListener("click",t=>{t.preventDefault(),document.querySelector("#search-input-text").value="",document.querySelectorAll(".search-form select").forEach(n=>{n.value=""});const a=document.querySelector(".category-btn.active"),r=a?a.dataset.id:null;this.currentState={page:1,inputValue:null,selectedValues:[null,null,null],category:r},d.init()})},setupEventDelegation(){document.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("foodsHeart")){const a=t.dataset.id;let r=JSON.parse(localStorage.getItem("favoriteFoods"))||[];r.includes(a)?(r=r.filter(n=>n!==a),t.classList.replace("fa-heart","fa-heart-o")):(r.push(a),t.classList.replace("fa-heart-o","fa-heart")),localStorage.setItem("favoriteFoods",JSON.stringify(r))}t.classList.contains("category-btn")&&(document.querySelectorAll(".category-btn").forEach(a=>a.classList.remove("active")),t.classList.add("active"),this.currentState.category=t.dataset.id,this.currentState.page=1,d.init()),t.classList.contains("all-categories-btn")&&(document.querySelectorAll(".category-btn").forEach(a=>a.classList.remove("active")),this.currentState.category=null,this.currentState.page=1,d.init())})}},d={async init(e=g.currentState.page){try{g.currentState.page=e;const{inputValue:t,selectedValues:a,category:r}=g.currentState,n=await ee.getAllRecipes(t,a,r,e);n&&g.createFoodsCard(n)}catch(t){C.error({title:"Yükleme Hatası",message:t.message,position:"topRight",timeout:4e3})}}};document.addEventListener("DOMContentLoaded",()=>{d.init(),g.listenSearchForm(),g.clearForm(),g.setupEventDelegation()});const m={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular",RECIPE_DETAIL:"/recipes/",ORDERS:"/orders/add/"}},S=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},b={async getFood(){try{return(await p.get(`${m.BASE_URL}${m.ENDPOINTS.POPULAR}`)).data}catch(e){return S(e,"getPopularRecipes")}},async getRecipeDetail(e){try{return(await p.get(`${m.BASE_URL}${m.ENDPOINTS.RECIPE_DETAIL}${e}`)).data}catch(t){return S(t,"getRecipeDetail")}},async createOrder(e){try{return(await p.post(`${m.BASE_URL}${m.ENDPOINTS.ORDERS}`,e)).data}catch(t){return S(t,"createOrder")}},async submitRating(e){try{return console.log(e.rating),console.log(e.email),(await p.patch(`${m.BASE_URL}/recipes/${e.recipeId}/rating`,{rate:e.rating,email:e.email})).data}catch(t){return S(t,"submitRating")}}},N={currentRecipeId:null,async openPopup(e,t){this.currentRecipeId=t;const a=document.querySelector(".popup");a.classList.remove("popup-food","popup-raiting","popup-order"),a.classList.add(`${e}`),a.style.display="block",this.resetPopupContent(),e==="popup-food"?await this.fillPopupContent(t):e==="popup-order"?(await this.fillPopupOrder(t),this.setupOrderFormListener()):e==="popup-raiting"&&(await this.fillRatingPopup(t),this.setupRatingListener())},resetPopupContent(){const e=document.querySelector(".popup-content");e.innerHTML=""},closePopup(){document.querySelector(".popup-close").addEventListener("click",t=>{const a=document.querySelector(".popup-video");t.preventDefault();const r=document.querySelector(".popup");r.style.display="none",r.className="popup",a.innerHTML=""})},async fillPopupContent(e){try{const t=await b.getRecipeDetail(e);if(!t)return;const a=document.querySelector(".popup-content");a.innerHTML="";const r=new URL(t.youtube).searchParams.get("v");a.innerHTML=`
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
              ${t.tags.length>0?t.tags.map(n=>`<li class='tag-list-item'># ${n}</li>`).join(""):""}
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
            ${t.ingredients.map(n=>`
                <li class="popup-recipt-item">
                    <b>${n.name}</b>
                    <span>${n.measure}</span>
                </li>`).join("")}
        </ul>
        <div class="popup-desc">
            ${t.instructions}
        </div>

        <div class="popup-buttons">
            <button class="popup-green-btn">Add to Favorite</button>
            <button class="popup-outline-green-btn"
              data-id="${e}"
              data-popup="popup-raiting"
            >Give a rating</button>
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
            <input type="email" class="popup-input" id="email" required>
          </div>
          <button type="submit" class="popup-green-btn">Send Rating</button>
        </form>
      `}catch(t){console.error("Rating popup oluşturulurken hata:",t)}},setupRatingListener(){const e=document.querySelectorAll(".raiting-stars .popup-star"),t=document.querySelector(".raiting-counter"),a=document.querySelector(".popup-order-form");let r=0;e.forEach(n=>{n.addEventListener("click",()=>{r=parseInt(n.getAttribute("data-value")),t.textContent=r.toFixed(1),this.updateStars(e,r)}),n.addEventListener("mouseover",()=>{const o=parseInt(n.getAttribute("data-value"));this.updateStars(e,o)}),n.addEventListener("mouseout",()=>{this.updateStars(e,r)})}),a&&a.addEventListener("submit",async n=>{n.preventDefault();const o=a.querySelector("#email").value.trim();if(!o){alert("Lütfen e-posta adresinizi girin");return}if(r===0){alert("Lütfen bir puan seçin");return}try{const s={recipeId:this.currentRecipeId,rating:r,email:o};if(await b.submitRating(s)){alert("Değerlendirmeniz için teşekkür ederiz!");const l=document.querySelector(".popup");l.style.display="none"}}catch(s){console.error("Değerlendirme gönderilirken hata:",s),alert("Değerlendirme gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")}})},updateStars(e,t){e.forEach(a=>{parseInt(a.getAttribute("data-value"))<=t?a.classList.add("active"):a.classList.remove("active")})},setupOrderFormListener(){const e=document.querySelector(".popup-order-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a={name:e.querySelector("#name").value.trim(),phone:e.querySelector("#phone-number").value.trim(),email:e.querySelector("#email").value.trim(),comment:e.querySelector("#comment").value.trim()};if(!a.name||!a.phone||!a.email){alert("Lütfen zorunlu alanları doldurun");return}if(!/^\+380\d{9}$/.test(a.phone)){alert("Lütfen geçerli bir telefon numarası girin (örn. +380730000000)");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)){alert("Lütfen geçerli bir e-posta adresi girin");return}try{if(await b.createOrder(a)){console.log("Sipariş eklendi");const n=document.querySelector(".popup");n.style.display="none"}}catch(r){console.error("Sipariş gönderilirken hata:",r),alert("Sipariş gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")}})},setupPopupListeners(){document.body.addEventListener("click",async e=>{const t=e.target.closest("[data-popup][data-id]");if(!t)return;const a=t.getAttribute("data-id"),r=t.getAttribute("data-popup");await this.openPopup(r,a)})},Getstars(e){let t="";const a=Math.floor(e),r=5;for(let n=0;n<r;n++)n<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t}},te={async init(){try{N.setupPopupListeners(),N.closePopup()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>te.init());
//# sourceMappingURL=index.js.map
