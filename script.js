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
    const historyButton = document.getElementById('history-button');
    const resetButton = document.getElementById('reset-button');
    const attachFilesButton = document.getElementById('attach-files-button');
    const attachMetadataButton = document.getElementById('attach-metadata-button');

    sidebar.classList.toggle('open');
    chatContainer.classList.toggle('move-left');
    historyButton.classList.toggle('hidden');
    resetButton.classList.toggle('move-left');
    attachFilesButton.classList.toggle('move-left');
    attachMetadataButton.classList.toggle('move-left');
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
    saveCurrentChat();
    clearChat();
}

// Save the current chat
function saveCurrentChat() {
    const chatBox = document.getElementById('chat-box');
    if (chatHistory[historyIndex] && chatHistory[historyIndex].length > 0) {
        const chatHistoryDiv = document.getElementById('chat-history');
        const historyButton = document.createElement('div');
        historyButton.className = 'history-button';
        historyButton.innerHTML = `
            <span>Chat ${historyIndex + 1}</span>
            <button class="dropdown-button" onclick="toggleDropdown(${historyIndex})">...</button>
            <div class="dropdown" id="dropdown-${historyIndex}">
                <button onclick="editChat(${historyIndex})">Edit</button>
                <button onclick="deleteChat(${historyIndex})">Delete</button>
            </div>
        `;
        historyButton.querySelector('span').onclick = () => showChatHistory(historyIndex);
        chatHistoryDiv.appendChild(historyButton);
        historyIndex++;
    }
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

// Toggle dropdown
function toggleDropdown(index) {
    const dropdown = document.getElementById(`dropdown-${index}`);
    dropdown.classList.toggle('show');
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
            <button class="dropdown-button" onclick="toggleDropdown(${i})">...</button>
            <div class="dropdown" id="dropdown-${i}">
                <button onclick="editChat(${i})">Edit</button>
                <button onclick="deleteChat(${i})">Delete</button>
            </div>
        `;
        historyButton.querySelector('span').onclick = () => showChatHistory(i);
        chatHistoryDiv.appendChild(historyButton);
    });
    historyIndex--;
}

// Reset chat without deleting chat history
function resetChat() {
    clearChat();
    document.getElementById('uploaded-files-list').innerHTML = '';
    document.getElementById('uploaded-metadata-list').innerHTML = '';
    document.getElementById('uploaded-files-container').style.display = 'none';
    document.getElementById('uploaded-metadata-container').style.display = 'none';
}

function clearChat() {
    document.getElementById('chat-box').innerHTML = '';
}

// Handle file upload
function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    const uploadedFilesList = document.getElementById('uploaded-files-list');
    const uploadedFilesContainer = document.getElementById('uploaded-files-container');
    uploadedFilesContainer.style.display = 'block';

    displayFiles(files, uploadedFilesList, 'file-pagination');
}

// Handle metadata file upload
function handleMetadataUpload(event) {
    const files = Array.from(event.target.files);
    const uploadedMetadataList = document.getElementById('uploaded-metadata-list');
    const uploadedMetadataContainer = document.getElementById('uploaded-metadata-container');
    uploadedMetadataContainer.style.display = 'block';

    displayFiles(files, uploadedMetadataList, 'metadata-pagination');
}

// Display files with pagination
function displayFiles(files, container, paginationId) {
    container.innerHTML = '';
    const pagination = document.getElementById(paginationId);
    pagination.style.display = 'block';

    const itemsPerPage = 5;
    const pages = Math.ceil(files.length / itemsPerPage);

    let currentPage = 1;

    function renderPage(page) {
        container.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        files.slice(start, end).forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            container.appendChild(listItem);
        });
    }

    function updatePagination() {
        pagination.innerHTML = '';
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = () => {
            currentPage--;
            renderPage(currentPage);
            updatePagination();
        };
        pagination.appendChild(prevButton);

        for (let i = 1; i <= pages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.disabled = i === currentPage;
            pageButton.onclick = () => {
                currentPage = i;
                renderPage(currentPage);
                updatePagination();
            };
            pagination.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.disabled = currentPage === pages;
        nextButton.onclick = () => {
            currentPage++;
            renderPage(currentPage);
            updatePagination();
        };
        pagination.appendChild(nextButton);
    }

    renderPage(currentPage);
    updatePagination();
}
