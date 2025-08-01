import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{S as d,P as u,N as p,A as m,a as g}from"./assets/vendor-D-mUFdd8.js";const l=document.querySelector(".mobile-menu"),y=document.querySelector(".burger-menu"),v=document.querySelector("#mobile-close"),c=document.getElementById("switch");y.addEventListener("click",e=>{e.preventDefault(),l.style.display="flex"});v.addEventListener("click",e=>{e.preventDefault(),l.style.display="none"});c.addEventListener("change",()=>{c.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),c.checked=!0)});const b=document.querySelector(".events");function k(){fetch("https://tasty-treats-backend.p.goit.global/api/events").then(e=>e.json()).then(e=>{h(e),new d(".swiper",{modules:[u,p,m],allowSlideNext:!0,pagination:{el:".slider-pagination",clickable:!0},autoplay:{delay:5e3},loop:!0})}).catch(e=>console.error("Error:",e))}k();function h(e){const a=r=>{const{cook:o,topic:n}=r;return`<div class="swiper-slide">
  <div class="slider-card">
    <div class="cooker-card" style="background-image: url(${o.imgWebpUrl})">
    </div>
    <div class="main-card">
      <div class="card-preview" style="background-image: url(${n.previewWebpUrl})"></div>
      <p class="card-title">
        ${n.name}
      </p>
      <p class="card-nation">
        ${n.area}
      </p>
    </div>
    <div class="card" style="background-image: url(${n.imgWebpUrl})">
    </div>
  </div>
</div>`},t=e.map(a).join("");b.insertAdjacentHTML("beforeend",t)}const i={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{CATEGORIES:"/categories"}},L=(e,a="")=>{console.error(`[${a}] Hata:`,e);const t=document.querySelector(".error-message");return t&&(t.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,t.style.display="block"),null},E={async getAllCategories(){try{return(await g.get(`${i.BASE_URL}${i.ENDPOINTS.CATEGORIES}`)).data}catch(e){return L(e,"getAllCategories")}}},s={renderCategories(e){const a=document.querySelector(".categories-list");a&&(a.innerHTML="",e.forEach(t=>{const r=document.createElement("li");r.className="category-list-item";const o=document.createElement("button");o.className="category-btn",o.textContent=t.name,o.dataset.id=t._id,r.appendChild(o),a.appendChild(r)}))},clickCategories(){document.querySelectorAll(".category-btn").forEach(a=>{a.addEventListener("click",t=>{document.querySelectorAll(".category-btn").forEach(o=>o.classList.remove("active")),t.target.classList.add("active"),alert(t.target.dataset.id)})})},clearCategories(){document.querySelector(".all-categories-btn").addEventListener("click",a=>{a.preventDefault(),console.log("burada yemekler tekrar yüklenecek ve active classı silinecek")})}},C={async init(){try{const e=await E.getAllCategories();e&&(s.renderCategories(e),s.clickCategories(),s.clearCategories())}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>C.init());const S={displayPopularRecipes(e){const a=document.querySelector(".recipe-list");a.innerHTML="",e.forEach(t=>{var o;const r=document.createElement("li");r.classList.add("recipe-list-item"),r.dataset.id=t._id,r.innerHTML=`
        <img class="recipe-box-img" src="${t.preview}" alt="${t.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${t.title}</h3>
          <p class="recipe-box-text">${(o=t.description)==null?void 0:o.slice(0,100)}...</p>
        </div>
      `,a.appendChild(r)}),a.addEventListener("click",t=>{const r=t.target.closest(".recipe-list-item");if(!r)return;const o=r.getAttribute("data-recipe_name");console.log("Tıklanan data-recipe_name:",o)})}},f={async init(){try{const e=await ApiService.getPopularRecipes();e&&S.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}};document.addEventListener("DOMContentLoaded",()=>f.init());
//# sourceMappingURL=index.js.map
