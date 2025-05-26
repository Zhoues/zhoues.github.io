const track_3 = document.getElementById('carouselTrack_3');
const prevBtn_3 = document.getElementById('prevBtn_3');
const nextBtn_3 = document.getElementById('nextBtn_3');
const carouselWrapper_3 = document.getElementById('carouselWrapper_3');

const originalItems_3 = Array.from(track_3.querySelectorAll('.carousel-item'));
const totalItems_3 = originalItems_3.length;
const itemsToClone_3 = 4;

for (let i = totalItems_3 - itemsToClone_3; i < totalItems_3; i++) {
    const clone = originalItems_3[i].cloneNode(true);
    clone.classList.add('cloned');
    track_3.insertBefore(clone, track_3.firstChild);
}
for (let i = 0; i < itemsToClone_3; i++) {
    const clone = originalItems_3[i].cloneNode(true);
    clone.classList.add('cloned');
    track_3.appendChild(clone);
}

const allItems_3 = track_3.querySelectorAll('.carousel-item');
let currentIndex_3 = itemsToClone_3;
const autoPlayInterval_3 = 3000;
let autoSlideTimer_3 = null;

function updateCarousel_3(instant = false) {
    const itemWidth = allItems_3[0].offsetWidth;
    const distance = -currentIndex_3 * itemWidth;
    if (instant) {
        track_3.classList.add('no-transition');
        track_3.style.transform = `translateX(${distance}px)`;
        track_3.offsetHeight;
        track_3.classList.remove('no-transition');
    } else {
        track_3.style.transform = `translateX(${distance}px)`;
    }
}

let isResetting_3 = false;

function moveToNext_3() {
    if (isResetting_3) return;
    currentIndex_3++;
    updateCarousel_3();
    if (currentIndex_3 >= totalItems_3 + itemsToClone_3) {
        isResetting_3 = true;
        stopAutoSlide_3();
        setTimeout(() => {
            currentIndex_3 = itemsToClone_3;
            updateCarousel_3(true);
            isResetting_3 = false;
            startAutoSlide_3();
        }, 500);
    }
}

function moveToPrev_3() {
    if (isResetting_3) return;
    currentIndex_3--;
    updateCarousel_3();
    if (currentIndex_3 < itemsToClone_3) {
        isResetting_3 = true;
        stopAutoSlide_3();
        setTimeout(() => {
            currentIndex_3 = totalItems_3 + itemsToClone_3 - 1;
            updateCarousel_3(true);
            isResetting_3 = false;
            startAutoSlide_3();
        }, 500);
    }
}

function startAutoSlide_3() {
    stopAutoSlide_3();
    autoSlideTimer_3 = setInterval(() => {
        if (!isResetting_3) moveToNext_3();
    }, autoPlayInterval_3);
}

function stopAutoSlide_3() {
    if (autoSlideTimer_3) {
        clearInterval(autoSlideTimer_3);
        autoSlideTimer_3 = null;
    }
}

nextBtn_3.addEventListener('click', () => {
    stopAutoSlide_3();
    moveToNext_3();
    startAutoSlide_3();
});

prevBtn_3.addEventListener('click', () => {
    stopAutoSlide_3();
    moveToPrev_3();
    startAutoSlide_3();
});

carouselWrapper_3.addEventListener('mouseenter', stopAutoSlide_3);
carouselWrapper_3.addEventListener('mouseleave', startAutoSlide_3);
window.addEventListener('resize', () => updateCarousel_3(true));

updateCarousel_3(true);
startAutoSlide_3();

let startX_3 = 0;
let isDragging_3 = false;

carouselWrapper_3.addEventListener('touchstart', (e) => {
    startX_3 = e.touches[0].clientX;
    isDragging_3 = true;
    stopAutoSlide_3();
});
carouselWrapper_3.addEventListener('touchmove', (e) => {
    if (!isDragging_3) return;
    e.preventDefault();
});
carouselWrapper_3.addEventListener('touchend', (e) => {
    if (!isDragging_3) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX_3 - endX;
    if (Math.abs(diffX) > 50) {
        diffX > 0 ? moveToNext_3() : moveToPrev_3();
    }
    isDragging_3 = false;
    startAutoSlide_3();
});