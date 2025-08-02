import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{a as c,S as T,P as D,N as O,A as U}from"./assets/vendor-D-mUFdd8.js";const N=document.querySelector(".mobile-menu"),_=document.querySelector(".burger-menu"),B=document.querySelector("#mobile-close"),v=document.getElementById("switch");_.addEventListener("click",e=>{e.preventDefault(),N.style.display="flex"});B.addEventListener("click",e=>{e.preventDefault(),N.style.display="none"});v.addEventListener("change",()=>{v.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),v.checked=!0)});const b={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{EVENTS:"/events"}};c.defaults.baseURL=b.BASE_URL;const x=(e,t="")=>{console.error(`[${t}] Hata: `,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},q={async getEvents(){try{return(await c.get(`${b.BASE_URL}${b.ENDPOINTS.EVENTS}`)).data}catch(e){return x(e,"getEvents")}}},L=document.querySelector(".swiper-wrapper"),M={createSliderCard(e){const{cook:t,topic:a}=e,n=document.createElement("div");n.className="swiper-slide";const r=document.createElement("div");r.className="slider-card";const i=document.createElement("div");i.className="cooker-card",i.style.backgroundImage=`url(${t.imgWebpUrl})`;const o=document.createElement("div");o.className="main-card";const p=document.createElement("div");p.className="card-preview",p.style.backgroundImage=`url(${a.previewWebpUrl})`;const d=document.createElement("p");d.className="card-title",d.textContent=a.name;const u=document.createElement("p");u.className="card-nation",u.textContent=a.area;const s=document.createElement("div");return s.className="card",s.style.backgroundImage=`url(${a.imgWebpUrl})`,o.appendChild(p),o.appendChild(d),o.appendChild(u),r.appendChild(i),r.appendChild(o),r.appendChild(s),n.appendChild(r),n}};function H(e){L.innerHTML="";const t=document.createDocumentFragment();e.forEach(a=>{const n=M.createSliderCard(a);t.appendChild(n)}),L.appendChild(t)}const G={swiperInstance:null,async init(){try{document.querySelector(".section-hero")&&await this.initHeroSlider()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu: ",e)}},async initHeroSlider(){const e=await q.getEvents();e&&(H(e),this.swiperInstance&&this.swiperInstance.destroy(!0,!0),this.swiperInstance=new T(".swiper",{modules:[D,O,U],allowSlideNext:!0,pagination:{el:".slider-pagination",clickable:!0},autoplay:{delay:3500},loop:!0,spaceBetween:16}))},setupEventListeners(){window.addEventListener("resize",()=>{this.swiperInstance&&this.swiperInstance.update()})}};document.addEventListener("DOMContentLoaded",()=>G.init());const C={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{CATEGORIES:"/categories"}},F=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},V={async getAllCategories(){try{return(await c.get(`${C.BASE_URL}${C.ENDPOINTS.CATEGORIES}`)).data}catch(e){return F(e,"getAllCategories")}}},E={renderCategories(e){const t=document.querySelector(".categories-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.className="category-list-item";const r=document.createElement("button");r.className="category-btn",r.textContent=a.name,r.dataset.id=a._id,n.appendChild(r),t.appendChild(n)}))},clickCategories(){document.querySelectorAll(".category-btn").forEach(t=>{t.addEventListener("click",a=>{document.querySelectorAll(".category-btn").forEach(r=>r.classList.remove("active")),a.target.classList.add("active"),alert(a.target.dataset.id)})})},clearCategories(){document.querySelector(".all-categories-btn").addEventListener("click",t=>{t.preventDefault(),console.log("burada yemekler tekrar yüklenecek ve active classı silinecek")})}},W={async init(){try{const e=await V.getAllCategories();e&&(E.renderCategories(e),E.clickCategories(),E.clearCategories())}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>W.init());const A={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},j=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},J={async getPopularRecipes(){try{return(await c.get(`${A.BASE_URL}${A.ENDPOINTS.POPULAR}`)).data}catch(e){return j(e,"getPopularRecipes")}}},z={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{var r;const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.dataset.popup="popup-food",n.dataset.recipe_name=a.title,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${(r=a.description)==null?void 0:r.slice(0,90)}...</p>

        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const r=n.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},K={async init(){try{const e=await J.getPopularRecipes();e&&z.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>K.init());const l={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes",POPULAR:"/recipes/popular",CATEGORIES:"/categories",INGREDIENTS:"/ingredients",AREAS:"/areas"}};c.defaults.baseURL=l.BASE_URL;const h=(e,t="")=>{console.error(`[${t}] Hata:, error`);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},S={async getAllTimes(){try{return(await c.get(`${l.BASE_URL}${l.ENDPOINTS.RECIPES}`)).data.results}catch(e){return h(e,"getAllAreas")}},async getAllAreas(){try{return(await c.get(`${l.BASE_URL}${l.ENDPOINTS.AREAS}`)).data}catch(e){return h(e,"getAllAreas")}},async getAllIngredients(){try{return(await c.get(`${l.BASE_URL}${l.ENDPOINTS.INGREDIENTS}`)).data}catch(e){return h(e,"getAllIndredients")}},async searchRecipes(e,t){try{const[a,n,r]=t,i={title:e,time:a||""};n&&n.length>0&&(i.area_ids=n.join(",")),r&&r.length>0&&(i.ingredient_ids=r.join(","));const o=await c.get(l.ENDPOINTS.RECIPES,{params:i});return console.log("API Response:",o.data.results),o.data.results}catch(a){return h(a,"searchRecipes")}}},y={createTime(e){document.querySelector("#search-time")},createAreas(e){const t=document.querySelector("#search-area");e.forEach(a=>{const n=document.createElement("option");n.value=a._id,n.textContent=a.name,t.appendChild(n)})},createIngedients(e){const t=document.querySelector("#search-ingredients");e.forEach(a=>{const n=document.createElement("option");n.value=a._id,n.textContent=a.name,t.appendChild(n)})},listenSearchForm(){const e=document.querySelector("#search-input-text"),t=document.querySelectorAll("select");let a;e.addEventListener("input",function(){clearTimeout(a),a=setTimeout(function(){n()},300)}),t.forEach(r=>{r.addEventListener("change",function(){n()})});function n(){const r=e.value,i=Array.from(t).map(o=>o.multiple?Array.from(o.selectedOptions).map(p=>p.value):o.value);S.searchRecipes(r,i)}}},Q={async init(){try{const e=await S.getAllAreas(),t=await S.getAllIngredients();await y.createTime(),await y.createAreas(e),await y.createIngedients(t),await y.listenSearchForm()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>Q.init());const k={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes"}};c.defaults.baseURL=k.BASE_URL;const X=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},Y={async getAllRecipes(e=1,t=9){try{return(await c.get(`${k.ENDPOINTS.RECIPES}?page=${e}&limit=${t}`)).data}catch(a){return X(a,"getAllRecipes")}}},Z={createFoodsCard(e){var a;const t=document.querySelector(".foodsList");t.innerHTML="";for(const n in e.results){const r=e.results[n],i=document.createElement("li");i.className="foodsList-item";const o=this.Getstars(r.rating);i.innerHTML=`
       
  <img src="${r.thumb}" alt="${r.preview}" class="foodsList-itemImg">
    
   <div class="food-content">
                             <div class="heartDiv">  <i class="fa fa-heart-o fa-2x foodsHeart" aria-hidden="true" data-id = ${r._id}></i></div>
                                 <h3 class="foodContent-title">${r.title}</h3>
                        <p class="foodContent-text"> ${(a=r.description)==null?void 0:a.slice(0,60)}...</p>
                        <div class="raiting-foodContainer">
                            <div class="raiting-food">
                                <span class="raiting-foodPoint">${r.rating}
                                    <span class="raiting-foodStars">
                                         ${o}
                                        </span> </span>
                                <button 
                                class="raiting-foodButton"
                                data-id = ${r._id}
                                data-popup = popup-food
                                >See recipe</button>
                            </div>
                        </div>
                    </div>

      `,t.appendChild(i)}this.renderPagination(e.totalPages,e.page)},Getstars(e){let t="";const a=Math.floor(e),n=5;for(let r=0;r<n;r++)r<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t},renderPagination(e,t){t=Number(t);const a=document.getElementById("paginationContainer"),n=document.getElementById("firstPage"),r=document.getElementById("prevPage"),i=document.getElementById("nextPage"),o=document.getElementById("lastPage");a.innerHTML="",n.classList.toggle("disabled",t===1),r.classList.toggle("disabled",t===1),i.classList.toggle("disabled",t===e),o.classList.toggle("disabled",t===e),n.onclick=s=>{s.preventDefault(),t!==1&&g.init(1)},r.onclick=s=>{s.preventDefault(),t>1&&g.init(t-1)},i.onclick=s=>{s.preventDefault(),t<e&&g.init(t+1)},o.onclick=s=>{s.preventDefault(),t!==e&&g.init(e)};const p=(s,R,w=!1)=>{const m=document.createElement("a");return m.href="#",m.textContent=s,m.className="pagination-btn",w&&m.classList.add("active"),m.addEventListener("click",P=>{P.preventDefault(),g.init(R)}),m};if(t>4){const s=document.createElement("span");s.className="dots",s.textContent="...",a.appendChild(s)}console.log("sayfalnamaya başlamadı"+t);let d=Math.max(1,Number(t)-2),u=Math.min(Number(t)+2);e<=5&&(d=2,u=e-1);for(let s=d;s<u;s++)s>0&&s<=e&&a.appendChild(p(s,s));if(t<e-3){const s=document.createElement("span");s.className="dots",s.textContent="...",a.appendChild(s)}}},g={async init(e=1){try{const t=await Y.getAllRecipes(e);t&&Z.createFoodsCard(t)}catch(t){console.error("Uygulama başlatılırken bir hata oluştu:",t)}}};document.addEventListener("DOMContentLoaded",()=>{g.init(),document.addEventListener("click",function(e){if(e.target.classList.contains("foodsHeart")){const t=e.target.getAttribute("data-id");let a=JSON.parse(localStorage.getItem("favoriteFoods"))||[];console.log(a),a.includes(t)?(a=a.filter(n=>n!==t),e.target.classList.remove("fa-heart"),e.target.classList.add("fa-heart-o")):(a.push(t),e.target.classList.remove("fa-heart-o"),e.target.classList.add("fa-heart")),localStorage.setItem("favoriteFoods",JSON.stringify(a)),console.log(a)}})});const f={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular",RECIPE_DETAIL:"/recipes/"}},I=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},ee={async getFood(){try{return(await c.get(`${f.BASE_URL}${f.ENDPOINTS.POPULAR}`)).data}catch(e){return I(e,"getPopularRecipes")}},async getRecipeDetail(e){try{return(await c.get(`${f.BASE_URL}${f.ENDPOINTS.RECIPE_DETAIL}${e}`)).data}catch(t){return I(t,"getRecipeDetail")}}},$={async openPopup(e,t){const a=document.querySelector(".popup");a.classList.remove("popup-food","popup-raiting","popup-order"),a.classList.add(`${e}`),a.style.display="block",this.resetPopupContent(),e==="popup-food"?await this.fillPopupContent(t):e==="popup-order"&&await this.fillPopupRaiting(t)},resetPopupContent(){const e=document.querySelector(".popup"),t=e.querySelector(".popup-tag-list");t&&(t.innerHTML="");const a=e.querySelector(".popup-instructions");a&&(a.innerHTML="")},closePopup(){document.querySelector(".popup-close").addEventListener("click",t=>{t.preventDefault();const a=document.querySelector(".popup");a.style.display="none",a.className="popup"})},async fillPopupContent(e){try{const t=await ee.getRecipeDetail(e);if(!t)return;const a=document.querySelector(".popup-content");a.innerHTML="";const n=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,r=t.youtube.match(n);let i=r&&r[2].length===11?r[2]:null;i=i?`https://www.youtube.com/embed/${i}`:null,a.innerHTML=`
         <h3 class="popup-title">${t.title}</h3>
            <div class="popup-video">
            
            <iframe src="${i}"
             frameborder="0" allow="accelerometer; autoplay; 
             clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowfullscreen></iframe>
            </div>
            <div class="popup-tags-raiting">
                <ul class="popup-tag-list">
                  
                ${t.tags.length>0?t.tags.map(o=>`<li class='tag-list-item'># ${o}</li>`).join(""):""}
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
                ${t.ingredients.map(o=>`
                        <li class="popup-recipt-item">
                            <b>${o.name}</b>
                            <span>${o.measure}</span>
                        </li>
                        `).join("")}
                
            </ul>
            <div class="popup-desc">
                ${t.instructions}
            </div>

            <div class="popup-buttons">
                <button class="popup-green-btn">Add to Favorite</button>
                <button class="popup-outline-green-btn">Give a raiting</button>
            </div>
      `}catch(t){console.error("Popup içeriği yüklenirken hata:",t)}},async fillPopupRaiting(e){try{const t=document.querySelector(".popup-content");t.innerHTML=`
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
        `}catch{console.log("ata")}},setupPopupListeners(){document.body.addEventListener("click",async e=>{const t=e.target.closest("[data-popup][data-id]");if(!t)return;const a=t.getAttribute("data-id"),n=t.getAttribute("data-popup");await this.openPopup(n,a)})},Getstars(e){let t="";const a=Math.floor(e),n=5;for(let r=0;r<n;r++)r<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t}},te={async init(){try{$.setupPopupListeners(),$.closePopup()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>te.init());
//# sourceMappingURL=index.js.map
