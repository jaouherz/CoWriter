// const axios = require('axios');
//
// ; // Your Hugging Face API key
// const MAX_CHUNK_SIZE = 500; // Max number of characters per chunk
//
// // Function to split the text into chunks of a specified size
// const chunkText = (text, maxSize) => {
//     const chunks = [];
//     for (let i = 0; i < text.length; i += maxSize) {
//         chunks.push(text.slice(i, i + maxSize));
//     }
//     return chunks;
// };
//
// // Function to reformulate the text (handling chunking)
// const reformulateText = async (text) => {
//     try {
//         const chunks = chunkText(text, MAX_CHUNK_SIZE);
//         const reformulatedChunks = [];
//
//         for (let chunk of chunks) {
//             const response = await axios.post(
//                 "https://api-inference.huggingface.co/models/ramsrigouthamg/t5-large-paraphraser-diverse-high-quality",
//                 { inputs: `paraphrase the following: ${chunk}` },  // Clear instruction for paraphrasing
//                 { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
//             );
//
//             const reformulatedText = response.data[0]?.generated_text || "No reformulation available.";
//             reformulatedChunks.push(reformulatedText);
//         }
//
//         // Combine all reformulated chunks into one text
//         return reformulatedChunks.join(" ");
//     } catch (error) {
//         console.error("Hugging Face API Error:", error.response?.data || error.message);
//         throw new Error("Failed to process the request");
//     }
// };
//
// module.exports = {
//     reformulateText
// };
const axios = require('axios');

const API_URL = 'https://api.apilayer.com/paraphraser';

const paraphraseText = async (text) => {
    try {
        const response = await axios.post(API_URL,
            {
                // Data sent to API
                "text": text
            },
            {
                headers: {
                    "apikey": API_KEY, // Authorization header with API Key
                    "Content-Type": "application/json"
                }
            });

        // Return the paraphrased text
        return response.data.paraphrased || "No paraphrasing available.";
    } catch (error) {
        console.error('Error paraphrasing text:', error.response?.data || error.message);
        throw new Error("Failed to process the request");
    }
};

module.exports = {
    paraphraseText
};
