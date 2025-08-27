// src/services/chatService.js
import { geminiService } from "./GeminiService.js";

export async function chatWithModel(provider, userMessage) {
  try {
    let response;

    // ✅ Hardcoded responses
    const normalizedMsg = userMessage.trim().toLowerCase();
    if (normalizedMsg === "hi" || normalizedMsg === "hello") {
      return "👋 Hi there! I'm Dr. Zypher, your AI Financial Therapist. How are you feeling about your finances today?";
    }
    if (normalizedMsg === "thank you" || normalizedMsg === "thanks") {
      return "🙏 You're most welcome! I'm glad I could help. Remember, small consistent steps make a big financial difference!";
    }

    if (provider === "gemini") {
      response = await callGemini(userMessage);

      if (
        response &&
        response.candidates &&
        response.candidates.length > 0 &&
        response.candidates[0].content &&
        response.candidates[0].content.parts &&
        response.candidates[0].content.parts.length > 0
      ) {
        // ✅ Extract Gemini text safely
        return response.candidates[0].content.parts[0].text;
      } else {
        console.warn("⚠️ Gemini returned unexpected response:", response);
        return "Gemini didn’t return a valid answer, please try again.";
      }
    }

    return "❌ Unknown provider selected. Use 'gemini'.";

  } catch (err) {
    console.error("🔥 Error in chatWithModel:", err);
    return "Something went wrong while fetching response.";
  }
}
