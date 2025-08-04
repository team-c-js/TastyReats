import{i as g,a as p}from"./vendor-Dj3mOgk7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const v=document.querySelector(".mobile-menu"),h=document.querySelector(".burger-menu"),b=document.querySelector("#mobile-close"),m=document.getElementById("switch");h.addEventListener("click",t=>{t.preventDefault(),v.style.display="flex"});b.addEventListener("click",t=>{t.preventDefault(),v.style.display="none"});m.addEventListener("change",()=>{m.checked?(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark-theme"),localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark-theme"),m.checked=!0)});const f=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.scrollY>300?f.style.display="block":f.style.display="none"});f.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const n={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular",RECIPE_DETAIL:"/recipes/",ORDERS:"/orders/add/"}},c=(t,e="")=>{console.error(`[${e}] Hata:`,t);const o=document.querySelector(".error-message");return o&&(o.textContent=`Veri yüklenirken hata oluştu: ${t.message}`,o.style.display="block"),null},u={async getFood(){try{return(await p.get(`${n.BASE_URL}${n.ENDPOINTS.POPULAR}`)).data}catch(t){return c(t,"getPopularRecipes")}},async getRecipeDetail(t){try{return(await p.get(`${n.BASE_URL}${n.ENDPOINTS.RECIPE_DETAIL}${t}`)).data}catch(e){return c(e,"getRecipeDetail")}},async createOrder(t){try{return(await p.post(`${n.BASE_URL}${n.ENDPOINTS.ORDERS}`,t)).data}catch(e){return c(e,"createOrder")}},async submitRating(t){try{return console.log(t.rating),console.log(t.email),(await p.patch(`${n.BASE_URL}/recipes/${t.recipeId}/rating`,{rate:t.rating,email:t.email})).data}catch(e){return c(e,"submitRating")}}},d={currentRecipeId:null,async openPopup(t,e){this.currentRecipeId=e;const o=document.querySelector(".popup");o.classList.remove("popup-food","popup-raiting","popup-order"),o.classList.add(`${t}`),o.style.display="block",this.resetPopupContent(),t==="popup-food"?await this.fillPopupContent(e):t==="popup-order"?(await this.fillPopupOrder(e),this.setupOrderFormListener()):t==="popup-raiting"&&(await this.fillRatingPopup(e),this.setupRatingListener())},resetPopupContent(){const t=document.querySelector(".popup-content");t.innerHTML=""},closePopup(){const t=document.querySelector(".popup-close"),e=document.querySelector(".popup-video"),o=document.querySelector(".popup");function s(){o.style.display="none",o.className="popup",e.innerHTML=""}t.addEventListener("click",r=>{r.preventDefault(),s()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&s()})},async fillPopupContent(t){try{const e=await u.getRecipeDetail(t);if(!e)return;const o=document.querySelector(".popup-content");o.innerHTML="";const s=new URL(e.youtube).searchParams.get("v"),a=(JSON.parse(localStorage.getItem("favoriteFoods"))||[]).includes(t),i=a?"Remove To Favorite":"Add to Favorite";o.innerHTML=`
        <h3 class="popup-title">${e.title}</h3>
        <div class="popup-video">
          <iframe 
            width="100%" 
            height="250" 
            src="https://www.youtube.com/embed/${s}" 
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
                    ${e.rating}
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
            data-favorite="${a?"true":"false"}"
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
            <label for="comment">Comment</label>
            <textarea class="popup-input" id="comment"></textarea>
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
      `}catch(e){console.error("Rating popup oluşturulurken hata:",e)}},setupRatingListener(){const t=document.querySelectorAll(".raiting-stars .popup-star"),e=document.querySelector(".raiting-counter"),o=document.querySelector(".popup-order-form");let s=0;t.forEach(r=>{r.addEventListener("click",()=>{s=parseInt(r.getAttribute("data-value")),e.textContent=s.toFixed(1),this.updateStars(t,s)}),r.addEventListener("mouseover",()=>{const a=parseInt(r.getAttribute("data-value"));this.updateStars(t,a)}),r.addEventListener("mouseout",()=>{this.updateStars(t,s)})}),o&&o.addEventListener("submit",async r=>{r.preventDefault();const a=o.querySelector("#email").value.trim();if(!a){alert("Lütfen e-posta adresinizi girin");return}if(s===0){alert("Lütfen bir puan seçin");return}try{const i={recipeId:this.currentRecipeId,rating:s,email:a};if(await u.submitRating(i)){const y=document.querySelector(".popup");y.style.display="none",g.success({title:"Teşekkürler!",message:"Değerlendirmeniz için teşekkür ederiz!",position:"topRight",timeout:3e3})}}catch{g.success({title:"Hata!",message:"Bazı Şeyler Yanlış Gitti...",position:"topRight",timeout:3e3})}})},updateStars(t,e){t.forEach(o=>{parseInt(o.getAttribute("data-value"))<=e?o.classList.add("active"):o.classList.remove("active")})},setupOrderFormListener(){const t=document.querySelector(".popup-order-form");t&&t.addEventListener("submit",async e=>{e.preventDefault();const o={name:t.querySelector("#name").value.trim(),phone:t.querySelector("#phone-number").value.trim(),email:t.querySelector("#email").value.trim(),comment:t.querySelector("#comment").value.trim()};if(!o.name||!o.phone||!o.email){alert("Lütfen zorunlu alanları doldurun");return}if(!/^\+380\d{9}$/.test(o.phone)){alert("Lütfen geçerli bir telefon numarası girin (örn. +380730000000)");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)){alert("Lütfen geçerli bir e-posta adresi girin");return}try{if(await u.createOrder(o)){console.log("Sipariş eklendi");const r=document.querySelector(".popup");r.style.display="none"}}catch(s){console.error("Sipariş gönderilirken hata:",s),alert("Sipariş gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")}})},setupPopupListeners(){document.body.addEventListener("click",async t=>{const e=t.target.closest("[data-popup][data-id]");if(!e)return;const o=e.getAttribute("data-id"),s=e.getAttribute("data-popup");await this.openPopup(s,o)})},Getstars(t){let e="";const o=Math.floor(t),s=5;for(let r=0;r<s;r++)r<o?e+='<i class="fa fa-star popup-star active" aria-hidden="true"></i>':e+='<i class="fa fa-star popup-star" aria-hidden="true"></i>';return e},addFavoriteBtn(){document.addEventListener("click",t=>{const e=t.target.closest("#addtofavotie");if(!e)return;const o=e.dataset.id;if(e.dataset.favorite==="true"){let r=JSON.parse(localStorage.getItem("favoriteFoods"))||[];r=r.filter(i=>i!==o),localStorage.setItem("favoriteFoods",JSON.stringify(r));const a=document.querySelector(`.foodsList-item [data-id="${o}"]`);console.log(a),a&&(a.classList.remove("fa-heart"),a.classList.add("fa-heart-o"),e.textContent="Add to Favorite"),e.dataset.favorite="false"}else{let r=JSON.parse(localStorage.getItem("favoriteFoods"))||[];r.includes(o)||(r.push(o),localStorage.setItem("favoriteFoods",JSON.stringify(r)));const a=document.querySelector(`.foodsList-item [data-id="${o}"]`);console.log(a),a&&(a.classList.remove("fa-heart-o"),a.classList.add("fa-heart"),e.textContent="Remove To Favorite"),e.dataset.favorite="true"}})}},L={async init(){try{d.setupPopupListeners(),d.closePopup(),d.addFavoriteBtn()}catch(t){console.error("Uygulama başlatılırken bir hata oluştu:",t)}}};document.addEventListener("DOMContentLoaded",()=>L.init());
//# sourceMappingURL=popus-DnOOUVpe.js.map
