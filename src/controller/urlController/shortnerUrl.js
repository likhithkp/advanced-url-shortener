const redisClient = require("../../../redisClient");
const { createShortUrl } = require("../../services/url/urlServices");
const crypto = require("crypto");

const shortenUrl = async (req, res) => {
    const { url } = req.body;

    try {
        if (!url) {
            return res.status(400).json({ status: 400, message: "URL missing" });
        }

        const cachedShortCode = await redisClient.get(url);
        if (cachedShortCode) {
            return res.status(200).json({ status: 200, shortCode: cachedShortCode, message: "URL already exists" });
        }

        const shortCode = crypto.randomBytes(4).toString("hex");

        await createShortUrl({ url_code: shortCode, url });

        await redisClient.set(url, shortCode, "EX", 3600);

        return res.status(201).json({ status: 201, shortCode, message: "URL shortened successfully" });

    } catch (error) {
        res.status(500).json({ error: "Error creating short URL", details: error.message });
    }
};

module.exports = shortenUrl;
