const express = require("express");
const router = express.Router();

const { validateBook } = require("../../middleware/validateRequest");
const bookController = require("./controller");

router.get("/", bookController.handleGetAllBook);
router.get("/:bookId", bookController.handleGetBook);

router.post(
  "/",
   validateBook,
  bookController.handleNewBook
);

router.put(
  "/:bookId",
  bookController.handleUpdateBook
);

router.delete("/:bookId", bookController.handleDeleteBook);

module.exports = router;
