import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{S as P,P as w,N as T,A as D,a as c}from"./assets/vendor-D-mUFdd8.js";const $=document.querySelector(".mobile-menu"),O=document.querySelector(".burger-menu"),U=document.querySelector("#mobile-close"),f=document.getElementById("switch");O.addEventListener("click",e=>{e.preventDefault(),$.style.display="flex"});U.addEventListener("click",e=>{e.preventDefault(),$.style.display="none"});f.addEventListener("change",()=>{f.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),f.checked=!0)});const x=document.querySelector(".events");function _(){fetch("https://tasty-treats-backend.p.goit.global/api/events").then(e=>e.json()).then(e=>{q(e),new P(".swiper",{modules:[w,T,D],allowSlideNext:!0,pagination:{el:".slider-pagination",clickable:!0},autoplay:{delay:5e3},loop:!0})}).catch(e=>console.error("Error:",e))}_();function q(e){const t=n=>{const{cook:r,topic:o}=n;return`<div class="swiper-slide">
  <div class="slider-card">
    <div class="cooker-card" style="background-image: url(${r.imgWebpUrl})">
    </div>
    <div class="main-card">
      <div class="card-preview" style="background-image: url(${o.previewWebpUrl})"></div>
      <p class="card-title">
        ${o.name}
      </p>
      <p class="card-nation">
        ${o.area}
      </p>
    </div>
    <div class="card" style="background-image: url(${o.imgWebpUrl})">
    </div>
  </div>
</div>`},a=e.map(t).join("");x.insertAdjacentHTML("beforeend",a)}const S={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{CATEGORIES:"/categories"}},B=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},M={async getAllCategories(){try{return(await c.get(`${S.BASE_URL}${S.ENDPOINTS.CATEGORIES}`)).data}catch(e){return B(e,"getAllCategories")}}},h={renderCategories(e){const t=document.querySelector(".categories-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.className="category-list-item";const r=document.createElement("button");r.className="category-btn",r.textContent=a.name,r.dataset.id=a._id,n.appendChild(r),t.appendChild(n)}))},clickCategories(){document.querySelectorAll(".category-btn").forEach(t=>{t.addEventListener("click",a=>{document.querySelectorAll(".category-btn").forEach(r=>r.classList.remove("active")),a.target.classList.add("active"),alert(a.target.dataset.id)})})},clearCategories(){document.querySelector(".all-categories-btn").addEventListener("click",t=>{t.preventDefault(),console.log("burada yemekler tekrar yüklenecek ve active classı silinecek")})}},H={async init(){try{const e=await M.getAllCategories();e&&(h.renderCategories(e),h.clickCategories(),h.clearCategories())}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>H.init());const L={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},G=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},F={async getPopularRecipes(){try{return(await c.get(`${L.BASE_URL}${L.ENDPOINTS.POPULAR}`)).data}catch(e){return G(e,"getPopularRecipes")}}},V={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{var r,o;const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.dataset.popup="popup-food",n.dataset.recipe_name=a.title,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${(r=a.description)==null?void 0:r.slice(0,90)}...</p>

          <p class="recipe-box-text">${((o=a.description)==null?void 0:o.slice(0,100))||""}...</p>
        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const r=n.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},j={async init(){try{const e=await F.getPopularRecipes();e&&V.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>j.init());const l={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes",POPULAR:"/recipes/popular",CATEGORIES:"/categories",INGREDIENTS:"/ingredients",AREAS:"/areas"}};c.defaults.baseURL=l.BASE_URL;const u=(e,t="")=>{console.error(`[${t}] Hata:, error`);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},b={async getAllTimes(){try{return(await c.get(`${l.BASE_URL}${l.ENDPOINTS.RECIPES}`)).data.results}catch(e){return u(e,"getAllAreas")}},async getAllAreas(){try{return(await c.get(`${l.BASE_URL}${l.ENDPOINTS.AREAS}`)).data}catch(e){return u(e,"getAllAreas")}},async getAllIngredients(){try{return(await c.get(`${l.BASE_URL}${l.ENDPOINTS.INGREDIENTS}`)).data}catch(e){return u(e,"getAllIndredients")}},async searchRecipes(e,t){try{const[a,n,r]=t,o={title:e,time:a||""};n&&n.length>0&&(o.area_ids=n.join(",")),r&&r.length>0&&(o.ingredient_ids=r.join(","));const i=await c.get(l.ENDPOINTS.RECIPES,{params:o});return console.log("API Response:",i.data.results),i.data.results}catch(a){return u(a,"searchRecipes")}}},m={createTime(e){document.querySelector("#search-time")},createAreas(e){const t=document.querySelector("#search-area");e.forEach(a=>{const n=document.createElement("option");n.value=a._id,n.textContent=a.name,t.appendChild(n)})},createIngedients(e){const t=document.querySelector("#search-ingredients");e.forEach(a=>{const n=document.createElement("option");n.value=a._id,n.textContent=a.name,t.appendChild(n)})},listenSearchForm(){const e=document.querySelector("#search-input-text"),t=document.querySelectorAll("select");let a;e.addEventListener("input",function(){clearTimeout(a),a=setTimeout(function(){n()},300)}),t.forEach(r=>{r.addEventListener("change",function(){n()})});function n(){const r=e.value,o=Array.from(t).map(i=>i.multiple?Array.from(i.selectedOptions).map(y=>y.value):i.value);b.searchRecipes(r,o)}}},W={async init(){try{const e=await b.getAllAreas(),t=await b.getAllIngredients();await m.createTime(),await m.createAreas(e),await m.createIngedients(t),await m.listenSearchForm()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>W.init());const k={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes"}};c.defaults.baseURL=k.BASE_URL;const z=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},J={async getAllRecipes(e=1,t=9){try{return(await c.get(`${k.ENDPOINTS.RECIPES}?page=${e}&limit=${t}`)).data}catch(a){return z(a,"getAllRecipes")}}},K={createFoodsCard(e){const t=document.querySelector(".foodsList");t.innerHTML="";for(const a in e.results){const n=e.results[a],r=document.createElement("li");r.className="foodsList-item";const o=this.Getstars(n.rating);r.innerHTML=`
  <img src="${n.thumb}" alt="${n.preview}" class="foodsList-itemImg">
   <div class="food-content">
                        
                            <h3 class="foodContent-title">${n.title}</h3>
                        <p class="foodContent-text">${n.description} </p>
                        <div class="raiting-foodContainer">
                            <div class="raiting-food">
                                <span class="raiting-foodPoint">${n.rating}
                                    <span class="raiting-foodStars">
                                         ${o}
                                                                       </span> </span>
                                <button class="raiting-foodButton">See recipe</button>
                            </div>
                        </div>
                    </div>

      `,t.appendChild(r)}this.renderPagination(e.totalPages,e.page)},Getstars(e){let t="";const a=Math.floor(e),n=5;for(let r=0;r<n;r++)r<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t},renderPagination(e,t){t=Number(t);const a=document.getElementById("paginationContainer"),n=document.getElementById("firstPage"),r=document.getElementById("prevPage"),o=document.getElementById("nextPage"),i=document.getElementById("lastPage");a.innerHTML="",n.classList.toggle("disabled",t===1),r.classList.toggle("disabled",t===1),o.classList.toggle("disabled",t===e),i.classList.toggle("disabled",t===e),n.onclick=s=>{s.preventDefault(),t!==1&&d.init(1)},r.onclick=s=>{s.preventDefault(),t>1&&d.init(t-1)},o.onclick=s=>{s.preventDefault(),t<e&&d.init(t+1)},i.onclick=s=>{s.preventDefault(),t!==e&&d.init(e)};const y=(s,I,R=!1)=>{const p=document.createElement("a");return p.href="#",p.textContent=s,p.className="pagination-btn",R&&p.classList.add("active"),p.addEventListener("click",N=>{N.preventDefault(),d.init(I)}),p};if(t>4){const s=document.createElement("span");s.className="dots",s.textContent="...",a.appendChild(s)}console.log("sayfalnamaya başlamadı"+t);let v=Math.max(1,Number(t)-2),E=Math.min(Number(t)+2);e<=5&&(v=2,E=e-1);for(let s=v;s<E;s++)s>0&&s<=e&&a.appendChild(y(s,s));if(t<e-3){const s=document.createElement("span");s.className="dots",s.textContent="...",a.appendChild(s)}}},d={async init(e=1){try{const t=await J.getAllRecipes(e);t&&K.createFoodsCard(t)}catch(t){console.error("Uygulama başlatılırken bir hata oluştu:",t)}}};document.addEventListener("DOMContentLoaded",()=>d.init());const g={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular",RECIPE_DETAIL:"/recipes/"}},A=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},Q={async getFood(){try{return(await c.get(`${g.BASE_URL}${g.ENDPOINTS.POPULAR}`)).data}catch(e){return A(e,"getPopularRecipes")}},async getRecipeDetail(e){try{return(await c.get(`${g.BASE_URL}${g.ENDPOINTS.RECIPE_DETAIL}${e}`)).data}catch(t){return A(t,"getRecipeDetail")}}},C={async openPopup(e,t){const a=document.querySelector(".popup");a.classList.remove("popup-food","popup-raiting","popup-order"),a.classList.add(`${e}`),a.style.display="block",this.resetPopupContent(),e==="popup-food"?await this.fillPopupContent(t):e==="popup-order"&&await this.fillPopupRaiting(t)},resetPopupContent(){const e=document.querySelector(".popup"),t=e.querySelector(".popup-tag-list");t&&(t.innerHTML="");const a=e.querySelector(".popup-instructions");a&&(a.innerHTML="")},closePopup(){document.querySelector(".popup-close").addEventListener("click",t=>{t.preventDefault();const a=document.querySelector(".popup");a.style.display="none",a.className="popup"})},async fillPopupContent(e){try{const t=await Q.getRecipeDetail(e);if(!t)return;const a=document.querySelector(".popup-content");a.innerHTML="";const n=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,r=t.youtube.match(n);let o=r&&r[2].length===11?r[2]:null;o=o?`https://www.youtube.com/embed/${o}`:null,a.innerHTML=`
         <h3 class="popup-title">${t.title}</h3>
            <div class="popup-video">
            
            <iframe src="${o}"
             frameborder="0" allow="accelerometer; autoplay; 
             clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowfullscreen></iframe>
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
        `}catch{console.log("ata")}},setupPopupListeners(){document.body.addEventListener("click",async e=>{const t=e.target.closest("[data-popup][data-id]");if(!t)return;const a=t.getAttribute("data-id"),n=t.getAttribute("data-popup");await this.openPopup(n,a)})},Getstars(e){let t="";const a=Math.floor(e),n=5;for(let r=0;r<n;r++)r<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t}},X={async init(){try{C.setupPopupListeners(),C.closePopup()}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>X.init());
//# sourceMappingURL=index.js.map
