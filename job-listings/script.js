const jobOfferTemplate = document.querySelector('.template__job-offer');
const filterBtnTemplate = document.querySelector('.template__filter-btn');
const filtersDisplayContainer = document.querySelector('.filters-display');
const filtersDisplay = document.querySelector('.filters-display__buttons');
const clearFiltersBtn = document.querySelector('.filters-display__clear');
let jobs;

const filtersList = [];

async function getData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
    }
};

async function app() {
    await getData();
    await getData().then(data => {
        for (const offer of data) {
            const jobFilters = [];
            const jobOfferEl = jobOfferTemplate.content.cloneNode(true);
            jobOfferEl.querySelector('.job-offer__image').src = offer.logo;
            jobOfferEl.querySelector('.header__company-name').textContent = offer.company;
            if (offer.new) {
                jobOfferEl.querySelector('.header__new-badge').classList.add('visible');
            }
            if (offer.featured) {
                jobOfferEl.querySelector('.header__featured-badge').classList.add('visible');
            }
            jobOfferEl.querySelector('.job-offer__position').textContent = offer.position;
            jobOfferEl.querySelector('.info__date').textContent = offer.postedAt;
            jobOfferEl.querySelector('.info__contract').textContent = offer.contract;
            jobOfferEl.querySelector('.info__location').textContent = offer.location;
            jobOfferEl.querySelector('.filters__role').textContent = offer.role;
            jobOfferEl.querySelector('.filters__level').textContent = offer.level;

            jobFilters.push(offer.role);
            jobFilters.push(offer.level);

            const filters = jobOfferEl.querySelector('.job-offer__filters');

            for (const language of offer.languages) {
                const languageEl = document.createElement('button');
                languageEl.className = 'filter';
                languageEl.textContent = language;
                jobFilters.push(language);
                filters.append(languageEl);
            }

            for (const tool of offer.tools) {
                const toolEl = document.createElement('button');
                toolEl.className = 'filter';
                toolEl.textContent = tool;
                jobFilters.push(tool);
                filters.append(toolEl);
            }

            jobOfferEl.children[0].dataset.filters = jobFilters;

            const filtersBtns = filters.querySelectorAll('.filter');

            filtersBtns.forEach(btn => {
                btn.addEventListener('click', event => {
                    addFilter(event.currentTarget.textContent);
                });
            });

            document.body.append(jobOfferEl);
        }
    });
    jobs = document.querySelectorAll('.job-offer');
};

function updateFiltersDisplay() {
    if (filtersList.length > 0) {
        filtersDisplayContainer.classList.add('visible');
        document.body.classList.add('active-filters');
    } else {
        filtersDisplayContainer.classList.remove('visible');
        document.body.classList.remove('active-filters');
    }
};

function addFilter(value) {
    const filterEl = filterBtnTemplate.content.cloneNode(true);
    filterEl.querySelector('p').textContent = value;
    filtersList.push(value);
    filterEl.querySelector('button').addEventListener('click', event => {
        removeFilter(event.currentTarget.parentElement);
    });
    filtersDisplay.append(filterEl);
    updateFiltersDisplay();
    updateUI();
};

function removeFilter(target) {
    filtersDisplay.removeChild(target);
    const filterIndex = filtersList.indexOf(target.textContent.trim(), 0);
    filtersList.splice(filterIndex, 1);
    updateFiltersDisplay();
    updateUI();
};

function clearFilters() {
    filtersDisplay.innerHTML = '';
    filtersList.length = 0;
    updateFiltersDisplay();
    updateUI();
}

function updateUI() {
    jobs.forEach(job => {
        const jobTags = job.dataset.filters.split(',');
        function checkFilters(element, index, array) {
            return jobTags.includes(element);
        }

        if (filtersList.every(checkFilters)) {
            job.style.display = 'flex';
        } else {
            job.style.display = 'none';
        }
    });
};

clearFiltersBtn.addEventListener('click', clearFilters);

app();