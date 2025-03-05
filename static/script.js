async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chatBox");

    if (userInput.trim() === "") {
        return; // Prevent sending empty messages
    }

    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput })
    })
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
        console.log("🔍 API Response:", data); // Debugging
        if (data.reply) {
            chatBox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
            chatBox.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
        } else {
            chatBox.innerHTML += `<p><b>Bot:</b> ⚠️ Unexpected response format</p>`;
        }
    })
    .catch(error => {
        console.error("⚠️ Error:", error);
        chatBox.innerHTML += `<p><b>Bot:</b> ❌ Server error</p>`;
    });

    document.getElementById("userInput").value = ""; // Clear input field
}
