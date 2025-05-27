const track_1 = document.getElementById('carouselTrack_1');
const prevBtn_1 = document.getElementById('prevBtn_1');
const nextBtn_1 = document.getElementById('nextBtn_1');
const carouselWrapper_1 = document.getElementById('carouselWrapper_1');

const originalItems_1 = Array.from(track_1.querySelectorAll('.carousel-item'));
const totalItems_1 = originalItems_1.length;
const itemsToClone_1 = 4;

for (let i = totalItems_1 - itemsToClone_1; i < totalItems_1; i++) {
    const clone = originalItems_1[i].cloneNode(true);
    clone.classList.add('cloned');
    track_1.insertBefore(clone, track_1.firstChild);
}
for (let i = 0; i < itemsToClone_1; i++) {
    const clone = originalItems_1[i].cloneNode(true);
    clone.classList.add('cloned');
    track_1.appendChild(clone);
}

const allItems_1 = track_1.querySelectorAll('.carousel-item');
let currentIndex_1 = itemsToClone_1;
const autoPlayInterval_1 = 3000;
let autoSlideTimer_1 = null;

function updateCarousel_1(instant = false) {
    const itemWidth = allItems_1[0].offsetWidth;
    const distance = -currentIndex_1 * itemWidth;
    if (instant) {
        track_1.classList.add('no-transition');
        track_1.style.transform = `translateX(${distance}px)`;
        track_1.offsetHeight;
        track_1.classList.remove('no-transition');
    } else {
        track_1.style.transform = `translateX(${distance}px)`;
    }
}

let isResetting_1 = false;

function moveToNext_1() {
    if (isResetting_1) return;
    currentIndex_1++;
    updateCarousel_1();
    if (currentIndex_1 >= totalItems_1 + itemsToClone_1) {
        isResetting_1 = true;
        stopAutoSlide_1();
        setTimeout(() => {
            currentIndex_1 = itemsToClone_1;
            updateCarousel_1(true);
            isResetting_1 = false;
            startAutoSlide_1();
        }, 500);
    }
}

function moveToPrev_1() {
    if (isResetting_1) return;
    currentIndex_1--;
    updateCarousel_1();
    if (currentIndex_1 < itemsToClone_1) {
        isResetting_1 = true;
        stopAutoSlide_1();
        setTimeout(() => {
            currentIndex_1 = totalItems_1 + itemsToClone_1 - 1;
            updateCarousel_1(true);
            isResetting_1 = false;
            startAutoSlide_1();
        }, 500);
    }
}

function startAutoSlide_1() {
    stopAutoSlide_1();
    autoSlideTimer_1 = setInterval(() => {
        if (!isResetting_1) moveToNext_1();
    }, autoPlayInterval_1);
}

function stopAutoSlide_1() {
    if (autoSlideTimer_1) {
        clearInterval(autoSlideTimer_1);
        autoSlideTimer_1 = null;
    }
}

nextBtn_1.addEventListener('click', () => {
    stopAutoSlide_1();
    moveToNext_1();
    startAutoSlide_1();
});

prevBtn_1.addEventListener('click', () => {
    stopAutoSlide_1();
    moveToPrev_1();
    startAutoSlide_1();
});

carouselWrapper_1.addEventListener('mouseenter', stopAutoSlide_1);
carouselWrapper_1.addEventListener('mouseleave', startAutoSlide_1);
window.addEventListener('resize', () => updateCarousel_1(true));

updateCarousel_1(true);
startAutoSlide_1();

let startX_1 = 0;
let isDragging_1 = false;

carouselWrapper_1.addEventListener('touchstart', (e) => {
    startX_1 = e.touches[0].clientX;
    isDragging_1 = true;
    stopAutoSlide_1();
});
carouselWrapper_1.addEventListener('touchmove', (e) => {
    if (!isDragging_1) return;
    e.preventDefault();
});
carouselWrapper_1.addEventListener('touchend', (e) => {
    if (!isDragging_1) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX_1 - endX;
    if (Math.abs(diffX) > 50) {
        diffX > 0 ? moveToNext_1() : moveToPrev_1();
    }
    isDragging_1 = false;
    startAutoSlide_1();
});