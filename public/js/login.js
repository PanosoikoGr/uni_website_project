document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            alert('Login successful!');
            window.location.href = 'messages.html'; // Redirect to messages page after login
        } else {
            document.getElementById('error-message').innerText = 'Invalid credentials';
            document.getElementById('error-message').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
});
