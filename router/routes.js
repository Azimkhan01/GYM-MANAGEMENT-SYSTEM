const express = require("express");
const { admin } = require("../controller/admin");
const { handleAdmin } = require("../controller/handleAdmin");
const { insert } = require("../controller/insert");
const { handleInsert } = require("../controller/handleInsert");
const { update } = require("../controller/update");
const { handleUpdate } = require("../controller/handleUpdate");
const { remove } = require("../controller/remove");
const { handleRemove } = require("../controller/handleremove");
const { view } = require("../controller/view");
const { handleView } = require("../controller/handleView");
const { dashboard } = require("../controller/dashboard");
const { memberApi } = require("../controller/memberApi");
const router = express.Router();


router.route("/").get(admin);
router.route("/").post(handleAdmin);
router.route("/dashboard").get(dashboard);
router.route("/insert").get(insert);
router.route("/insert").post(handleInsert);
router.route("/update").get(update);
router.route("/update").post(handleUpdate);
router.route("/remove").get(remove);
router.route("/remove").post(handleRemove);
router.route("/member").get(view);
router.route("/member").post(handleView);

router.route("/memberApi").get(memberApi);

module.exports = {router}