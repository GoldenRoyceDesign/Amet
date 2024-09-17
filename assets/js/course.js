document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    function register(event) {
        // Prevent form submission
        event.preventDefault();

        // Get form data
        const form = document.getElementById('courseRegisterForm');
        const courseInput = document.getElementById('course');
        const indosNumber = document.getElementById('indosNumber').value;

        // Validate INDoS Number format
        const indosPattern = /^[A-Z0-9]{8}$/; // 8 alphanumeric characters
        if (!indosPattern.test(indosNumber)) {
            showModal('INDoS Number must be 8 alphanumeric characters', 'error');
            return; // Stop form submission if validation fails
        }

        // Temporarily enable the course input field for form submission
        courseInput.disabled = false;

        // Get form data and convert it to JSON
        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

        // Log JSON data for debugging
        console.log('Sending data:', jsonData);

        // Send form data using fetch
        fetch('/course.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message in the modal
                showModal(data.success, 'success');
                // Reset the form fields
                form.reset();
                // Re-disable the course input field
                courseInput.disabled = true;
            } else {
                // Show error message in the modal
                showModal(data.error, 'error');
                // Re-disable the course input field
                courseInput.disabled = true;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showModal('There was an error. Please try again.', 'error');
            // Re-disable the course input field
            courseInput.disabled = true;
        });
    }

    // Function to show modal
    function showModal(message, type) {
        const modal = document.getElementById('myModal');
        const modalMessage = document.getElementById('modalMessage');
        
        // Set the modal message text
        modalMessage.textContent = message;

        // Apply styles based on message type
        if (type === 'success') {
            modalMessage.style.color = 'green'; // Success message in green
        } else if (type === 'error') {
            modalMessage.style.color = 'red'; // Error message in red
        } else {
            modalMessage.style.color = 'black'; // Default color
        }

        // Show the modal
        modal.style.display = 'block';
    }

    // Function to close modal
    document.getElementById('closeModal').onclick = function () {
        document.getElementById('myModal').style.display = 'none'; // Hide the modal
    };

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        const modal = document.getElementById('myModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Set the course input value from data-course attribute
    const courseInput = document.getElementById('course');
    const courseData = document.querySelector('.contactUs').getAttribute('data-course');
    if (courseInput && courseData) {
        courseInput.value = courseData;
    }

    // Attach the register function to form submit event
    document.getElementById('courseRegisterForm').addEventListener('submit', register);
});
