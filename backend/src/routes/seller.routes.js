const router = require("express").Router();
const ctrl = require("../controllers/seller.controller");

router.post("/login", ctrl.login);

module.exports = router;
