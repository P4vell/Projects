const adviceId = document.querySelector('.advice-id');
const adviceContent = document.querySelector('.container__advice-content');
const diceBtn = document.querySelector('.container__dice');

const generateAdvice = () => {
    fetch('https://api.adviceslip.com/advice').then(response => response.json()).then(data => {
        const advice = data.slip;
        adviceId.textContent = advice.id;
        adviceContent.textContent = advice.advice;
    });
};

generateAdvice();

diceBtn.addEventListener('click', generateAdvice);