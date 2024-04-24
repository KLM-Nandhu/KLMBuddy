// Handle sending messages
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();

    if (message) {
        addMessage(message, 'user-message');
        input.value = '';
        // Placeholder for response simulation
        setTimeout(() => addMessage('Hello! How can I help you?', 'bot-message'), 800);
    }
}

// Add message to chat box
function addMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow message sending with Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
        return false;
    }
    return true;
}
