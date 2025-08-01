import Swiper from 'swiper';
import {
  Pagination,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const sliderContainer = document.querySelector ('.events');

function events () {
  fetch (`https://tasty-treats-backend.p.goit.global/api/events`)
    .then (response => response.json ())
    .then (response => {
      markUp (response);
      const swiper = new Swiper ('.swiper', {
        modules: [Pagination, Navigation, Autoplay],
        allowSlideNext: true,
        pagination: {
          el: '.slider-pagination',
          clickable: true,
        },

        autoplay: {
          delay: 50000,
        },

        loop: true,
      });
    }).catch (error => console.error ('Error:', error));
}

events ();

function markUp (data) {
  console.log (data);
  const CardMarkup = data => {
    const {
      cook,
      topic,
    } = data;
    return `<div class="swiper-slide">
  <div class="slider-card">
    <div class="cooker-card" style="background-image: url(${cook.imgWebpUrl})">
    </div>
    <div class="main-card">
      <div class="card-preview" style="background-image: url(${topic.previewWebpUrl})"></div>
      <p class="card-title">
        ${topic.name}
      </p>
      <p class="card-nation">
        ${topic.area}
      </p>
    </div>
    <div class="card" style="background-image: url(${topic.imgWebpUrl})">
    </div>
  </div>
</div>`;
  };
  const newCardMarkup = data.map (CardMarkup).join ('');
  sliderContainer.insertAdjacentHTML ('beforeend', newCardMarkup);
}