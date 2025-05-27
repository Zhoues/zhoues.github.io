// Simulator Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('simulatorCarouselTrack');
    const prevBtn = document.getElementById('simulatorPrevBtn');
    const nextBtn = document.getElementById('simulatorNextBtn');
    const dots = document.querySelectorAll('.simulator-carousel-dots .dot');
    const slides = document.querySelectorAll('.simulator-carousel-slide');

    let currentSlide = 0;
    const totalSlides = slides.length;

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