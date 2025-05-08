// const paraphraseService = require('../services/paraphraseService');
//
// const reformulateText = async (req, res) => {
//     const { text } = req.body;
//     if (!text) return res.status(400).json({ error: "Text is required" });
//
//     try {
//         // Delegate the paraphrasing logic to the service
//         const reformulatedText = await paraphraseService.reformulateText(text);
//         res.json({ reformulated: reformulatedText });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "Failed to process the request" });
//     }
// };
//
// module.exports = {
//     reformulateText
// };
const express = require('express');
const { paraphraseText } = require('../services/paraphraseService');
const router = express.Router();

// POST route for paraphrasing text
router.post('/reformulate', async (req, res) => {
    const { text } = req.body;  // Extract text from request body
    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
        // Call the paraphrasing service
        const reformulatedText = await paraphraseText(text);
        return res.json({ reformulated: reformulatedText });
    } catch (error) {
        console.error('Error in paraphrasing:', error);
        return res.status(500).json({ error: 'Failed to process the request' });
    }
});

module.exports = router;
