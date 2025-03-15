# 🚀 Chrome Extension: ChatGPT Context Menu

This Chrome extension allows you to send selected text to ChatGPT and receive quick responses directly in your browser.

## 📌 Features
✅ Adds a "Send to ChatGPT" option in the context menu (when text is selected).  
✅ Sends the selected text to OpenAI's ChatGPT API.  
✅ Displays the response in a popup alert.  

---

## 🔧 Installation & Setup

### 1️⃣ Get an OpenAI API Key

1. Go to [OpenAI API Keys](https://platform.openai.com/account/api-keys).
2. Create a new API key.
3. Copy it (**it will be shown only once**).

### 2️⃣ Add the API Key to `config.js`

Create a `config.js` file in the root of the project and insert your API key:

```javascript
// config.js
const API_KEY = "sk-..."; // 🔥 Insert your API key here
export default API_KEY;
```

Add `config.js` to `.gitignore` to prevent accidental public uploads:
```
config.js
```

### 3️⃣ Load the Extension in Chrome

1. Open **chrome://extensions/**.
2. Enable **"Developer mode"** (top right corner).
3. Click **"Load unpacked"**.
4. Select the project folder.
5. The extension will now appear in your installed extensions!

---

## 🚀 How to Use?

1️⃣ Select text on a webpage.  
2️⃣ **Right-click** → "Send to ChatGPT".  
3️⃣ Wait for ChatGPT's response, which will appear in an alert window.  

---

## 🛠 Development & Debugging

For testing, open **DevTools** (`F12` → Console) to check logs.  
If there are errors, ensure your API key is valid and **your request limits are not exceeded**.

---

## 📌 Future Improvements
✅ Improved UI for displaying responses.  
✅ Support for saving request history.  
✅ API key configuration through a popup settings page.  

If you have ideas, feel free to fork the repository and submit a PR! 🎉

