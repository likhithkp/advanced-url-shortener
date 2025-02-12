const { createShortUrl } = require("../../services/url/urlServices");
const crypto = require("crypto");

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

const shortenUrl = async (req, res) => {
    const { url } = req.body;

    try {
        if (!url) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "URL missing",
                error: null
            });
        }

        if (!isValidUrl(url)) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Invalid URL format",
                error: null
            });
        }

        const shortCode = crypto.randomBytes(4).toString("hex");
        const newURL = await createShortUrl({ url_code: shortCode, url });

        if (newURL && !newURL.error) {
            return res.status(201).json({
                status: 201,
                data: { shortCode },
                message: "URL shortened successfully",
                error: null
            });
        } else {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request",
                error: newURL?.error || "Unknown error"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: "Error creating short URL", 
            details: error.message 
        });
    }
};

module.exports = shortenUrl;
