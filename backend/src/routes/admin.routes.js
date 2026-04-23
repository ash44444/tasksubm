const router = require("express").Router();
const ctrl = require("../controllers/admin.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { sellerSchema } = require("../validations/seller.validation");

router.post("/login", ctrl.login);

router.post(
  "/create-seller",
  auth,
  role("admin"),
  validate(sellerSchema),
  ctrl.createSeller,
);

router.get("/sellers", auth, role("admin"), ctrl.getSellers);

module.exports = router;
