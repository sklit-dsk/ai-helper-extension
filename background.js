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
        const apiKey = API_KEY;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `Ты отвечаешь на вопросы теста. Давай максимально точные и краткие ответы. 
                - Отвечай только фактическим ответом, без объяснений.
                - Если требуется формула, напиши ее строго по правилам математической записи.
                - Если ответ — число, напиши только число без дополнительных символов.
                - Если варианты ответа включают термины (например, "Канбан", "макрологистика"), выбери наиболее подходящий термин.`,
              },
              { role: "user", content: selectedText }
            ],
            max_tokens: 100,  
            temperature: 0,   
            top_p: 0          
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Ошибка HTTP: ${response.status} - ${errorData.error.message}`);
        }

        const data = await response.json();
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
