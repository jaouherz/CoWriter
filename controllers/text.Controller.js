const ReformulateService = require('../services/geminiService');

class ReformulateController {
    static async reformulateText(req, res, next) {
        try {
            const { text } = req.body;
            const reformattedText = await ReformulateService.reformulateText(text);
            res.json({ result: reformattedText });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReformulateController;
    