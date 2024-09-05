function register() {
    const form = document.querySelector('form');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const subject = document.getElementById('subject').value;

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

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    if (!name || !email || !contact || !subject) {
        showModal("All fields are required.");
        return false;
    }

    if (!validateEmail(email)) {
        showModal("Please enter a valid email address.");
        return false;
    }

    const formData = { name, email, contact, subject };

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

    return false; // Prevent form from submitting traditionally
}
