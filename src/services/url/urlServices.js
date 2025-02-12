const { urls } = require("../../../models");

async function createShortUrl(dataToInsert) {
    try {
        return await urls.create(dataToInsert);
    } catch (error) {
        return {
            message: "Error while creating short URL.",
            error: error.message,
        };
    }
}

async function getUrlByCode(data) {
    try {
        const urlData = await urls.findOne({
            where: data,
        });

        if (!urlData) {
            return null;
        }

        return {
            url: urlData.url,
            url_code: urlData.url_code
        };
    } catch (error) {
        return {
            message: "Error fetching URL.",
            error: error.message,
        };
    }
}

async function findUrlByOriginal(originalUrl) {
    try {
        const existingUrl = await urls.findOne({
            where: { url: originalUrl }
        });

        return existingUrl ? existingUrl : null;
    } catch (error) {
        return {
            message: "Error finding URL.",
            error: error.message,
        };
    }
}

module.exports = { createShortUrl, getUrlByCode, findUrlByOriginal };