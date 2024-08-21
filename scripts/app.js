const animbg = document.getElementsByClassName('target-background')[0];
const check = document.getElementById('dark-light-check');



check.addEventListener('change', e=> {
    localStorage.setItem('darkModeValue', check.checked);
    console.log(check.checked);
    if (e.currentTarget.checked) {
        animbg.setAttribute('id', 'animate-background');
        document.body.classList.add('dark-theme');
    } else {
        animbg.setAttribute('id', 'animated-background');
        document.body.classList.remove('dark-theme');
    }
    
})


checkForDarkMode = () => {

    
    if (localStorage.getItem('darkModeValue') == 'true') {
        animbg.setAttribute('id', 'animate-background');
        document.body.classList.add('dark-theme');
        check.checked = true;
    } else {
        animbg.setAttribute('id', 'animated-background');
        document.body.classList.remove('dark-theme');
        check.checked = false;
    }
    console.log(localStorage.getItem('darkModeValue'));
}

const transitionElement = document.querySelector('.transition');
const anchors = document.querySelectorAll('a');
const root = document.documentElement;
var x;
var y;

window.onpageshow = () => {
    setTimeout(() => {
      transitionElement.classList.remove('is-active');  
    }, 500);
         
    root.style.setProperty('--mouse-x', 50 + "%");
    root.style.setProperty('--mouse-y', 50 + "%");

    for (let i = 0; i < anchors.length; i++) {
        const a = anchors[i];
        a.addEventListener('click', e => {
            e.preventDefault();
            let target = e.target.href;
            transitionElement.classList.add('is-active');
            let x = e.clientX / innerWidth * 100;
            let y = e.clientY / innerHeight * 100;
         
            root.style.setProperty('--mouse-x', x + "%");
            root.style.setProperty('--mouse-y', y + "%");

            setTimeout(() => {
                window.location.href = target;
            }, 800);
        })
    }
}

document.addEventListener('click', e => {

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
})


checkForDarkMode();