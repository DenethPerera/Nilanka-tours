const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth'); // Import Auth Middleware

// @route   GET /api/reviews
// @desc    Get all APPROVED reviews (Public for Testimonials Component)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/reviews/admin
// @desc    Get ALL reviews (Private - Admin Dashboard)
router.get('/admin', auth, async (req, res) => {
    try {
      const reviews = await Review.find().sort({ date: -1 }); // Returns pending & approved
      res.json(reviews);
    } catch (err) {
      res.status(500).send('Server Error');
    }
});

// @route   PATCH /api/reviews/:id/approve
// @desc    Approve a review (Private - Admin Only)
router.patch('/:id/approve', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review) return res.status(404).json({ msg: 'Review not found' });

        review.isApproved = true;
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review (Private - Admin Only)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Review removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/reviews
// @desc    Submit a review (Public - Requires Booking ID)
router.post('/', async (req, res) => {
  const { bookingId, rating, comment } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: 'Invalid Booking ID.' });
    }

    // Optional: Check status
    // if (booking.status !== 'Confirmed') return res.status(400).json({ msg: 'Tour not confirmed.' });

    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({ msg: 'Review already submitted for this booking.' });
    }

    const newReview = new Review({
      bookingId,
      customerName: booking.customerName,
      rating,
      comment
    });

    await newReview.save();
    res.json({ msg: 'Review submitted for approval.' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;