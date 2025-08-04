import{i as f,a as c}from"./vendor-Dj3mOgk7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const g=document.querySelector(".mobile-menu"),h=document.querySelector(".burger-menu"),y=document.querySelector("#mobile-close");h.addEventListener("click",t=>{t.preventDefault(),g.style.display="flex"});y.addEventListener("click",t=>{t.preventDefault(),g.style.display="none"});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelectorAll(".input-switcher"),e=localStorage.getItem("theme");if(e){const r=e==="dark";r?document.body.classList.add("dark-theme"):document.body.classList.remove("dark-theme"),t.forEach(a=>{a.checked=r})}t.forEach(r=>{r.addEventListener("change",()=>{const a=r.checked;a?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light")),t.forEach(o=>{o.checked=a})})})});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),themeToggle.checked=!0)});const m=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.scrollY>300?m.style.display="block":m.style.display="none"});m.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const n={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular",RECIPE_DETAIL:"/recipes/",ORDERS:"/orders/add/"}},p=(t,e="")=>{console.error(`[${e}] Hata:`,t);const r=document.querySelector(".error-message");return r&&(r.textContent=`Veri yüklenirken hata oluştu: ${t.message}`,r.style.display="block"),null},u={async getFood(){try{return(await c.get(`${n.BASE_URL}${n.ENDPOINTS.POPULAR}`)).data}catch(t){return p(t,"getPopularRecipes")}},async getRecipeDetail(t){try{return(await c.get(`${n.BASE_URL}${n.ENDPOINTS.RECIPE_DETAIL}${t}`)).data}catch(e){return p(e,"getRecipeDetail")}},async createOrder(t){try{return(await c.post(`${n.BASE_URL}${n.ENDPOINTS.ORDERS}`,t)).data}catch(e){return p(e,"createOrder")}},async submitRating(t){try{return console.log(t.rating),console.log(t.email),(await c.patch(`${n.BASE_URL}/recipes/${t.recipeId}/rating`,{rate:t.rating,email:t.email})).data}catch(e){return p(e,"submitRating")}}},d={currentRecipeId:null,async openPopup(t,e){this.currentRecipeId=e;const r=document.querySelector(".popup");r.classList.remove("popup-food","popup-raiting","popup-order"),r.classList.add(`${t}`),r.style.display="block",this.resetPopupContent(),t==="popup-food"?await this.fillPopupContent(e):t==="popup-order"?(await this.fillPopupOrder(e),this.setupOrderFormListener()):t==="popup-raiting"&&(await this.fillRatingPopup(e),this.setupRatingListener())},resetPopupContent(){const t=document.querySelector(".popup-content");t.innerHTML=""},closePopup(){const t=document.querySelector(".popup-close"),e=document.querySelector(".popup");function r(){const a=document.querySelector(".popup-video");e.style.display="none",e.className="popup",a.innerHTML=""}t.addEventListener("click",a=>{a.preventDefault(),r()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&r()})},async fillPopupContent(t){try{const e=await u.getRecipeDetail(t);if(!e)return;const r=document.querySelector(".popup-content");r.innerHTML="";const a=new URL(e.youtube).searchParams.get("v"),s=(JSON.parse(localStorage.getItem("favoriteFoods"))||[]).includes(t),i=s?"Remove To Favorite":"Add to Favorite";r.innerHTML=`
        <h3 class="popup-title">${e.title}</h3>
        <div class="popup-video">
          <iframe 
            width="100%" 
            height="250" 
            src="https://www.youtube.com/embed/${a}" 
            title="" 
            frameborder="0" 
            allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>
        <div class="popup-tags-raiting">
            <ul class="popup-tag-list">
              ${e.tags.length>0?e.tags.map(l=>`<li class='tag-list-item'># ${l}</li>`).join(""):""}
            </ul>
            <div class="popup-raiting-food">
                <span class="popup-rainting-counter">
                    ${Math.ceil(e.rating*10)/10}
                </span>
                <div class="popup-starts">
                    ${this.Getstars(e.rating)}
                </div>
                <span class="popup-time">
                    ${e.time} min
                </span>
            </div> 
        </div>

        <ul class="popup-recipt">
            ${e.ingredients.map(l=>`
                <li class="popup-recipt-item">
                    <b>${l.name}</b>
                    <span>${l.measure}</span>
                </li>`).join("")}
        </ul>
        <div class="popup-desc">
            ${e.instructions}
        </div>

        <div class="popup-buttons">
            <button class="popup-green-btn"
            data-favorite="${s?"true":"false"}"
            data-id="${t}"
            id="addtofavotie"
            >${i}</button>
            <button class="popup-outline-green-btn"
              data-id="${t}"
              data-popup="popup-raiting">
              Give a rating
            </button>
        </div>
      `}catch(e){console.error("Popup içeriği yüklenirken hata:",e)}},async fillPopupOrder(t){try{const e=document.querySelector(".popup-content");e.innerHTML=`
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
            <label for="user-comment">Comment</label>
            <textarea name="user_comment" id="user-comment" class="popup-input" ></textarea>
          </div>
          <button type="submit" class="popup-green-btn">Send</button>
        </form>
      `}catch(e){console.error("Order popup oluşturulurken hata:",e)}},async fillRatingPopup(t){try{const e=document.querySelector(".popup-content");e.innerHTML=`
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
      `}catch(e){console.error("Rating popup oluşturulurken hata:",e)}},setupRatingListener(){const t=document.querySelectorAll(".raiting-stars .popup-star"),e=document.querySelector(".raiting-counter"),r=document.querySelector(".popup-order-form");let a=0;t.forEach(o=>{o.addEventListener("click",()=>{a=parseInt(o.getAttribute("data-value")),e.textContent=a.toFixed(1),this.updateStars(t,a)}),o.addEventListener("mouseover",()=>{const s=parseInt(o.getAttribute("data-value"));this.updateStars(t,s)}),o.addEventListener("mouseout",()=>{this.updateStars(t,a)})}),r&&r.addEventListener("submit",async o=>{o.preventDefault();const s=r.querySelector("#email").value.trim();if(!s){alert("Lütfen e-posta adresinizi girin");return}if(a===0){alert("Lütfen bir puan seçin");return}try{const i={recipeId:this.currentRecipeId,rating:a,email:s};if(await u.submitRating(i)){const v=document.querySelector(".popup");v.style.display="none",f.success({title:"Teşekkürler!",message:"Değerlendirmeniz için teşekkür ederiz!",position:"topRight",timeout:3e3})}}catch{f.success({title:"Hata!",message:"Bazı Şeyler Yanlış Gitti...",position:"topRight",timeout:3e3})}})},updateStars(t,e){t.forEach(r=>{parseInt(r.getAttribute("data-value"))<=e?r.classList.add("active"):r.classList.remove("active")})},setupOrderFormListener(){const t=document.querySelector(".popup-order-form");t&&t.addEventListener("submit",async e=>{e.preventDefault();const r={name:t.querySelector("#name").value.trim(),phone:t.querySelector("#phone-number").value.trim(),email:t.querySelector("#email").value.trim(),comment:t.querySelector("#comment").value.trim()};if(!r.name||!r.phone||!r.email){alert("Lütfen zorunlu alanları doldurun");return}if(!/^\+380\d{9}$/.test(r.phone)){alert("Lütfen geçerli bir telefon numarası girin (örn. +380730000000)");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)){alert("Lütfen geçerli bir e-posta adresi girin");return}try{if(await u.createOrder(r)){console.log("Sipariş eklendi");const o=document.querySelector(".popup");o.style.display="none"}}catch(a){console.error("Sipariş gönderilirken hata:",a),alert("Sipariş gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")}})},setupPopupListeners(){document.body.addEventListener("click",async t=>{const e=t.target.closest("[data-popup][data-id]");if(!e)return;const r=e.getAttribute("data-id"),a=e.getAttribute("data-popup");await this.openPopup(a,r)})},Getstars(t){let e="";const r=Math.floor(t),a=5;for(let o=0;o<a;o++)o<r?e+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':e+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return e},addFavoriteBtn(){document.addEventListener("click",t=>{const e=t.target.closest("#addtofavotie");if(!e)return;const r=e.dataset.id;if(e.dataset.favorite==="true"){let o=JSON.parse(localStorage.getItem("favoriteFoods"))||[];o=o.filter(i=>i!==r),localStorage.setItem("favoriteFoods",JSON.stringify(o));const s=document.querySelector(`.foodsList-item [data-id="${r}"]`);console.log(s),s&&(s.classList.remove("fa-heart"),s.classList.add("fa-heart-o"),e.textContent="Add to Favorite"),e.dataset.favorite="false"}else{let o=JSON.parse(localStorage.getItem("favoriteFoods"))||[];o.includes(r)||(o.push(r),localStorage.setItem("favoriteFoods",JSON.stringify(o)));const s=document.querySelector(`.foodsList-item [data-id="${r}"]`);console.log(s),s&&(s.classList.remove("fa-heart-o"),s.classList.add("fa-heart"),e.textContent="Remove To Favorite"),e.dataset.favorite="true"}})}},b={async init(){try{d.setupPopupListeners(),d.closePopup(),d.addFavoriteBtn()}catch(t){console.error("Uygulama başlatılırken bir hata oluştu:",t)}}};document.addEventListener("DOMContentLoaded",()=>b.init());
//# sourceMappingURL=popus-BfWnl-8i.js.map
