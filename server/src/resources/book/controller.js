const Book = require("./model");

const logger = require("../../config/logger");

const handleGetBook = async (req, res) => {
  try {
    logger.info("Single book request received");
    const user = req.user;

    const books = await Book.findOne({
      userId: user.id,
      _id: req.params.bookId,
    }).exec();
    res.json(books);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const handleGetAllBook = async (req, res) => {
  try {
    logger.info("All book list request received");
    const user = req.user;

    console.log({ User: user.id });
    const books = await Book.find({ userId: user.id });
    res.json(books);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const handleNewBook = async (req, res) => {
  try {
    logger.info("Book creation request received");
    console.log(req.body);
    const { title, author, category } = req.body;

    const result = await Book.create({
      userId: req.user.id,
      title,
      author,
      category,
    });
    res.status(201).json({
      success: `New Book with title ${result.title} created!`,
      result,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const handleUpdateBook = async (req, res) => {
  try {
    logger.info("Ticket update request received");
    console.log(req.body);
    const { title, author, category, note, status } = req.body;

    // Only include fields that are present
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (author !== undefined) updateData.author = author;
    if (category !== undefined) updateData.category = category;
    if (note !== undefined) updateData.note = note;
    if (status !== undefined) updateData.status = status;

    const result = await Book.findOneAndUpdate(
      { _id: req.params.bookId, userId: req.user.id },
      updateData,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({
      success: `Book updated!`,
      result,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const handleDeleteBook = async (req, res) => {
  try {
    logger.info("Book delete request received");

    const result = await Book.findByIdAndDelete({ _id: req.params.bookId });
    res.json({
      success: `Book deleted!`,
      result,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleGetBook,
  handleGetAllBook,
  handleNewBook,
  handleUpdateBook,
  handleDeleteBook,
};
