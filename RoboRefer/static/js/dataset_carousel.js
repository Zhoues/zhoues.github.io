// Dataset Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('datasetCarouselTrack');
    const prevBtn = document.getElementById('datasetPrevBtn');
    const nextBtn = document.getElementById('datasetNextBtn');
    const dots = document.querySelectorAll('.dataset-carousel-dots .dot');
    const items = document.querySelectorAll('.dataset-carousel-item');

    let currentSlide = 0;
    const totalSlides = items.length;

    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Initialize
    updateCarousel();
});