document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    function register(event) {
        // Prevent form submission
        event.preventDefault();

        // Get form data
        const form = document.getElementById('registrationForm');
        const formData = new FormData(form);

        // Convert FormData to JSON
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

        // Send form data using fetch
        fetch('home_page_form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message in the modal
                showModal('Your details were submitted successfully!');
                // Reset the form fields
                form.reset();
            } else {
                // Show error message in the modal
                showModal('There was an error. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showModal('There was an error. Please try again.');
        });
    }

    // Function to show modal
    function showModal(message) {
        const modal = document.getElementById('myModal');
        const modalMessage = document.getElementById('modalMessage');
        modalMessage.textContent = message; // Set the modal message
        modal.style.display = 'block'; // Show the modal
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

    // Attach the register function to form submit event
    document.getElementById('registrationForm').addEventListener('submit', register);
});
