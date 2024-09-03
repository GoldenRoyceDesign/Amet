document.addEventListener('DOMContentLoaded', function () {
    const contactContainer = document.querySelector('.contactUs');
    const courseInput = document.getElementById('course');

    if (contactContainer && courseInput) {
        // Get the course name from the data attribute
        const courseName = contactContainer.getAttribute('data-course').trim();
        
        // Debug: Log the course name being read
        console.log("Course Name from data-course:", courseName);
        
        // Set the course name into the input and disable it
        courseInput.value = courseName;
        courseInput.disabled = true;
    }
});
