/**
 * Jellyfin Chat Plugin
 * This script adds a chat interface to Jellyfin
 */

// Configuration
const chatServiceUrl = 'http://192.168.4.109:9876';
const chatButtonId = 'jellyfin-chat-button';
const chatFrameId = 'jellyfin-chat-frame';

// Initialize the plugin when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jellyfin Chat Plugin: Initializing');
    
    // Create styles
    const style = document.createElement('style');
    style.textContent = `
        #${chatButtonId} {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #00a4dc;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        #${chatButtonId}:hover {
            transform: scale(1.1);
            background-color: #0085b2;
        }
        
        #${chatButtonId} svg {
            width: 30px;
            height: 30px;
        }
        
        #${chatFrameId} {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            z-index: 999;
            transition: all 0.3s ease;
            transform-origin: bottom right;
            background-color: white;
            opacity: 1;
        }
        
        .chat-hidden {
            transform: scale(0) !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // Create chat button
    const chatButton = document.createElement('div');
    chatButton.id = chatButtonId;
    chatButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;
    document.body.appendChild(chatButton);
    
    // Create chat iframe
    const chatFrame = document.createElement('iframe');
    chatFrame.id = chatFrameId;
    chatFrame.src = `${chatServiceUrl}/chat`;
    chatFrame.classList.add('chat-hidden');
    document.body.appendChild(chatFrame);
    
    // Toggle chat visibility
    let chatVisible = false;
    chatButton.addEventListener('click', function() {
        chatVisible = !chatVisible;
        
        if (chatVisible) {
            chatFrame.classList.remove('chat-hidden');
        } else {
            chatFrame.classList.add('chat-hidden');
        }
    });
    
    console.log('Jellyfin Chat Plugin: Initialized');
});