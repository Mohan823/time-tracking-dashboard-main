//<<<---------ENABLING BUTTON RESPONSE--------------->>>
const dailyBtn = document.getElementById('daily-btn');
const weeklyBtn = document.getElementById('weekly-btn');
const monthlyBtn = document.getElementById('monthly-btn');

const dailyDisplays = document.querySelectorAll('.daily');
const weeklyDisplays = document.querySelectorAll('.weekly');
const monthlyDisplays = document.querySelectorAll('.monthly');

const navBtns = document.querySelectorAll('.nav-btn');
const dailyBtnSelfs = document.querySelectorAll('.daily-btn');
const weeklyBtnSelfs = document.querySelectorAll('.weekly-btn');
const monthlyBtnSelfs = document.querySelectorAll('.monthly-btn');

//toggling hidden FUNCTION
function toggleHiddenSelf(display, state) {
    if (state === 'hide') {
        display.classList.add('hidden');
    } else {
        display.classList.remove('hidden');
    }
}

//toggling hidden iterating FUNCTION
function toggleHidden(displays, state) {
    for (let display of displays) {
        if (state === 'hide') {
            display.classList.add('hidden');
        } else {
            display.classList.remove('hidden');
        }
    }
}

//navbtn auto open close
for (const navBtn of navBtns) {
    navBtn.addEventListener('mouseover', () => {
        const container = navBtn.nextElementSibling;
        container.classList.remove('hidden');
    })
    navBtn.parentElement.addEventListener('mouseover', () => {
        const container = navBtn.nextElementSibling;
        container.classList.remove('hidden');
    })
    navBtn.parentElement.addEventListener('mouseout', () => {
        const container = navBtn.nextElementSibling;
        container.classList.add('hidden');
    })
}

//navbtn - switching displays based on btnself
for (let i = 0; i < dailyBtnSelfs.length; i++) {
    dailyBtnSelfs[i].addEventListener('click', () => {
        toggleHiddenSelf(dailyDisplays[i]);
        toggleHiddenSelf(weeklyDisplays[i], 'hide');
        toggleHiddenSelf(monthlyDisplays[i], 'hide');
        autoColor();
    })
}
for (let i = 0; i < dailyBtnSelfs.length; i++) {
    weeklyBtnSelfs[i].addEventListener('click', () => {
        toggleHiddenSelf(dailyDisplays[i], 'hide');
        toggleHiddenSelf(weeklyDisplays[i]);
        toggleHiddenSelf(monthlyDisplays[i], 'hide');
        autoColor();
    })
}
for (let i = 0; i < dailyBtnSelfs.length; i++) {
    monthlyBtnSelfs[i].addEventListener('click', () => {
        toggleHiddenSelf(dailyDisplays[i], 'hide');
        toggleHiddenSelf(weeklyDisplays[i], 'hide');
        toggleHiddenSelf(monthlyDisplays[i]);
        autoColor();
    })
}

//navbtn - btnselfs Auto change color based on display FUNCTION
function autoColor() {
    for (let i = 0; i < dailyDisplays.length; i++) {
        if (!dailyDisplays[i].classList.contains('hidden')) {
            dailyBtnSelfs[i].style.setProperty('color', '#fff');
            weeklyBtnSelfs[i].style.removeProperty('color');
            monthlyBtnSelfs[i].style.removeProperty('color');
        }
    }
    for (let i = 0; i < weeklyDisplays.length; i++) {
        if (!weeklyDisplays[i].classList.contains('hidden')) {
            dailyBtnSelfs[i].style.removeProperty('color');
            weeklyBtnSelfs[i].style.setProperty('color', '#fff');
            monthlyBtnSelfs[i].style.removeProperty('color');
        }
    }
    for (let i = 0; i < monthlyDisplays.length; i++) {
        if (!monthlyDisplays[i].classList.contains('hidden')) {
            dailyBtnSelfs[i].style.removeProperty('color');
            weeklyBtnSelfs[i].style.removeProperty('color');
            monthlyBtnSelfs[i].style.setProperty('color', '#fff');
        }
    }
}

//global navbtn - executing toggle hidden via event listener & button color change
dailyBtn.addEventListener('click', function () {
    dailyBtn.style.setProperty('color', '#fff');
    weeklyBtn.style.removeProperty('color');
    monthlyBtn.style.removeProperty('color');
    toggleHidden(dailyDisplays);
    toggleHidden(weeklyDisplays, 'hide');
    toggleHidden(monthlyDisplays, 'hide');
    autoColor();
})
weeklyBtn.addEventListener('click', function () {
    dailyBtn.style.removeProperty('color');
    weeklyBtn.style.setProperty('color', '#fff');
    monthlyBtn.style.removeProperty('color');
    toggleHidden(dailyDisplays, 'hide');
    toggleHidden(weeklyDisplays);
    toggleHidden(monthlyDisplays, 'hide');
    autoColor();
})
monthlyBtn.addEventListener('click', function () {
    dailyBtn.style.removeProperty('color');
    weeklyBtn.style.removeProperty('color');
    monthlyBtn.style.setProperty('color', '#fff');
    toggleHidden(dailyDisplays, 'hide');
    toggleHidden(weeklyDisplays, 'hide');
    toggleHidden(monthlyDisplays);
    autoColor();
})



//<<<---------WORKING WITH JSON FILE--------------->>>
const lvl2Heading = document.querySelectorAll('h2');
const dailyActivity = document.querySelectorAll('.daily');
const weeklyActivity = document.querySelectorAll('.weekly');
const monthlyActivity = document.querySelectorAll('.monthly');

fetch('data.json')
    .then(res => res.json())
    .then(datas => {
        for (let i = 0; i < datas.length; i++) {

            function addS(data, target, previous = '') {
                if (data === 0) target.innerHTML = `START`;
                else if (data === 1) target.innerHTML = `${previous}${data}hr`;
                else target.innerHTML = `${previous}${data}hrs`;
            }

            const heading = lvl2Heading[i];

            //(target's) daily, weekly, monthly | current, previous
            const dc = dailyActivity[i].children[0];
            const dp = dailyActivity[i].children[1];
            const wc = weeklyActivity[i].children[0];
            const wp = weeklyActivity[i].children[1];
            const mc = monthlyActivity[i].children[0];
            const mp = monthlyActivity[i].children[1];

            //(data's) data | daily, weekly, monthly | current, previous
            const ddc = datas[i].timeframes.daily.current;
            const ddp = datas[i].timeframes.daily.previous;
            const dwc = datas[i].timeframes.weekly.current;
            const dwp = datas[i].timeframes.weekly.previous;
            const dmc = datas[i].timeframes.monthly.current;
            const dmp = datas[i].timeframes.monthly.previous;

            heading.innerHTML = datas[i].title;
            addS(ddc, dc);
            addS(ddp, dp, 'Yesterday - ');
            addS(dwc, wc);
            addS(dwp, wp, 'Last Week - ');
            addS(dmc, mc);
            addS(dmp, mp, 'Last Month - ');
        }
    })