const express = require("express");
const { shortenUrl, getFullUrl } = require("../../controller");
const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:shortCode", getFullUrl);

module.exports = router;