import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{S as E,P as C,N as S,A as $,a as p}from"./assets/vendor-D-mUFdd8.js";const y=document.querySelector(".mobile-menu"),A=document.querySelector(".burger-menu"),I=document.querySelector("#mobile-close"),d=document.getElementById("switch");A.addEventListener("click",e=>{e.preventDefault(),y.style.display="flex"});I.addEventListener("click",e=>{e.preventDefault(),y.style.display="none"});d.addEventListener("change",()=>{d.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),d.checked=!0)});const N=document.querySelector(".events");function M(){fetch("https://tasty-treats-backend.p.goit.global/api/events").then(e=>e.json()).then(e=>{B(e),new E(".swiper",{modules:[C,S,$],allowSlideNext:!0,pagination:{el:".slider-pagination",clickable:!0},autoplay:{delay:5e3},loop:!0})}).catch(e=>console.error("Error:",e))}M();function B(e){const t=n=>{const{cook:s,topic:o}=n;return`<div class="swiper-slide">
  <div class="slider-card">
    <div class="cooker-card" style="background-image: url(${s.imgWebpUrl})">
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
</div>`},a=e.map(t).join("");N.insertAdjacentHTML("beforeend",a)}const v={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{CATEGORIES:"/categories"}},T=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},w={async getAllCategories(){try{return(await p.get(`${v.BASE_URL}${v.ENDPOINTS.CATEGORIES}`)).data}catch(e){return T(e,"getAllCategories")}}},l={renderCategories(e){const t=document.querySelector(".categories-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.className="category-list-item";const s=document.createElement("button");s.className="category-btn",s.textContent=a.name,s.dataset.id=a._id,n.appendChild(s),t.appendChild(n)}))},clickCategories(){document.querySelectorAll(".category-btn").forEach(t=>{t.addEventListener("click",a=>{document.querySelectorAll(".category-btn").forEach(s=>s.classList.remove("active")),a.target.classList.add("active"),alert(a.target.dataset.id)})})},clearCategories(){document.querySelector(".all-categories-btn").addEventListener("click",t=>{t.preventDefault(),console.log("burada yemekler tekrar yüklenecek ve active classı silinecek")})}},x={async init(){try{const e=await w.getAllCategories();e&&(l.renderCategories(e),l.clickCategories(),l.clearCategories())}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>x.init());const R={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t.innerHTML="",e.forEach(a=>{var s;const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${(s=a.description)==null?void 0:s.slice(0,100)}...</p>
        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const s=n.getAttribute("data-recipe_name");console.log("Tıklanan data-recipe_name:",s)})}},D={async init(){try{const e=await ApiService.getPopularRecipes();e&&R.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>D.init());const f={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{RECIPES:"/recipes"}};p.defaults.baseURL=f.BASE_URL;const U=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},q={async getAllRecipes(e=1,t=9){try{return(await p.get(`${f.ENDPOINTS.RECIPES}?page=${e}&limit=${t}`)).data}catch(a){return U(a,"getAllRecipes")}}},O={createFoodsCard(e){const t=document.querySelector(".foodsList");t.innerHTML="";for(const a in e.results){const n=e.results[a],s=document.createElement("li");s.className="foodsList-item";const o=this.Getstars(n.rating);s.innerHTML=`
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

      `,t.appendChild(s)}this.renderPagination(e.totalPages,e.page)},Getstars(e){let t="";const a=Math.floor(e),n=5;for(let s=0;s<n;s++)s<a?t+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':t+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return t},renderPagination(e,t){t=Number(t);const a=document.getElementById("paginationContainer"),n=document.getElementById("firstPage"),s=document.getElementById("prevPage"),o=document.getElementById("nextPage"),m=document.getElementById("lastPage");a.innerHTML="",n.classList.toggle("disabled",t===1),s.classList.toggle("disabled",t===1),o.classList.toggle("disabled",t===e),m.classList.toggle("disabled",t===e),n.onclick=i=>{i.preventDefault(),t!==1&&c.init(1)},s.onclick=i=>{i.preventDefault(),t>1&&c.init(t-1)},o.onclick=i=>{i.preventDefault(),t<e&&c.init(t+1)},m.onclick=i=>{i.preventDefault(),t!==e&&c.init(e)};const b=(i,h,k=!1)=>{const r=document.createElement("a");return r.href="#",r.textContent=i,r.className="pagination-btn",k&&r.classList.add("active"),r.addEventListener("click",L=>{L.preventDefault(),c.init(h)}),r};if(t>4){const i=document.createElement("span");i.className="dots",i.textContent="...",a.appendChild(i)}console.log("sayfalnamaya başlamadı"+t);let u=Math.max(1,Number(t)-2),g=Math.min(Number(t)+2);e<=5&&(u=2,g=e-1);for(let i=u;i<g;i++)i>0&&i<=e&&a.appendChild(b(i,i));if(t<e-3){const i=document.createElement("span");i.className="dots",i.textContent="...",a.appendChild(i)}}},c={async init(e=1){try{const t=await q.getAllRecipes(e);t&&O.createFoodsCard(t)}catch(t){console.error("Uygulama başlatılırken bir hata oluştu:",t)}}};document.addEventListener("DOMContentLoaded",()=>c.init());
//# sourceMappingURL=index.js.map
