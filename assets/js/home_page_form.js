
function register(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const form = document.querySelector('form');
    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const course = document.getElementById('course').value.trim();
    const message = document.getElementById('message').value.trim();

    function showModal(message, isSuccess = false) {
        const modal = document.getElementById("myModal");
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.textContent = message;
        modal.style.display = "flex"; // Use flex to center the modal
        modalMessage.style.color = isSuccess ? "green" : "red";

        document.getElementById("closeModal").addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    if (!name || !lastName || !email || !phone || !course || !message) {
        showModal("All fields are required.");
        return false;
    }

    if (!validateEmail(email)) {
        showModal("Please enter a valid email address.");
        return false;
    }

    const formData = { name, lastName, email, phone, course, message };

    fetch("home_page_form.php", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showModal(data.success, true);
                form.reset();
            } else {
                showModal(data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showModal("Error registering. Please try again later.");
        });

    return false; // Ensure the form doesn't reload the page
}

// Bind the `register` function to the form
document.querySelector('form').addEventListener('submit', register);



