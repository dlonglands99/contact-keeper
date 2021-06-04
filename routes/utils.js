const { validationResult } = require('express-validator');

const validateRequest = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

module.exports = {
    validateRequest: validateRequest,
}