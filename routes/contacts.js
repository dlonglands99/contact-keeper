const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

const Contact = require("../models/Contact");
const { validateRequest } = require("./utils");

// @route   GET api/contacts
// @desc    Get all contacts for a given user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Please provide a contact name").not().isEmpty()]],
  async (req, res) => {
    const { name, email, phone, type } = req.body;
    const userId = req.user.id;
    validateRequest(req, res);

    try {
      const contact = new Contact({ userId, name, email, phone, type });

      await contact.save();
      res.json(contact);
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update existing contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const userId = req.user.id;
  validateRequest(req, res);

  let contactDetails = {};
  if (name) contactDetails.name = name;
  if (email) contactDetails.email = email;
  if (phone) contactDetails.phone = phone;
  if (type) contactDetails.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found." });

    // Make sure user owns contact
    if (contact.userId.toString() !== userId) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactDetails },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete existing contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    let contact = await Contact.findById(req.params.id);

    if (contact.userId.toString() !== userId) {
      return res.status(401).send("Not authorized");
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact Deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
