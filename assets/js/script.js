// JavaScript for Enterprise Messaging App interactions

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("messageInput");
  const chatMessages = document.getElementById("chatMessages");
  const chatStatus = document.getElementById("chatStatus");

  // Function to send message
  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      const messageElement = createMessageElement(messageText, "sent");
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      messageInput.value = "";
    }
  }

  // Create message element with timestamp
  function createMessageElement(text, type) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", type);

    const messageContent = document.createElement("span");
    messageContent.textContent = text;

    const timestamp = document.createElement("span");
    timestamp.classList.add("timestamp");
    timestamp.textContent = new Date().toLocaleTimeString();

    messageElement.appendChild(messageContent);
    messageElement.appendChild(timestamp);

    return messageElement;
  }

  // Attach sendMessage function to button click
  document
    .querySelector(".chat-input button")
    .addEventListener("click", sendMessage);

  // Send message on Enter key press
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Simulate receiving messages
  function receiveMessage(text) {
    const messageElement = createMessageElement(text, "received");
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Example of receiving a message after a delay
  setTimeout(() => {
    receiveMessage(
      "Welcome to the Enterprise Messaging App! How can I assist you today?"
    );
  }, 2000);

  // Show typing status
  messageInput.addEventListener("input", () => {
    chatStatus.textContent = "User is typing...";
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      chatStatus.textContent = "";
    }, 1000);
  });

  let typingTimeout;

  // Adding functionality for login and registration forms
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginSection = document.getElementById("loginSection");
  const chatSection = document.getElementById("chatSection");

  // Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    if (username !== "" && password !== "") {
      loginSection.style.display = "none";
      chatSection.style.display = "block";
      document.getElementById(
        "userGreeting"
      ).textContent = `Welcome, ${username}!`;
    }
  });

  // Handle Registration
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    if (username.trim() !== "" && password.trim() !== "") {
      alert("Registration successful! Please log in.");
      registerForm.reset();
    }
  });

  // CSS for dynamically added chat messages
  const style = document.createElement("style");
  style.innerHTML = `
        .chat-message {
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #007BFF;
            color: #fff;
            max-width: 70%;
            align-self: flex-end;
            display: inline-block;
            position: relative;
        }
        .received {
            background-color: #e9ecef;
            color: #333;
            align-self: flex-start;
        }
        .chat-messages {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .timestamp {
            font-size: 0.8em;
            color: #ccc;
            position: absolute;
            bottom: -15px;
            right: 0;
        }
        #chatStatus {
            font-style: italic;
            color: #666;
            padding-left: 10px;
        }
    `;
  document.head.appendChild(style);
});

// Adding HTML elements for status
const chatStatusDiv = document.createElement("div");
chatStatusDiv.id = "chatStatus";
document
  .querySelector(".chat-section")
  .insertBefore(chatStatusDiv, document.querySelector(".chat-box"));

// Adding HTML elements for login and registration
const loginSectionHTML = `
    <section id="loginSection" class="login-section">
        <h2>Login</h2>
        <form id="loginForm">
            <label for="loginUsername">Username:</label>
            <input type="text" id="loginUsername" name="username" required>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="password" required>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#" id="showRegister">Register here</a></p>
    </section>

    <section id="registerSection" class="register-section" style="display: none;">
        <h2>Register</h2>
        <form id="registerForm">
            <label for="registerUsername">Username:</label>
            <input type="text" id="registerUsername" name="username" required>
            <label for="registerPassword">Password:</label>
            <input type="password" id="registerPassword" name="password" required>
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="#" id="showLogin">Login here</a></p>
    </section>
`;

document.body.insertAdjacentHTML("afterbegin", loginSectionHTML);

// Toggle between login and register forms
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const registerSection = document.getElementById("registerSection");

showRegister.addEventListener("click", () => {
  loginSection.style.display = "none";
  registerSection.style.display = "block";
});

showLogin.addEventListener("click", () => {
  registerSection.style.display = "none";
  loginSection.style.display = "block";
});

// Handle Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  if (username !== "") {
    loginSection.style.display = "none";
    chatSection.style.display = "block";
    document.getElementById(
      "userGreeting"
    ).textContent = `Welcome, ${username}!`;
  }
});
