function register() {
    const form = document.querySelector('form');
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const contact = form.querySelector('input[name="contact"]').value;
    const subject = form.querySelector('textarea[name="subject"]').value;

    // Function to show modal with a message
    function showModal(message, isSuccess = false) {
        const modal = document.getElementById("myModal");
        const modalMessage = document.getElementById("modalMessage");

        modalMessage.textContent = message;
        modal.style.display = "block";

        // Style the message based on success or error
        if (isSuccess) {
            modalMessage.style.color = "green";
        } else {
            modalMessage.style.color = "red";
        }

        // Close the modal when the user clicks the close button
        const closeModalButton = document.getElementById("closeModal");
        closeModalButton.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }


    // Function to validate email format
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Validate input fields
    if (!name || !email || !contact || !course) {
        showModal("All fields are required.");
        return false; // Prevent form submission
    }

    // Validate email
    if (!validateEmail(email)) {
        showModal("Please enter a valid email address.");
        return false; // Prevent form submission
    }

    // Prepare form data for sending to the server
    const formData = {
        name: name,
        email: email,
        contact: contact,
        subject: subject
    };

    // Send the form data to the server using fetch
    fetch("home_page_form.php", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) // Expecting JSON response from server
    .then(data => {
        if (data.success) {
            showModal(data.success, true); // Show success message in green
        } else {
            showModal(data.error); // Show error message in red
        }
        form.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        showModal("Error registering. Please try again later.");
    });

    // Prevent default form submission
    return false;
}
