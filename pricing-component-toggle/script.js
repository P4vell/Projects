const toggle = document.querySelector('.header__toggle');
const basicPrice = document.querySelector('.basic-card .card__price');
const professionalPrice = document.querySelector('.professional-card .card__price');
const masterPrice = document.querySelector('.master-card .card__price');
let currentPlan = 0;

const plans = [
    {
        basic: '$199.99',
        professional: '$249.99',
        master: '$399.99'
    },
    {
        basic: '$19.99',
        professional: '$24.99',
        master: '$39.99'
    }
];

const updatePrices = () => {
    basicPrice.textContent = plans[currentPlan].basic;
    professionalPrice.textContent = plans[currentPlan].professional;
    masterPrice.textContent = plans[currentPlan].master;
};

updatePrices();

const handleClick = () => {
    toggle.classList.toggle('active');

    if (toggle.classList.contains('active')) {
        currentPlan = 1;
    } else {
        currentPlan = 0;
    }
    updatePrices();
};

toggle.addEventListener('click', handleClick);