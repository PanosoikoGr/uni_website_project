document.getElementById('logout-button').addEventListener('click', function(e) {
    e.preventDefault();

    fetch('/logout', {
        method: 'POST',
    })
    .then(response => {
        if (response.ok) {
            alert('You have been logged out.');
            window.location.href = 'index.html'; // Redirect to homepage after logout
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
});
