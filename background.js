import API_KEY from "./config.js";
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToChatGPT",
    title: "Отправить в ChatGPT",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "sendToChatGPT") {
    const selectedText = info.selectionText;
    if (selectedText) {
      try {
        const apiKey = API_KEY; // 🔥 Замени на свой API-ключ

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "Дай только конечный числовой ответ. Не используй формулы, степени или символы вроде ×, ^ или 10^." },
              { role: "user", content: selectedText }
            ],
            max_tokens: 10,
            temperature: 0.1
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Ошибка HTTP: ${response.status} - ${errorData.error.message}`);
        }

        const data = await response.json();
        console.log("Ответ от OpenAI API:", data);

        const reply = data.choices?.[0]?.message?.content?.trim() || "Ответ не получен";

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: showAlert,
          args: [reply],
        });
      } catch (error) {
        console.error("Ошибка при запросе к OpenAI:", error);
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: showAlert,
          args: [`Ошибка: ${error.message}`],
        });
      }
    }
  }
});

function showAlert(message) {
  alert("Ответ ИИ: " + message);
}
