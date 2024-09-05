const optionsMenuButton = document.querySelector('#options-button');
const menu = document.querySelector('.menu');
const blurElements = [...document.querySelectorAll('.blur')];
const potionIcon = document.querySelector('#potion-icon');


optionsMenuButton.addEventListener('click', (e) => {
    optionsMenuButton.classList.toggle('active');
    menu.classList.toggle('active');
    difficultyDropdown.classList.remove('show');
    categoryDropdown.classList.remove('show');
    blurElements.forEach(i => i.classList.toggle('active'));
})

const difficultyDropdown = document.querySelector('#difficulty-dropdown');
const difficultySelectorItems = [...document.querySelector('#difficulty-menu').children];
const difficultySelectedListContainer = document.querySelector('#difficulty-selected-list');
const difficultySelectedListEntries = [...document.querySelectorAll('.difficulty-list-entry')];

const categoryDropdown = document.querySelector('#category-dropdown');
const categorySelectorItems = [...document.querySelector('#category-menu').children];
const categorySelectedListContainer = document.querySelector('#category-selected-list');
const categorySelectedListEntries = [...document.querySelectorAll('.category-list-entry')];

const quantitySelectorMenu = document.querySelector('#quantity-menu');


var difficultySelectedList = [];
var formattedDifficultySelectedList = [];
var categorySelectedList = [];
var formattedCategorySelectedList = [];


difficultyDropdown.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('show');
    categoryDropdown.classList.remove('show');
})

difficultySelectorItems.forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        const item = e.target.innerHTML;
        let body = document.querySelector('body');
        let num = Math.random() * 8 + 3;
    
        for (let i = 0; i < num; i++) {
    
            let star = document.createElement('span');
            star.classList.add('star');
            body.appendChild(star);
    
            star.style.left = e.clientX + "px";
            star.style.top = e.clientY + "px";
            star.style.fontSize = Math.random() * 20 + 5 + 'px';
            star.style.transform = `rotate(${Math.random() * 360}deg) translate(${Math.random() * 40 + 10}px)`;
    
            setTimeout(() => {
                star.remove();
            }, 1000);
        }

        if (!difficultySelectedList.includes(item)) {
            difficultySelectedList.push(item);
            switch(item) {
                case 'Medium': formattedDifficultySelectedList.push('medium'); break;
                case 'Hard': formattedDifficultySelectedList.push('hard'); break;
                default: formattedDifficultySelectedList.push('easy'); break;
            }
            showSelectedDifficulties(item);
        }
    })
}); 

showSelectedDifficulties = (item) => {
    const itemSpan = document.createElement('span');
    const xIcon = document.createElement('i');
    const listEntry = document.createElement('li');
    xIcon.classList.add('fa-regular', 'fa-circle-xmark', 'x-button');
    itemSpan.innerHTML = item;
    itemSpan.classList.add('selected-item');
    listEntry.classList.add('selected-list-entry');
    listEntry.classList.add('difficulty-list-entry');
    listEntry.classList.add('button');
    listEntry.setAttribute('draggable', 'false');

    listEntry.append(itemSpan, xIcon);
    difficultySelectedListContainer.append(listEntry);
    difficultySelectedListEntries.push(listEntry);

    difficultySelectedListEntries.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteDifficultyItem(item, e);
        })
    })
}

deleteDifficultyItem = (item, e) => {
    e.stopImmediatePropagation();
    switch([...item.children][0].innerText) {
        case 'Medium': formattedDifficultySelectedList.splice(formattedDifficultySelectedList.indexOf('medium'), 1); break;
        case 'Hard': formattedDifficultySelectedList.splice(formattedDifficultySelectedList.indexOf('hard'), 1); break;
        default: formattedDifficultySelectedList.splice(formattedDifficultySelectedList.indexOf('easy'), 1); break;
    }
    difficultySelectedList.splice(difficultySelectedList.indexOf([...item.children][0].innerText), 1);

    item.classList.add('item-zoom-out');

    setTimeout(() => {
        item.remove();
        item.classList.remove('item-zoom-out');
    }, 390);
}



categoryDropdown.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('show');
    difficultyDropdown.classList.remove('show');
})

categorySelectorItems.forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = e.target.textContent;
        let body = document.querySelector('body');
        let num = Math.random() * 8 + 3;
    
        for (let i = 0; i < num; i++) {
    
            let star = document.createElement('span');
            star.classList.add('star');
            body.appendChild(star);
    
            star.style.left = e.clientX + "px";
            star.style.top = e.clientY + "px";
            star.style.fontSize = Math.random() * 20 + 5 + 'px';
            star.style.transform = `rotate(${Math.random() * 360}deg) translate(${Math.random() * 40 + 10}px)`;
    
            setTimeout(() => {
                star.remove();
            }, 1000);
        }

        if (!categorySelectedList.includes(item)) {
            categorySelectedList.push(item);
            switch(item) {
                case 'Music': formattedCategorySelectedList.push('music'); break;
                case 'Sports & Leisure': formattedCategorySelectedList.push('sport_and_leisure'); break;
                case 'Film & TV': formattedCategorySelectedList.push('film_and_tv'); break;
                case 'Arts & Literature': formattedCategorySelectedList.push('arts_and_literature'); break;
                case 'History': formattedCategorySelectedList.push('history'); break;
                case 'Society & Culture': formattedCategorySelectedList.push('society_and_culture'); break;
                case 'Science': formattedCategorySelectedList.push('science'); break;
                case 'Geography': formattedCategorySelectedList.push('geography'); break;
                case 'Food & Drink': formattedCategorySelectedList.push('food_and_drink'); break;
                default: formattedCategorySelectedList.push('general_knowledge'); break;
            }
            showSelectedCategories(item);
        }
    })
}); 

showSelectedCategories = (item) => {
    const itemSpan = document.createElement('span');
    const xIcon = document.createElement('i');
    const listEntry = document.createElement('li');
    xIcon.classList.add('fa-regular', 'fa-circle-xmark', 'x-button');
    itemSpan.innerHTML = item;
    itemSpan.classList.add('selected-item');
    listEntry.classList.add('selected-list-entry');
    listEntry.classList.add('category-list-entry');
    listEntry.classList.add('button');
    listEntry.setAttribute('draggable', 'false');

    listEntry.append(itemSpan, xIcon);
    categorySelectedListContainer.append(listEntry);
    categorySelectedListEntries.push(listEntry);

    categorySelectedListEntries.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteCategoryItem(item, e);
        })
    })
}

deleteCategoryItem = (item, e) => {
    e.stopImmediatePropagation();
    switch([...item.children][0].innerText) {
        case 'Music': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('music'), 1); break;
        case 'Sports & Leisure': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('sport_and_leisure'), 1); break;
        case 'Film & TV': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('film_and_tv'), 1); break;
        case 'Arts & Literature': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('arts_and_literature'), 1); break;
        case 'History': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('history'), 1); break;
        case 'Society & Culture': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('society_and_culture'), 1); break;
        case 'Science': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('science'), 1); break;
        case 'Geography': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('geography')), 1; break;
        case 'Food & Drink': formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('food_and_drink'), 1); break;
        default: formattedCategorySelectedList.splice(formattedCategorySelectedList.indexOf('general_knowledge'), 1); break;
    }
    categorySelectedList.splice(categorySelectedList.indexOf([...item.children][0].innerText), 1);

    item.classList.add('item-zoom-out');

    setTimeout(() => {
        item.remove();
        item.classList.remove('item-zoom-out');
    }, 390);
}




const quantityScrollBox = document.getElementById('quantity-scroll-box');


for (let i = 5; i <= 50; i=i+5) {
    let item = document.createElement('div');
    item.classList.add('scroll-item');
    item.textContent = i;
    quantityScrollBox.appendChild(item);
}

moveNext = (target) => {
    let items = document.querySelectorAll('.scroll-item');
    quantityScrollBox.appendChild(items[0]);
}
movePrev = (target) => {
    let items = document.querySelectorAll('.scroll-item');
    quantityScrollBox.prepend(items[items.length - 1]);
}
quantityScrollBox.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) movePrev();
    else moveNext();
    // console.log(quantityScrollBox.children[3].textContent);
})

const quantityLeftArrow = document.getElementById('quantity-left-arrow');
const quantityRightArrow = document.getElementById('quantity-right-arrow');

quantityLeftArrow.addEventListener('click', () => {
    movePrev();
})

quantityRightArrow.addEventListener('click', () => {
    moveNext();
})



const playButton = document.getElementById('play-button');

playButton.addEventListener('click', () => {
    const config = {
        difficulties: difficultySelectedList.length > 0 ? formattedDifficultySelectedList.join(',') : 'easy',
        categories: categorySelectedList.length > 0 ?formattedCategorySelectedList.join(',') : 'general_knowledge',
        quantity: quantityScrollBox.children[3].textContent
    }
    localStorage.setItem('config', JSON.stringify(config));
})


// document.addEventListener('click', () => {
//     console.log(formattedDifficultySelectedList.join(','));
// })