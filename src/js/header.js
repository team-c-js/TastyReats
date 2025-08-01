
const burgerMenu = document.querySelector('.mobile-menu');
const burderBtn     = document.querySelector('.burger-menu');
const closeBtn      = document.querySelector('#mobile-close');
const themeToggle = document.getElementById('switch');
burderBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    burgerMenu.style.display = 'flex';
});
closeBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    burgerMenu.style.display = 'none';
});
   

    // Tema toggle //
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Sayfa yüklendiğinde tema durumunu yükle //
    window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
        }
    });
