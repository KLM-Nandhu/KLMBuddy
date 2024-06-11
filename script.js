let chatHistory = [];
let historyIndex = 0;

// Handle sending messages
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();

    if (message) {
        addMessage(message, 'user-message');
        input.value = '';
        saveToHistory(message, 'user-message');
        // Placeholder for response simulation
        setTimeout(() => {
            const botResponse = 'Hello! How can I help you?';
            addMessage(botResponse, 'bot-message');
            saveToHistory(botResponse, 'bot-message');
        }, 800);
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

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const chatContainer = document.getElementById('chat-container');
    sidebar.classList.toggle('open');
    chatContainer.classList.toggle('move-left');
}

// Save message to chat history
function saveToHistory(text, className) {
    if (!chatHistory[historyIndex]) {
        chatHistory[historyIndex] = [];
    }
    chatHistory[historyIndex].push({ text, className });
}

// Start a new chat
function startNewChat() {
    const chatBox = document.getElementById('chat-box');
    if (chatHistory[historyIndex] && chatHistory[historyIndex].length > 0) {
        const chatHistoryDiv = document.getElementById('chat-history');
        const historyButton = document.createElement('div');
        historyButton.className = 'history-button';
        historyButton.innerHTML = `
            <span>Chat ${historyIndex + 1}</span>
            <div class="dropdown">
                <button onclick="editChat(${historyIndex})">Edit</button>
                <button onclick="deleteChat(${historyIndex})">Delete</button>
            </div>
        `;
        historyButton.querySelector('span').onclick = () => showChatHistory(historyIndex);
        chatHistoryDiv.appendChild(historyButton);
    }
    chatBox.innerHTML = '';
    historyIndex++;
}

// Show chat history
function showChatHistory(index) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    const selectedHistory = chatHistory[index];
    if (selectedHistory) {
        selectedHistory.forEach(entry => {
            addMessage(entry.text, entry.className);
        });
    }
}

// Edit chat
function editChat(index) {
    // Implement the logic for editing chat history
    alert(`Editing chat ${index + 1}`);
}

// Delete chat
function deleteChat(index) {
    chatHistory.splice(index, 1);
    const chatHistoryDiv = document.getElementById('chat-history');
    chatHistoryDiv.innerHTML = '';
    chatHistory.forEach((_, i) => {
        const historyButton = document.createElement('div');
        historyButton.className = 'history-button';
        historyButton.innerHTML = `
            <span>Chat ${i + 1}</span>
            <div class="dropdown">
                <button onclick="editChat(${i})">Edit</button>
                <button onclick="deleteChat(${i})">Delete</button>
            </div>
        `;
        historyButton.querySelector('span').onclick = () => showChatHistory(i);
        chatHistoryDiv.appendChild(historyButton);
    });
    historyIndex--;
}
