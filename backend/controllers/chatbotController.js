const axios = require('axios');

const chatbot = async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Question is required" });

    try {
        const response = await axios.post(
            'https://api.cohere.ai/v1/chat',
            {
                message: question,
                chat_history: [],
                connectors: [],
                temperature: 0.5
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const answer = response.data.text;
        res.status(200).json({ answer });
    } catch (error) {
        res.status(500).json({ message: "Failed to generate response", error: error.response?.data || error.message });
    }
};

module.exports = { chatbot };
