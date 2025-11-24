// Simulator Carousel with Infinite Loop and Debounce
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('simulatorCarouselTrack');
    const prevBtn = document.getElementById('simulatorPrevBtn');
    const nextBtn = document.getElementById('simulatorNextBtn');
    const dots = document.querySelectorAll('.simulator-carousel-dots .dot');
    const slides = document.querySelectorAll('.simulator-carousel-slide');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let isTransitioning = false; // 防止快速点击

    // Clone first and last slides for infinite loop effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    // Add clones to track
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    // Update track position to show first real slide
    track.style.transform = `translateX(-100%)`;

    // Update carousel position
    function updateCarousel(smooth = true) {
        if (!smooth) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.5s ease';
        }

        // Calculate position including the prepended clone
        const translateX = -((currentSlide + 1) * 100);
        track.style.transform = `translateX(${translateX}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Handle transition end for infinite loop
    track.addEventListener('transitionend', () => {
        isTransitioning = false; // 动画结束，允许新的操作

        if (currentSlide === totalSlides) {
            // Just moved to the cloned first slide
            currentSlide = 0;
            updateCarousel(false);
        } else if (currentSlide === -1) {
            // Just moved to the cloned last slide
            currentSlide = totalSlides - 1;
            updateCarousel(false);
        }
    });

    // Next button with debounce
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return; // 如果正在过渡，忽略点击

        isTransitioning = true;
        currentSlide++;
        updateCarousel();
    });

    // Previous button with debounce
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return; // 如果正在过渡，忽略点击

        isTransitioning = true;
        currentSlide--;
        updateCarousel();
    });

    // Dot navigation with debounce
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return; // 如果正在过渡，忽略点击
            if (currentSlide === index) return; // 如果已经在当前页，忽略点击

            isTransitioning = true;
            currentSlide = index;
            updateCarousel();
        });
    });

    // Initialize
    updateCarousel(false);
});