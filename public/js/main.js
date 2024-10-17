// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a, .cta-btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default anchor behavior
        e.preventDefault();

        // Scroll to the section smoothly
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Contact Form Submission and Message Storage
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const errorMessage = document.getElementById('form-error');

    // Basic validation checks
    if (name === "") {
        errorMessage.textContent = "Please enter your name.";
        errorMessage.style.display = "block";
    } else if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.style.display = "block";
    } else if (message === "") {
        errorMessage.textContent = "Please enter your message.";
        errorMessage.style.display = "block";
    } else {
        // Send message to the server
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("Your message has been sent successfully!");
            document.getElementById('contact-form').reset();
            errorMessage.style.display = "none";
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("There was an error sending your message. Please try again.");
        });
    }
});
