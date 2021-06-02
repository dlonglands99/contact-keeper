const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all contacts for a given user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get contacts for given user.');
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) => {
    res.send('Add new contact for given user');
});

// @route   PUT api/contacts/:id
// @desc    Update existing contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update existing contact for the given user');
});

// @route   DELETE api/contacts/:id
// @desc    Delete existing contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete existing contact for the given user');
});

module.exports = router;