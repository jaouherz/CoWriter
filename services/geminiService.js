const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI; // Declare genAI at the module level

class ReformulateService {
    static async initialize() {
        if (!genAI) {
            try {
                genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            } catch (error) {
                console.error("Failed to initialize Gemini API:", error);
                throw new Error("Failed to initialize Gemini API. Check your API key and environment.");
            }
        }
    }
    static formatTextForJSON(text) {
        // Convert the text to be JSON safe by escaping newlines and special characters
        return text.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    }

    static async reformulateText(text) {

        const formattedText = ReformulateService.formatTextForJSON(text);
        const prompt = `
Please correct and reformulate the following text. This includes fixing grammar, spelling, punctuation, and sentence structure, while preserving the original meaning and length. 
    Do not remove or shorten any part of the text. Return only the corrected and reformulated version, without any explanations:\n\n"${formattedText}"
    `;        try {
            await ReformulateService.initialize(); // Ensure genAI is initialized
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });            const result = await model.generateContent(prompt);
            const response = await result.response;
            const reformattedText = response.candidates[0].content.parts[0].text;
            const originalFormattedText = reformattedText.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
            return originalFormattedText;
        } catch (error) {
            console.error("Error in ReformulateService:", error);
            throw new Error("Failed to reformulate text: " + error.message);
        }
    }
}

module.exports = ReformulateService;
