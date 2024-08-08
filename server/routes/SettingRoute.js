const express = require("express");
const router = express.Router();
const SettingData = require("../controller/Setting");

router.route("/getsettingdata").get(SettingData.getSettingData);
router.route("/addsettingdata").post(SettingData.addSettingData);
router.route("/deletesetting/:id").delete(SettingData.deleteSetting);

module.exports = router;