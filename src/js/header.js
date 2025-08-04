
const burgerMenu = document.querySelector('.mobile-menu');
const burgerBtn     = document.querySelector('.burger-menu');
const closeBtn      = document.querySelector('#mobile-close');
burgerBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    burgerMenu.style.display = 'flex';
});
closeBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    burgerMenu.style.display = 'none';
});
   

   document.addEventListener('DOMContentLoaded', () => {
    const themeSwitches = document.querySelectorAll('.input-switcher');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const isDark = savedTheme === 'dark';
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        themeSwitches.forEach(sw => {
            sw.checked = isDark;
        });
    }

    themeSwitches.forEach(currentSwitch => {
        currentSwitch.addEventListener('change', () => {
            const isChecked = currentSwitch.checked;
            
            if (isChecked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }

            themeSwitches.forEach(otherSwitch => {
                otherSwitch.checked = isChecked;
            });
        });
    });
});
