function register() {
    const form = document.querySelector('form');
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    const message = document.getElementById('message').value;
    const phone = document.getElementById('phone').value;

    // Function to show modal with success or error message
    function showModal(message, isSuccess = false) {
        const modal = document.getElementById("myModal");
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.textContent = message;
        modal.style.display = "block";
        modalMessage.style.color = isSuccess ? "green" : "red";
        document.getElementById("closeModal").addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Function to validate email format
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Check if all fields are filled
    if (!name || !lastName || !email || !course || !message || !phone) {
        showModal("All fields are required.");
        return false;
    }

    // Validate email format
    if (!validateEmail(email)) {
        showModal("Please enter a valid email address.");
        return false;
    }

    // Create an object with form data
    const formData = { name, lastName, email, course, message, phone };

    // Send form data to the server using fetch
    fetch("home_page_form.php", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showModal(data.success, true);
            form.reset(); // Reset the form fields
        } else {
            showModal(data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showModal("Error registering. Please try again later.");
    });

    return false; // Prevent form from submitting traditionally
}
