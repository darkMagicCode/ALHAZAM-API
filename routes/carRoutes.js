const express = require('express');
const router = express.Router();
const CarController = require('../controllers/carController.js');

router.get('/', CarController.getAll);
router.get('/:id', CarController.getById);
router.post('/', CarController.create);
router.put('/:id', CarController.update);
router.delete('/:id', CarController.delete);

module.exports = router;
