function showMessage(message, isSuccess = false) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.className = isSuccess ? 'text-success' : 'text-danger'; // Bootstrap classes for styling
}

function register(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const form = document.getElementById('discountForm');
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const course = form.querySelector('select[name="course"]').value;

    // Validate input fields
    if (!name || !email || !phone || !course) {
        showMessage("All fields are required.");
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        showMessage("Please enter a valid email address.");
        return;
    }

    // Prepare form data for sending to the server
    const formData = {
        name: name,
        email: email,
        phone: phone,
        course: course
    };

    // Send the form data to the server using fetch
    fetch("special_discount_form.php", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) // Expecting JSON response from server
    .then(data => {
        if (data.success) {
            showMessage("Your form has been submitted successfully!", true); // Show success message
            form.reset(); // Clear the form fields
        } else {
            showMessage(data.error); // Show error message
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showMessage("An error occurred. Please try again.");
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}