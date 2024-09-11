
function register(event) {
    event.preventDefault(); // Prevent form submission

    const form = document.getElementById('discountForm');
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage'); // Reference to the message display area

    fetch('special_discount_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Display success message
            formMessage.innerHTML = '<div class="alert alert-success">Your form has been submitted successfully!</div>';
            form.reset(); // Reset the form after successful submission
        } else {
            // Display error message
            formMessage.innerHTML = `<div class="alert alert-danger">${data.error || 'There was an error processing your form. Please try again later.'}</div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display error message
        formMessage.innerHTML = '<div class="alert alert-danger">There was an error processing your form. Please try again later.</div>';
    });
}
