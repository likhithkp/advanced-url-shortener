const { getUrlByCode } = require("../../services/url/urlServices");

const getFullUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const urlData = await getUrlByCode({ url_code: shortCode });

        if (!urlData) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "URL not found.",
                error: null
            });
        }

        return res.status(200).json({
            status: 200,
            data: urlData,
            message: "URL retrieved successfully.",
            error: null
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: "Error while fetching URL", 
            details: error.message 
        });
    }
};

module.exports = getFullUrl;
