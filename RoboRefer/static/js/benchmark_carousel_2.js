const track_2 = document.getElementById('carouselTrack_2');
const prevBtn_2 = document.getElementById('prevBtn_2');
const nextBtn_2 = document.getElementById('nextBtn_2');
const carouselWrapper_2 = document.getElementById('carouselWrapper_2');

const originalItems_2 = Array.from(track_2.querySelectorAll('.carousel-item'));
const totalItems_2 = originalItems_2.length;
const itemsToClone_2 = 4;

for (let i = totalItems_2 - itemsToClone_2; i < totalItems_2; i++) {
    const clone = originalItems_2[i].cloneNode(true);
    clone.classList.add('cloned');
    track_2.insertBefore(clone, track_2.firstChild);
}
for (let i = 0; i < itemsToClone_2; i++) {
    const clone = originalItems_2[i].cloneNode(true);
    clone.classList.add('cloned');
    track_2.appendChild(clone);
}

const allItems_2 = track_2.querySelectorAll('.carousel-item');
let currentIndex_2 = itemsToClone_2;
const autoPlayInterval_2 = 3000;
let autoSlideTimer_2 = null;

function updateCarousel_2(instant = false) {
    const itemWidth = allItems_2[0].offsetWidth;
    const distance = -currentIndex_2 * itemWidth;
    if (instant) {
        track_2.classList.add('no-transition');
        track_2.style.transform = `translateX(${distance}px)`;
        track_2.offsetHeight;
        track_2.classList.remove('no-transition');
    } else {
        track_2.style.transform = `translateX(${distance}px)`;
    }
}

let isResetting_2 = false;

function moveToNext_2() {
    if (isResetting_2) return;
    currentIndex_2++;
    updateCarousel_2();
    if (currentIndex_2 >= totalItems_2 + itemsToClone_2) {
        isResetting_2 = true;
        stopAutoSlide_2();
        setTimeout(() => {
            currentIndex_2 = itemsToClone_2;
            updateCarousel_2(true);
            isResetting_2 = false;
            startAutoSlide_2();
        }, 500);
    }
}

function moveToPrev_2() {
    if (isResetting_2) return;
    currentIndex_2--;
    updateCarousel_2();
    if (currentIndex_2 < itemsToClone_2) {
        isResetting_2 = true;
        stopAutoSlide_2();
        setTimeout(() => {
            currentIndex_2 = totalItems_2 + itemsToClone_2 - 1;
            updateCarousel_2(true);
            isResetting_2 = false;
            startAutoSlide_2();
        }, 500);
    }
}

function startAutoSlide_2() {
    stopAutoSlide_2();
    autoSlideTimer_2 = setInterval(() => {
        if (!isResetting_2) moveToNext_2();
    }, autoPlayInterval_2);
}

function stopAutoSlide_2() {
    if (autoSlideTimer_2) {
        clearInterval(autoSlideTimer_2);
        autoSlideTimer_2 = null;
    }
}

nextBtn_2.addEventListener('click', () => {
    stopAutoSlide_2();
    moveToNext_2();
    startAutoSlide_2();
});

prevBtn_2.addEventListener('click', () => {
    stopAutoSlide_2();
    moveToPrev_2();
    startAutoSlide_2();
});

carouselWrapper_2.addEventListener('mouseenter', stopAutoSlide_2);
carouselWrapper_2.addEventListener('mouseleave', startAutoSlide_2);
window.addEventListener('resize', () => updateCarousel_2(true));

updateCarousel_2(true);
startAutoSlide_2();

let startX_2 = 0;
let isDragging_2 = false;

carouselWrapper_2.addEventListener('touchstart', (e) => {
    startX_2 = e.touches[0].clientX;
    isDragging_2 = true;
    stopAutoSlide_2();
});
carouselWrapper_2.addEventListener('touchmove', (e) => {
    if (!isDragging_2) return;
    e.preventDefault();
});
carouselWrapper_2.addEventListener('touchend', (e) => {
    if (!isDragging_2) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX_2 - endX;
    if (Math.abs(diffX) > 50) {
        diffX > 0 ? moveToNext_2() : moveToPrev_2();
    }
    isDragging_2 = false;
    startAutoSlide_2();
});