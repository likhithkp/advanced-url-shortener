const redisClient = require("../../../redisClient");
const { getUrlByCode } = require("../../services/url/urlServices");

const getFullUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const cachedUrl = await redisClient.get(shortCode);
        if (cachedUrl) {
            return res.status(200).json({ status: 200, url: cachedUrl, message: "URL retrieved from cache" });
        }

        const urlData = await getUrlByCode({ url_code: shortCode });

        if (!urlData?.url_code) {
            return res.status(404).json({ status: 404, message: "URL not found" });
        }

        await redisClient.set(shortCode, urlData.url, "EX", 3600);

        return res.status(200).json({ status: 200, url: urlData.url, message: "URL retrieved successfully" });

    } catch (error) {
        res.status(500).json({ error: "Error while fetching URL", details: error.message });
    }
};

module.exports = getFullUrl;
