const express = require('express');
const router = express.Router();
const Exercise = require('../models/excercise');

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific exercise
router.get('/:id', getExercise, (req, res) => {
  res.json(res.exercise);
});

// Create a new exercise
router.post('/', async (req, res) => {
  console.log(req.body)
  const exercise = new Exercise({
    name: req.body.name,
    duration: req.body.duration,
    difficulty: req.body.difficulty,
    imageUrl: req.body.imageUrl, // Add imageUrl field
  });

  try {
    const newExercise = await exercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an exercise
router.patch('/:id', async (req, res) => {
  
  try {
    // console.log(req.body);
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        duration: req.body.duration,
        difficulty: req.body.difficulty,
        imageUrl: req.body.imageUrl,
      },
      { new: true }
    );

    res.json(updatedExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete an exercise
router.delete('/:id', async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json({ message: 'Exercise deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get an exercise by ID
async function getExercise(req, res, next) {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (exercise == null) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.exercise = exercise;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// ... (Previous code remains unchanged)

// Get a specific exercise
router.get('/:id', getExercise, (req, res) => {
  res.json(res.exercise);
});

// ... (Remaining CRUD operations remain unchanged)


module.exports = router;
