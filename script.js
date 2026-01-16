async function sendMessage() {
  const input = document.getElementById("prompt");
  const messages = document.getElementById("messages");
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `
    <div class="msg user"><b>You</b><br>${text}</div>
  `;

  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  const formatted = data.reply
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/\n/g, "<br>");

  messages.innerHTML += `
    <div class="msg ai"><b>AkinS AI</b><br>${formatted}</div>
  `;

  messages.scrollTop = messages.scrollHeight;
}
