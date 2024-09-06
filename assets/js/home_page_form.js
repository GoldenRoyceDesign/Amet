function register(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const form = document.getElementById('registrationForm');
    const name = form.querySelector('input[name="name"]').value;
    const lastName = form.querySelector('input[name="lastName"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const course = form.querySelector('select[name="course"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

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
    if (!name || !lastName || !email || !phone || !course || !message) {
        showModal("All fields are required.");
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        showModal("Please enter a valid email address.");
        return;
    }

    // Send OTP to the user's email
    fetch("send_otp.php", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showModal('OTP sent successfully. Please check your email.', true);
            document.getElementById('otpSection').style.display = 'block'; // Show OTP input
        } else {
            showModal(data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showModal("Error sending OTP. Please try again later.");
    });
}

function verifyOtp() {
    const enteredOtp = document.getElementById('otp').value;

    fetch("verify_otp.php", {
        method: "POST",
        body: JSON.stringify({ otp: enteredOtp }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Prepare form data for sending to the server
            const form = document.getElementById('registrationForm');
            const name = form.querySelector('input[name="name"]').value;
            const lastName = form.querySelector('input[name="lastName"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const phone = form.querySelector('input[name="phone"]').value;
            const course = form.querySelector('select[name="course"]').value;
            const message = form.querySelector('textarea[name="message"]').value;

            // Send the form data to the server using fetch
            fetch("home_page_form.php", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    course: course,
                    message: message
                }),
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

            document.getElementById('otpSection').style.display = 'none'; // Hide OTP input
        } else {
            showModal(data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showModal("Error verifying OTP. Please try again later.");
    });
}
