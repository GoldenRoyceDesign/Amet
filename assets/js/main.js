// Function to animate the counters
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 80; // Adjust the speed of the counter

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 30); // Adjust timing for smoother animation
            } else {
                counter.innerText = target + (target === 40 ? '+' : '');
            }
        };

        updateCount();
    });

    const carouselWrapper = document.getElementById('carouselWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const itemWidth = document.querySelector('.carousel-card').offsetWidth + 15; // Width of cards including margin
    const visibleItems = Math.floor(carouselWrapper.parentElement.clientWidth / itemWidth); // Number of visible items
    let scrollAmount = 0;

    prevBtn.addEventListener('click', function () {
        scrollAmount -= itemWidth * visibleItems;
        if (scrollAmount < 0) scrollAmount = 0; // Prevent scrolling beyond the start
        carouselWrapper.style.transform = `translateX(-${scrollAmount}px)`;
    });

    nextBtn.addEventListener('click', function () {
        const maxScroll = carouselWrapper.scrollWidth - carouselWrapper.clientWidth;
        scrollAmount += itemWidth * visibleItems;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll; // Prevent scrolling beyond the end
        carouselWrapper.style.transform = `translateX(-${scrollAmount}px)`;
    });


    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    videoModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Button that triggered the modal
        const videoId = button.getAttribute('data-video'); // Extract info from data-video attribute
        const videoSrc = `https://www.youtube.com/embed/${videoId}`; // Create YouTube embed URL

        // Update the iframe src to show the video
        modalVideo.src = videoSrc;
    });

    // Stop video playback when the modal is closed
    videoModal.addEventListener('hide.bs.modal', function () {
        modalVideo.src = ''; // Clear the src to stop the video
    });

});


// document.getElementById('discountForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Simulate form processing logic (e.g., an AJAX request)
//     setTimeout(function () {
//         // Close the discount modal
//         var discountModal = bootstrap.Modal.getInstance(document.getElementById('discountModal'));
//         discountModal.hide();

//         // Reset the form fields
//         document.getElementById('discountForm').reset();

//         // Show the success modal
//         var successModal = new bootstrap.Modal(document.getElementById('successModal'));
//         successModal.show();
//     }, 500); // Simulated delay for form processing
// });