const menuBtn = document.getElementById('menu_button');
const menuSection = document.getElementById('menu_section');
const mainPage = document.getElementById('main_page');
const closeMenuBtn = document.querySelector('.fa-xmark');
const dropArrow = document.querySelector('.fa-caret-down');
const blob = document.getElementById('blob');
const autoBlurElements = document.querySelectorAll('.autoBlur');
const barsMenu = document.querySelector('.fa-bars');


//loader
setTimeout(function() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}, 3000); 

// blob
document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, {duration: 3000, fill: "forwards"});
}

// back to top button
const backToTopBtn = document.querySelector('.back-to-top');    
window.onscroll = function() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 500) {
    backToTopBtn.style.opacity = 1;
    backToTopBtn.style.pointerEvents = 'auto';
  } else {
    backToTopBtn.style.opacity = 0;
    backToTopBtn.style.pointerEvents = 'none';
  }
};
backToTopBtn.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})


//carousel
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');
let backBtn = document.getElementById('back');
let seeMoreBtns = document.querySelectorAll('.seeMore');
let carousel = document.querySelector('.carousel');
let listHtml = document.querySelector('.carousel .list');
let screenTouch = document.querySelectorAll('.screen');
let glowingBtn = document.querySelectorAll('.glowing-btn');


nextBtn.onclick = function(){
    showSlider('next');
}
prevBtn.onclick = function(){
    showSlider('prev');
}
let canPress = true;
document.addEventListener('keydown', function(event) {
    if (!canPress) return; // Prevent key press if delay is active

    if (event.keyCode === 37) {  // Left Arrow (previous slide)
        showSlider('prev');
        canPress = false;
        setTimeout(() => {
            canPress = true; // Re-enable key press after 2 seconds
        }, 2000);
    } else if (event.keyCode === 39) {  // Right Arrow (next slide)
        showSlider('next');
        canPress = false;
        setTimeout(() => {
            canPress = true; // Re-enable key press after 2 seconds
        }, 2000);
    }
});
// swipe carousel for phone users
let canSwipe = true;
let startX = 0;  // Starting X position of the touch

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;  // Capture the starting X position
});

document.addEventListener('touchend', function(event) {
    if (!canSwipe) return;  // Prevent swipe if delay is active

    const endX = event.changedTouches[0].clientX;  // Capture the ending X position
    const deltaX = endX - startX;  // Calculate the horizontal swipe distance

    if (Math.abs(deltaX) > 50) {  // Minimum swipe distance to consider it a valid swipe
        if (deltaX > 0) {  // Right swipe (previous slide)
            showSlider('prev');
        } else {  // Left swipe (next slide)
            showSlider('next');
        }
        canSwipe = false;  // Disable further swipes for the delay period
        setTimeout(() => {
            canSwipe = true;  // Re-enable swipes after 2 seconds
        }, 2000);
    }
});



let unAcceptClick;
const showSlider = (type) => {
    nextBtn.style.pointerEvents = 'none';
    prevBtn.style.pointerEvents = 'none';

    carousel.classList.remove('prev' , 'next');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHtml.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        let positionLast = items.length -1;
        listHtml.prepend(items[positionLast]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() =>{
        nextBtn.style.pointerEvents = 'auto';
        prevBtn.style.pointerEvents = 'auto';
    }, 2000);
}
screenTouch.forEach(button =>{
    button.onclick = function(){
        carousel.classList.add('showDetail');
   }
});
seeMoreBtns.forEach(button =>{
    button.onclick = function(){
        carousel.classList.add('showDetail');
    }
});
// close detail page of item when click on back or outside of item 
let screenTouchArray = Array.from(screenTouch);
let glowingBtnArray = Array.from(glowingBtn);
let seeMoreBtnArray = Array.from(seeMoreBtns);

backBtn.onclick = function(){
    carousel.classList.remove('showDetail');
};

document.addEventListener('click', function(event) {
    let clickedOutside = true;
    
    screenTouchArray.forEach(function(screenElement) {
        if (screenElement.contains(event.target)) {
            clickedOutside = false;
        }
    });
    
    glowingBtnArray.forEach(function(btnElement) {
        if (btnElement.contains(event.target)) {
            clickedOutside = false;
        }
    });

    seeMoreBtnArray.forEach(function(btnElement) {
        if (btnElement.contains(event.target)) {
            clickedOutside = false;
        }
    });

    if (clickedOutside) {
        carousel.classList.remove('showDetail');
    }
});


// menu pop
menuBtn.addEventListener('click', function() {
    const body = document.body;
    if (!body.classList.contains('show-menu')) {
        const menuSection = document.getElementById('menu_section');
        menuSection.style.display = 'flex'; 
        menuSection.getBoundingClientRect();
    }
    body.classList.toggle('show-menu');
});
barsMenu.addEventListener('click', function() {
    const body = document.body;
    if (!body.classList.contains('show-menu')) {
        const menuSection = document.getElementById('menu_section');
        menuSection.style.display = 'flex'; 
        menuSection.getBoundingClientRect();
    }
    body.classList.toggle('show-menu');
});


//   skills sroll lighting and letter changing
document.addEventListener('DOMContentLoaded', function() {
  
    function handleScroll() {
      const scrollY = window.scrollY + window.innerHeight -150;
  
      autoBlurElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
  
        if (scrollY >= elementTop + (element.offsetHeight / 2)) {
          element.classList.add('scrolled-down');

        } else {
          element.classList.remove('scrolled-down'); 
        }
      });
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();


});
const letters = "ABCDEFGHIJKLMNOPQRSTWXYZ";

autoBlurElements.forEach(element => {
    element.onmouseover = event => {
        const originalText = event.target.dataset.value;
        let iterations = 0;

        const interval = setInterval(() => {
            event.target.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index]; 
                    }
                    return letters[Math.floor(Math.random() * 26)]; 
                })
                .join("");

     
            if (iterations >= originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 4;
        }, 30);
    };
});

// about me slide

const aboutMePage = document.querySelector('.about_me');
const creditsDiv = document.querySelector('.credits');
const backToMainBtn = document.querySelector('.back-to-main');
const creditsP = document.querySelector('.credits-p');

creditsDiv.addEventListener('mouseover', function(){
    creditsP.style.opacity = 1;
    creditsP.style.pointerEvents = 'auto';
});
creditsDiv.addEventListener('mouseout', function() {
    creditsP.style.opacity = 0;
    creditsP.style.pointerEvents = 'none';
});

creditsDiv.addEventListener('click', function() {
    aboutMePage.style.opacity = 1;
    aboutMePage.style.pointerEvents = 'auto';
    aboutMePage.style.zIndex = 1000;
});

backToMainBtn.addEventListener('click' , function(){
    aboutMePage.style.opacity = 0;
    aboutMePage.style.pointerEvents = 'none';
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    console.log('g')
});

// menu navigation to pages on click 
const portfolioBtn = document.querySelector('.portfolio-menu-btn');
const aboutMeBtn = document.querySelector('.about-me-menu-btn');
const contactBtn = document.querySelector('.contact-menu-btn');
const targetDiv1 = document.querySelector('.carousel');
const targetDiv2 = document.querySelector('.contact_page');
const targetDiv3 = document.querySelector('.about_me');


function scrollToWithOffset(targetDiv) {
    const offset = 90; // Offset in pixels
    const elementPosition = targetDiv.getBoundingClientRect().top + window.scrollY; 
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Smooth scroll
    });
}
portfolioBtn.addEventListener('click', function(){
    scrollToWithOffset(targetDiv1);
    document.body.classList.toggle('show-menu');
    aboutMePage.style.opacity = 0;
    aboutMePage.style.pointerEvents = 'none';
    aboutMePage.style.zIndex = -100;
}); 

aboutMeBtn.addEventListener('click', function(){
    aboutMePage.style.opacity = 1;
    aboutMePage.style.pointerEvents = 'auto';
    aboutMePage.style.zIndex = 1000;
    document.body.classList.toggle('show-menu');
}); 

contactBtn.addEventListener('click', function(){
    scrollToWithOffset(targetDiv2);
    document.body.classList.toggle('show-menu');
    aboutMePage.style.opacity = 0;
    aboutMePage.style.pointerEvents = 'none';
    aboutMePage.style.zIndex = -100;
}); 