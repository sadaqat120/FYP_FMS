const express = require("express");
const { sendMessage, trainChatbot } = require("./chatController");

const router = express.Router();

// Route for sending messages
router.post("/", sendMessage);

// Optional: Route to trigger chatbot training (if needed)
router.post("/train", async (req, res) => {
    try {
        await trainChatbot();
        res.status(200).send("Chatbot training completed!");
    } catch (error) {
        res.status(500).send("Error during training: " + error.message);
    }
});

module.exports = router;
