const toggleBtn = document.querySelector('.toggle-box');
const display = document.querySelector('.display');
const mathBtns = document.querySelectorAll('.math');
const delBtn = document.querySelector('.del');
const resetBtn = document.querySelector('.reset');
const calcBtn = document.querySelector('.equal');

let currentTheme = 1;

const changeTheme = () => {
    currentTheme++;
    if (currentTheme > 3) {
        currentTheme = 1;
    }
    if (currentTheme === 1) document.body.className = 'first-theme'
    if (currentTheme === 2) document.body.className = 'second-theme'
    if (currentTheme === 3) document.body.className = 'third-theme';
};

mathBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent === 'x') {
            display.textContent += '*';
        } else {
            display.textContent += btn.textContent;
        }
    });
});

const deleteLastNumber = () => {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
};

const reset = () => {
    display.textContent = '';
};

const calculate = () => {
    display.textContent = eval(display.textContent);
};

toggleBtn.addEventListener('click', changeTheme);
delBtn.addEventListener('click', deleteLastNumber);
resetBtn.addEventListener('click', reset);
calcBtn.addEventListener('click', calculate);