

const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');



router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({ msg: 'Tour not found' });
        }

        res.json(tour);
    } catch (err) {
        console.error(err.message);
        
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tour not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
});



module.exports = router;