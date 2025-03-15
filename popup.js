document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("aiResponse", (data) => {
      document.getElementById("response").innerText = data.aiResponse || "Нет ответа.";
  });

  document.getElementById("copyBtn").addEventListener("click", () => {
      const responseText = document.getElementById("response").innerText;
      navigator.clipboard.writeText(responseText).then(() => {
          alert("Ответ скопирован!");
      });
  });

  // Слушаем обновления от background.js или content.js
  chrome.runtime.onMessage.addListener((request) => {
      if (request.action === "updatePopup") {
          chrome.storage.local.get("aiResponse", (data) => {
              document.getElementById("response").innerText = data.aiResponse || "Нет ответа.";
          });
      }
  });
});
