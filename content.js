console.log("✅ content.js загружен!"); // Лог при загрузке

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📩 Получено сообщение в content.js:", request);

  if (request.action === "sendToAI" && request.text) {
    console.log("🚀 Отправляем текст в API:", request.text);
    fetchAIResponse(request.text);
    sendResponse({ status: "OK" });
  }
  return true;
});




async function fetchAIResponse(text) {
  console.log("Отправляем текст в API:", text);

  const apiKey = "D1Z4W8htCRGSG73JuLMKZtIzQOzzZjuFl7kWcphJ"; // Замени на свой ключ Cohere
  const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          model: "command",
          prompt: text,
          max_tokens: 100
      })
  });

  const data = await response.json();
  console.log("Ответ API:", data);

  if (data.generations && data.generations.length > 0) {
      const answer = data.generations[0].text;
      
      // Сохраняем ответ
      chrome.storage.local.set({ aiResponse: request.answer }, () => {
          console.log("Ответ сохранён в хранилище.");
          chrome.action.openPopup(); // Открываем popup
      });
  } else {
      alert("Ошибка API или пустой ответ.");
  }
}

