import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseEdit from './ExerciseEdit.jsx'; // Import the ExerciseEdit component

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setloading] = useState(true)
  const [newExercise, setNewExercise] = useState({
    name: '',
    duration: 0,
    difficulty: '',
    imageUrl: '', // Add imageUrl property for the image
  });
  const [editExercise, setEditExercise] = useState(null);

  useEffect(() => {
    fetchExercises();
    setloading(false)
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/exercises');
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises: ', error);
    }
  };

  const deleteExercise = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exercises/${id}`);
      fetchExercises(); // Refresh the exercises after deletion
    } catch (error) {
      console.error('Error deleting exercise: ', error);
    }
  };

  const handleInputChange = (e) => {
    setNewExercise({
      ...newExercise,
      [e.target.name]: e.target.value,
    });
  };

  const addExercise = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      await axios.post('http://localhost:5000/api/exercises', newExercise);
      fetchExercises(); // Refresh the exercises after addition
      setNewExercise({
        name: '',
        duration: 0,
        difficulty: '',
        imageUrl: '', // Clear imageUrl after adding the exercise
      });

      // Display alert when a new exercise is added
      window.alert('New exercise added successfully!');
    } catch (error) {
      console.error('Error adding exercise: ', error);
    }
  };

  const updateExercise = (exercise) => {
    setEditExercise(exercise);
  };

  const closeEditForm = () => {
    setEditExercise(null);
  };
  
  if (loading) {
    return <>loading</>
  }

  return (
    <div className="container">
      <h1>Welcome to Our Gym</h1>

      {/* Section 1: Introduction */}
      <section>
        <h2>Experience Fitness Like Never Before</h2>
        <p>
          At Our Gym, we are committed to providing an exceptional fitness experience that goes beyond the ordinary.
          Our state-of-the-art facilities, expert trainers, and diverse range of fitness programs are designed to help
          you achieve your fitness goals and transform your lifestyle.
        </p>
      </section>

      {/* Featured Exercises Section */}
      <section>
        <h2>Featured Exercises</h2>
        <div className="exercises">
          {exercises.map((exercise) => (
            <div key={exercise._id} className="exercise-card">
              <img src={exercise.imageUrl} alt={exercise.name} className="exercise-image" />
              <div className="exercise-details">
                <strong>{exercise.name}</strong>
                <p>Duration: {exercise.duration} min</p>
                <p>Difficulty: {exercise.difficulty}</p>
              </div>
              <div className="button-container">
                <button onClick={() => updateExercise(exercise)}>Update</button>
                <button onClick={() => deleteExercise(exercise._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Exercise Form */}
      <div className="add-exercise-form">
        <h3>Add New Exercise</h3>
        {/* Exercise Edit Form */}
        {editExercise && (
          <ExerciseEdit
            exercise={editExercise}
            onClose={closeEditForm}
            fetchExercises={fetchExercises}
          />
        )}
        <br />
        <form onSubmit={addExercise}>
          <input
            type="text"
            name="name"
            placeholder="Exercise Name"
            value={newExercise.name}
            onChange={handleInputChange}
          />
          <label htmlFor="">Duration:</label>
          <input
            type="number"
            name="duration"
            placeholder="Duration (min)"
            value={newExercise.duration}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="difficulty"
            placeholder="Difficulty"
            value={newExercise.difficulty}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newExercise.imageUrl}
            onChange={handleInputChange}
          />
          <button type="submit">Add Exercise</button>
        </form>
      </div>

      {/* Section 3: Personalized Training */}
      <section>
        <h2>Personalized Training Programs</h2>
        <p>
          Our certified trainers are dedicated to creating personalized training programs tailored to your individual
          needs and fitness levels. Whether you are a beginner or an experienced athlete, we have the expertise to help
          you reach new heights in your fitness journey.
        </p>
      </section>

      {/* Section 4: Group Classes */}
      <section>
        <h2>Group Classes for Every Fitness Enthusiast</h2>
        <p>
          Join our energizing group classes and experience the power of community-driven fitness. From high-intensity
          interval training (HIIT) to yoga and spin classes, our diverse range of group sessions ensures that there's
          something for every fitness enthusiast.
        </p>
      </section>

      {/* Section 5: Contact Us */}
      <section>
        <h2>Contact Us</h2>
        <p>
          Have questions or need more information? Reach out to us! Our friendly team is ready to assist you on your
          fitness journey. Visit our gym or contact us through the form below, and we'll get back to you promptly.
        </p>
        {/* Add a contact form or additional contact information as needed */}
      </section>
    </div>
  );
};

export default Home;
