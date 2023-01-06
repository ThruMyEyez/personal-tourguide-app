'use strict';

const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res, next) => {});

router.get('/:productId', (req, res, next) => {});

router.get('/:id', (req, res, next) => {});

router.post('/create', (req, res, next) => {});

//??? what i want to do here ???
router.post('/:productId/add-event', (req, res, next) => {});

router.put('/edit/:productId', (req, res, next) => {});

router.put('/edit/:productItemId', (req, res, next) => {});

router.delete('/delete/:id/:productId', (req, res, next) => {});

router.post('/:productId/rating/', (req, res, next) => {});

module.exports = router;
