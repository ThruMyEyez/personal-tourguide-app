'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {});
router.get('/:id', (req, res, next) => {});
router.put('/edit/:id', (req, res, next) => {});
router.delete('/delete/:id', (req, res, next) => {});

module.exports = router;
