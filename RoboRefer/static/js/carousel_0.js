const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselWrapper = document.getElementById('carouselWrapper');

// Get original items
const originalItems = Array.from(track.querySelectorAll('.carousel-item'));
const totalItems = originalItems.length;

// Clone first and last few items for smooth infinite loop
const itemsToClone = 4; // Clone 4 items on each side for smooth transition

// Clone last items and prepend to the beginning
for (let i = totalItems - itemsToClone; i < totalItems; i++) {
    const clone = originalItems[i].cloneNode(true);
    clone.classList.add('cloned');
    track.insertBefore(clone, track.firstChild);
}

// Clone first items and append to the end
for (let i = 0; i < itemsToClone; i++) {
    const clone = originalItems[i].cloneNode(true);
    clone.classList.add('cloned');
    track.appendChild(clone);
}

// Update items list to include clones
const allItems = track.querySelectorAll('.carousel-item');

// Start at the first real item (after the cloned items at the beginning)
let currentIndex = itemsToClone;

// Autoplay settings
const autoPlayInterval = 3000;
let autoSlideTimer = null;

// Function to update the carousel's translation
function updateCarousel(instant = false) {
    const itemWidth = allItems[0].offsetWidth;
    const distance = -currentIndex * itemWidth;

    if (instant) {
        track.classList.add('no-transition');
        track.style.transform = `translateX(${distance}px)`;
        // Force reflow to ensure the transition is disabled
        track.offsetHeight;
        track.classList.remove('no-transition');
    } else {
        track.style.transform = `translateX(${distance}px)`;
    }
}

// Flag to prevent multiple rapid slides during reset
let isResetting = false;

// Move to the next slide
function moveToNext() {
    if (isResetting) return; // Prevent sliding during reset

    currentIndex++;
    updateCarousel();

    // If we've moved past the last real item, reset to the first real item
    if (currentIndex >= totalItems + itemsToClone) {
        isResetting = true;
        stopAutoSlide(); // Stop auto-slide during reset

        setTimeout(() => {
            currentIndex = itemsToClone;
            updateCarousel(true);
            isResetting = false;
            startAutoSlide(); // Restart auto-slide after reset
        }, 500); // Wait for transition to complete
    }
}

// Move to the previous slide
function moveToPrev() {
    if (isResetting) return; // Prevent sliding during reset

    currentIndex--;
    updateCarousel();

    // If we've moved before the first real item, jump to the last real item
    if (currentIndex < itemsToClone) {
        isResetting = true;
        stopAutoSlide(); // Stop auto-slide during reset

        setTimeout(() => {
            currentIndex = totalItems + itemsToClone - 1;
            updateCarousel(true);
            isResetting = false;
            startAutoSlide(); // Restart auto-slide after reset
        }, 500); // Wait for transition to complete
    }
}

// Automatic slide
function startAutoSlide() {
    // Clear any existing timer first
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
        if (!isResetting) { // Only auto-slide if not currently resetting
            moveToNext();
        }
    }, autoPlayInterval);
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
}

// Event listeners for arrow buttons
nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    moveToNext();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    moveToPrev();
    startAutoSlide();
});

// Pause on hover
carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
carouselWrapper.addEventListener('mouseleave', startAutoSlide);

// Handle window resize
window.addEventListener('resize', () => {
    updateCarousel(true);
});

// Initialize
updateCarousel(true);
startAutoSlide();

// Optional: Add touch/swipe support for mobile
let startX = 0;
let isDragging = false;

carouselWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoSlide();
});

carouselWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

carouselWrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
            moveToNext();
        } else {
            moveToPrev();
        }
    }

    isDragging = false;
    startAutoSlide();
});