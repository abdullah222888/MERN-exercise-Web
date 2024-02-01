import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExerciseEdit = ({ exercise, onClose, fetchExercises }) => {
  const [updatedExercise, setUpdatedExercise] = useState({
    name: '',
    duration: 0,
    difficulty: '',
    imageUrl: '', // Add imageUrl field
  });

  useEffect(() => {
    setUpdatedExercise({
      name: exercise.name,
      duration: exercise.duration,
      difficulty: exercise.difficulty,
      imageUrl: exercise.imageUrl,
    });
  }, [exercise]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
  };

  const handleUpdate = async() => {
    try {
      // console.log(updatedExercise);
      await axios.patch(`http://localhost:5000/api/exercises/${exercise._id}`, updatedExercise);
      onClose(); // Close the edit form
      alert('Exercise updated successfully!');
    } catch (error) {
      // console.log(updatedExercise);
      console.error('Error updating exercise:', error);
      alert('Failed to update exercise. Please try again.');
    }
    fetchExercises(); 
  };

  return (
    <div className="exercise-edit-overlay">
      <div className="exercise-edit-container">
        <h2>Edit Exercise</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedExercise.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Duration (min):</label>
          <input
            type="number"
            name="duration"
            value={updatedExercise.duration}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <input
            type="text"
            name="difficulty"
            value={updatedExercise.difficulty}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={updatedExercise.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container">
          <button onClick={handleUpdate}>Update Exercise</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseEdit;
