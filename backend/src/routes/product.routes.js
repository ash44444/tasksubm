const router = require("express").Router();
const ctrl = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");


router.post("/", auth, ctrl.add);
router.get("/", auth, ctrl.get);
router.get("/:id/pdf", auth, ctrl.getPDF);
router.delete("/:id", auth, ctrl.delete);

module.exports = router;
