const express = require("express");
const router = express.Router();

const {
  getAllHomestays,
  searchHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
} = require("../controllers/stayController");

router.get("/search", searchHomestays);

router.get("/", getAllHomestays);
router.get("/:id", getHomestayById);
router.post("/", createHomestay);
router.put("/:id", updateHomestay);
router.delete("/:id", deleteHomestay);

module.exports = router;