const { GoogleGenAI } = require("@google/genai")

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

exports.generateAIResponse = async (messages, file = null) => {
  try {

    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }))

    /*
    ADD FILE
    */
    if (file) {

      const uploadedFile = await genAI.files.upload({
        file: file.path,
        config: { mimeType: file.mimetype }
      })

      console.log("Uploaded file:", uploadedFile)

      contents.push({
        role: "user",
        parts: [
          createPartFromUri(uploadedFile.uri, uploadedFile.mimeType)
        ]
      })
    }

    /*
    GENERATE RESPONSE
    */

    const result = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents
    })

    return result.text

  } catch (error) {
    console.error("Gemini Error:", error)
    return error.message || "An error occurred while generating the response."
  }
}

exports.generateTitle = async (firstMessage) => {
  const prompt = `
Generate a short title (max 6 words) for this conversation.

Message:
${firstMessage}

Rules:
- No quotes
- No punctuation
- Just the title
`

  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  })

  return response.text.trim()
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

exports.generateFakeResponse = async (messages) => {
  await delay(1200)

  const lastMessage = messages[messages.length - 1]?.content || ""

  return `**React** (also known as React.js or ReactJS) is a popular, open-source JavaScript **library** used for building user interfaces (UIs), specifically for single-page applications.

It was developed by **Meta** (formerly Facebook) in 2013 and is currently maintained by Meta and a vast community of individual developers and companies.

Here is a breakdown of what makes React unique and why it is so widely used:

---

### 1. Component-Based Architecture
React’s core philosophy is that everything is a **component**. Think of components like LEGO bricks. You build small pieces (like a button, a search bar, or a profile card) and combine them to create complex applications.
* **Reusability:** You can write a component once and use it in multiple places.
* **Maintenance:** Since the UI is split into independent parts, it is much easier to debug and update.

### 2. Declarative UI
In "Imperative" programming (like standard JavaScript/jQuery), you have to tell the browser exactly *how* to change the UI step-by-step. 
In React, you use a **Declarative** approach. You describe **what** the UI should look like based on the current "state," and React takes care of updating the DOM (Document Object Model) to match that state.

### 3. Virtual DOM (The Speed Factor)
Updating the actual browser DOM is slow. React solves this by using a **Virtual DOM**:
1. When data changes, React creates a lightweight copy of the UI in memory (the Virtual DOM).
2. It compares that copy with the previous version (a process called "diffing").
3. It calculates the most efficient way to update the real browser DOM.
4. **Result:** It only updates the specific parts that changed, making the app very fast.

### 4. JSX (JavaScript XML)
React uses a syntax called **JSX**, which looks like HTML but lives inside JavaScript. It makes the code easier to write and read.
* *Example:* const element = <h1>Hello, world!</h1>;

### 5. Unidirectional Data Flow
In React, data flows in one direction: from parent components down to child components (via "props"). This makes the application more predictable and easier to debug because you always know where the data is coming from.

---

### Why should you use React?
* **Huge Job Market:** It is currently the most in-demand front-end library in the tech industry.
* **Strong Ecosystem:** There are thousands of ready-to-use libraries for things like routing (React Router), state management (Redux or Zustand), and styling.
* **React Native:** Once you learn React, you can use **React Native** to build mobile apps for iOS and Android using the same concepts.
* **SEO Friendly:** With frameworks like **Next.js** (built on top of React), you can easily create websites that are optimized for search engines.

### Summary
If you are building a modern web application where the data changes frequently (like Facebook, Instagram, Netflix, or Airbnb), **React** is the standard tool for creating a fast, modular, and scalable user interface.`
}

exports.generateFakeTitle = async (firstMessage) => {
  const words = firstMessage.split(" ").slice(0, 5)
  return words.join(" ")
}