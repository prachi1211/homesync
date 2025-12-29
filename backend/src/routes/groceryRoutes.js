const express = require("express");
const controller = require("../controllers/groceryController");

const router = express.Router();

router.get("/", controller.getItems);
router.post("/", controller.createItem);
router.patch("/:id", controller.updateItem);
router.delete("/:id", controller.deleteItem);

module.exports = router;
