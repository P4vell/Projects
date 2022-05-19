const jobs = document.querySelectorAll('.job-card');
const filtersDisplay = document.querySelector('.filters');
const filtersListDisplay = document.querySelector('.filters__list');
const filterBtn = document.querySelectorAll('.requirements__item');
const clearAllFiltersBtn = document.querySelector('.filters__clear');
let filtersList = [];

class Filter {
    constructor(info) {
        this.info = info;
        this.filter = document.createElement('li');
        this.filter.className = 'filters__list--item';
        this.filter.innerHTML = `
            <p class="item__info">${this.info}</p>
            <img src="./images/icon-remove.svg" class="item__remove" alt="icon-remove">
        `;
        filtersListDisplay.append(this.filter);
        filtersList.push(this.info);
        updateUI();
        const removeBtn = this.filter.querySelector('.item__remove');
        removeBtn.addEventListener('click', this.remove.bind(this));
    }

    remove() {
        filtersListDisplay.removeChild(this.filter);
        filtersList = filtersList.filter(item => item !== this.info);
        updateUI();
    }
}

const updateUI = () => {
    if (filtersList.length > 0) {
        filtersDisplay.style.display = 'flex';
    } else {
        filtersDisplay.style.display = 'none';
    }

    jobs.forEach(job => {
        const jobFilters = job.dataset.filter.split(' ');
        for (const filter of filtersList) {
            if (!jobFilters.includes(filter)) {
                job.style.display = 'none';
                break;
            }
            if (jobFilters.includes(filter)) {
                job.style.display = 'flex';
            }
        }
        if (filtersList.length === 0) {
            job.style.display = 'flex';
        }
    });
};

const clearAllFilters = () => {
    filtersList = [];
    updateUI();
};

filterBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        e = e.currentTarget;
        if (filtersList.includes(e.textContent)) {
            alert('This filter was already used!');
            return;
        }
        new Filter(e.textContent);
    })
});

clearAllFiltersBtn.addEventListener('click', clearAllFilters);