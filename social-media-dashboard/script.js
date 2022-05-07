const toggleButton = document.querySelector('.switch-theme__box--btn');
const body = document.body;

const changeTheme = () => {
    body.classList.toggle('dark');
};

toggleButton.addEventListener('click', changeTheme);