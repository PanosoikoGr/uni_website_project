document.addEventListener('DOMContentLoaded', () => {
    // Fetch messages when the page is loaded
    fetch('/api/messages')
        .then(response => response.json())
        .then(data => {
            const messagesContainer = document.getElementById('messages-container');
            const messages = data.messages;

            // Check if messages.txt is empty
            if (messages.trim() === "") {
                messagesContainer.innerHTML = "<p>No messages found.</p>";
            } else {
                // Split the messages by double new lines (as each message is separated by `\n\n`)
                const messagesArray = messages.split('\n\n');

                // Display each message
                messagesArray.forEach((msg, index) => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message');

                    // Format the message and break lines
                    messageElement.innerHTML = `<strong>Message ${index + 1}:</strong><br>${msg.replace(/\n/g, '<br>')}`;
                    
                    messagesContainer.appendChild(messageElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            document.getElementById('messages-container').innerHTML = "<p>There was an error loading the messages.</p>";
        });
});
