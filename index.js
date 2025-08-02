import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{S as C,P as S,N as $,A,a as l}from"./assets/vendor-D-mUFdd8.js";const b=document.querySelector(".mobile-menu"),I=document.querySelector(".burger-menu"),N=document.querySelector("#mobile-close"),p=document.getElementById("switch");I.addEventListener("click",e=>{e.preventDefault(),b.style.display="flex"});N.addEventListener("click",e=>{e.preventDefault(),b.style.display="none"});p.addEventListener("change",()=>{p.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),p.checked=!0)});const R=document.querySelector(".events");function B(){fetch("https://tasty-treats-backend.p.goit.global/api/events").then(e=>e.json()).then(e=>{T(e),new C(".swiper",{modules:[S,$,A],allowSlideNext:!0,pagination:{el:".slider-pagination",clickable:!0},autoplay:{delay:5e3},loop:!0})}).catch(e=>console.error("Error:",e))}B();function T(e){const t=n=>{const{cook:s,topic:i}=n;return`<div class="swiper-slide">
  <div class="slider-card">
    <div class="cooker-card" style="background-image: url(${s.imgWebpUrl})">
    </div>
    <div class="main-card">
      <div class="card-preview" style="background-image: url(${i.previewWebpUrl})"></div>
      <p class="card-title">
        ${i.name}
      </p>
      <p class="card-nation">
        ${i.area}
      </p>
    </div>
    <div class="card" style="background-image: url(${i.imgWebpUrl})">
    </div>
  </div>
</div>`},a=e.map(t).join("");R.insertAdjacentHTML("beforeend",a)}const y={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{CATEGORIES:"/categories"}},M=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},w={async getAllCategories(){try{return(await l.get(`${y.BASE_URL}${y.ENDPOINTS.CATEGORIES}`)).data}catch(e){return M(e,"getAllCategories")}}},d={renderCategories(e){const t=document.querySelector(".categories-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.className="category-list-item";const s=document.createElement("button");s.className="category-btn",s.textContent=a.name,s.dataset.id=a._id,n.appendChild(s),t.appendChild(n)}))},clickCategories(){document.querySelectorAll(".category-btn").forEach(t=>{t.addEventListener("click",a=>{document.querySelectorAll(".category-btn").forEach(s=>s.classList.remove("active")),a.target.classList.add("active"),alert(a.target.dataset.id)})})},clearCategories(){document.querySelector(".all-categories-btn").addEventListener("click",t=>{t.preventDefault(),console.log("burada yemekler tekrar yüklenecek ve active classı silinecek")})}},x={async init(){try{const e=await w.getAllCategories();e&&(d.renderCategories(e),d.clickCategories(),d.clearCategories())}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>x.init());const f={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},U=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},D={async getPopularRecipes(){try{return(await l.get(`${f.BASE_URL}${f.ENDPOINTS.POPULAR}`)).data}catch(e){return U(e,"getPopularRecipes")}}},P={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{var s;const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.dataset.recipe_name=a.title,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${((s=a.description)==null?void 0:s.slice(0,100))||""}...</p>
        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const s=n.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",s)}))}},O={async init(){try{const e=await D.getPopularRecipes();e&&P.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>O.init());const h={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes"}};l.defaults.baseURL=h.BASE_URL;const _=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},q={async getAllRecipes(e=1,t=9){try{return(await l.get(`${h.ENDPOINTS.RECIPES}?page=${e}&limit=${t}`)).data}catch(a){return _(a,"getAllRecipes")}}},H={createFoodsCard(e){const t=document.querySelector(".foodsList");t.innerHTML="";for(const a in e.results){const n=e.results[a],s=document.createElement("li");s.className="foodsList-item";const i=this.Getstars(n.rating);s.innerHTML=`
  <img src="${n.thumb}" alt="${n.preview}" class="foodsList-itemImg">
   <div class="food-content">
                        
                            <h3 class="foodContent-title">${n.title}</h3>
                        <p class="foodContent-text">${n.description} </p>
                        <div class="raiting-foodContainer">
                            <div class="raiting-food">
                                <span class="raiting-foodPoint">${n.rating}
                                    <span class="raiting-foodStars">
                                         ${i}
                                                                       </span> </span>
                                <button class="raiting-foodButton">See recipe</button>
                            </div>
                        </div>
                    </div>

      `,t.appendChild(s)}this.renderPagination(e.totalPages,e.page)},Getstars(e){let t="";const a=Math.floor(e),n=5;for(let s=0;s<n;s++)s<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t},renderPagination(e,t){t=Number(t);const a=document.getElementById("paginationContainer"),n=document.getElementById("firstPage"),s=document.getElementById("prevPage"),i=document.getElementById("nextPage"),u=document.getElementById("lastPage");a.innerHTML="",n.classList.toggle("disabled",t===1),s.classList.toggle("disabled",t===1),i.classList.toggle("disabled",t===e),u.classList.toggle("disabled",t===e),n.onclick=o=>{o.preventDefault(),t!==1&&c.init(1)},s.onclick=o=>{o.preventDefault(),t>1&&c.init(t-1)},i.onclick=o=>{o.preventDefault(),t<e&&c.init(t+1)},u.onclick=o=>{o.preventDefault(),t!==e&&c.init(e)};const v=(o,k,E=!1)=>{const r=document.createElement("a");return r.href="#",r.textContent=o,r.className="pagination-btn",E&&r.classList.add("active"),r.addEventListener("click",L=>{L.preventDefault(),c.init(k)}),r};if(t>4){const o=document.createElement("span");o.className="dots",o.textContent="...",a.appendChild(o)}console.log("sayfalnamaya başlamadı"+t);let m=Math.max(1,Number(t)-2),g=Math.min(Number(t)+2);e<=5&&(m=2,g=e-1);for(let o=m;o<g;o++)o>0&&o<=e&&a.appendChild(v(o,o));if(t<e-3){const o=document.createElement("span");o.className="dots",o.textContent="...",a.appendChild(o)}}},c={async init(e=1){try{const t=await q.getAllRecipes(e);t&&H.createFoodsCard(t)}catch(t){console.error("Uygulama başlatılırken bir hata oluştu:",t)}}};document.addEventListener("DOMContentLoaded",()=>c.init());
//# sourceMappingURL=index.js.map
