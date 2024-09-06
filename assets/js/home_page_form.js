function register(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const form = document.getElementById('registrationForm');
    const name = form.querySelector('input[name="name"]').value;
    const lastName = form.querySelector('input[name="lastName"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const course = form.querySelector('select[name="course"]').value;
    const message = form.querySelector('textarea[name="message"]').value;
    const otp = form.querySelector('input[name="otp"]').value;

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
        closeModalButton.onclick = function () {
            modal.style.display = "none";
        };
    }

    // Function to validate email format
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Validate input fields
    if (!name || !lastName || !email || !phone || !course || !message || !otp) {
        showModal("All fields are required.");
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        showModal("Please enter a valid email address.");
        return;
    }

    // Verify OTP
    fetch("verify_otp.php", {
        method: "POST",
        body: JSON.stringify({ otp: otp }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Prepare form data for sending to the server
            const formData = {
                name: name,
                lastName: lastName,
                email: email,
                phone: phone,
                course: course,
                message: message
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
        } else {
            showModal(data.error); // Show OTP error message
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showModal("Error verifying OTP. Please try again later.");
    });
}

// Function to handle OTP sending
function sendOtp() {
    const phoneInput = document.querySelector('input[name="phone"]').value;

    fetch("send_otp.php", {
        method: "POST",
        body: JSON.stringify({ phone: phoneInput }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showModal("OTP sent to your phone number. Please enter it to proceed.", true);
        } else {
            showModal(data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showModal("Error sending OTP. Please try again later.");
    });
}

// Add an event listener to send OTP when phone input loses focus or another appropriate event
document.querySelector('input[name="phone"]').addEventListener('blur', sendOtp);
