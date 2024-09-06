document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return; // Exit if form is not found

    const courseInput = form.querySelector('#course');
    const container = document.querySelector('.contactUs');

    // Set the course value from the data-course attribute
    const courseValue = container ? container.getAttribute('data-course') : '';
    if (courseInput) {
        courseInput.value = courseValue;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Get form values
        const firstName = form.querySelector('#firstName').value;
        const lastName = form.querySelector('#lastName').value;
        const email = form.querySelector('#email').value;
        const phone = form.querySelector('#phone').value;
        const message = form.querySelector('#message').value;
        const course = courseInput ? courseInput.value : '';

        function showModal(message, isSuccess = false) {
            const modal = document.getElementById("myModal");
            const modalMessage = document.getElementById("modalMessage");

            if (modal && modalMessage) {
                modalMessage.textContent = message;
                modal.style.display = "block";

                // Style the message based on success or error
                modalMessage.style.color = isSuccess ? "green" : "red";

                // Close the modal when the user clicks the close button
                const closeModalButton = document.getElementById("closeModal");
                if (closeModalButton) {
                    closeModalButton.onclick = function () {
                        modal.style.display = "none";
                    };
                } else {
                    console.error('Close button element not found.');
                }
            } else {
                console.error('Modal or modalMessage element not found.');
            }
        }

        // Function to validate email format
        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        // Validate input fields
        if (!firstName || !lastName || !email || !phone || !message) {
            showModal("All fields are required.", false);
            return;
        }

        // Validate email
        if (!validateEmail(email)) {
            showModal("Please enter a valid email address.", false);
            return;
        }

        // Prepare form data for sending to the server
        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            message: message,
            course: course
        };

        // Send the form data to the server using fetch
        fetch("course.php", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showModal("Your form has been submitted successfully!", true); // Show success message
                form.reset(); // Clear the form fields
            } else {
                showModal(data.error, false); // Show error message
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showModal("An error occurred. Please try again.", false);
        });
    });
});
