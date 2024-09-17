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
    
    // Handle mouse wheel scrolling
    carouselWrapper.addEventListener('wheel', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior
    
        // Calculate scroll direction and amount
        const delta = Math.sign(event.deltaY); // -1 for scrolling up, 1 for scrolling down
    
        // Scroll left if the user scrolls up, right if down
        scrollAmount += itemWidth * visibleItems * delta;
    
        // Prevent scrolling beyond the start or end
        const maxScroll = carouselWrapper.scrollWidth - carouselWrapper.clientWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    
        // Apply the transform to scroll
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


// document.getElementById('searchCoursesInput').addEventListener('keyup', function() {
//     var filter = this.value.toUpperCase();
//     var dropdownItems = document.querySelectorAll('#coursesDropdownMenu .dropdown-item');

//     dropdownItems.forEach(function(item) {
//         var text = item.textContent || item.innerText;
//         item.style.display = text.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
//     });
// });

// // Open modal when search icon is clicked
// document.getElementById("searchIcon").onclick = function () {
//     const modal = document.getElementById("searchModal");
//     modal.style.top = "15%"; // Slide down from the top
// };

// // Close modal when close button is clicked
// document.getElementById("closeSearch").onclick = function () {
//     const modal = document.getElementById("searchModal");
//     modal.style.top = "-100%"; // Slide up and hide
// };

// // Execute search function when the form is submitted
// document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission behavior
//     var searchValue = document.getElementById('searchInput').value.trim();
//     if (searchValue) {
//         // Redirect to search results page with query parameter
//         window.location.href = `search.html?query=${encodeURIComponent(searchValue)}`;
//     }
// });


// Trigger search functionality when the search icon is clicked
document.getElementById('searchIcon').addEventListener('click', function() {
    var searchValue = document.getElementById('searchInput').value.trim();
    if (searchValue) {
        // Redirect to search results page with query parameter
        window.location.href = `search.html?query=${encodeURIComponent(searchValue)}`;
    }
});

// Trigger search functionality when Enter key is pressed in the input field
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        var searchValue = document.getElementById('searchInput').value.trim();
        if (searchValue) {
            // Redirect to search results page with query parameter
            window.location.href = `search.html?query=${encodeURIComponent(searchValue)}`;
        }
    }
});




  
// Video style

document.querySelector('.new-video-button').addEventListener('click', function() {
    // Set the video source when the modal is opened
    document.getElementById('newVideoPlayer').src = "https://drive.google.com/file/d/1tkImJGTgaJdrEW_528MRMWSGGQbOpX7i/preview";
});

document.getElementById('newVideoModal').addEventListener('hide.bs.modal', function () {
    // Reset the video source to stop playback when modal is closed
    document.getElementById('newVideoPlayer').src = "";
});






