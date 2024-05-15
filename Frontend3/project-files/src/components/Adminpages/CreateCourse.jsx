import React, { useState } from 'react';
import axios from 'axios';
import './CreateCourse.css';
import Nave from './Nave';
const CreateCourses = () => {
  // State for course creation form
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    instructor_name: '',
    start_date: '',
    end_date: ''
  });

  // State for lesson creation form
  const [lessonFormData, setLessonFormData] = useState({
    title: '',
    content: ''
  });

  // State to store the automatically assigned course ID
  const [courseId, setCourseId] = useState(null);

  // State to track if at least one lesson has been created
  const [lessonCreated, setLessonCreated] = useState(false);

  // Function to handle changes in course creation form
  const handleCourseChange = (e) => {
    setCourseFormData({ ...courseFormData, [e.target.name]: e.target.value });
  };

  // Function to handle changes in lesson creation form
  const handleLessonChange = (e) => {
    setLessonFormData({ ...lessonFormData, [e.target.name]: e.target.value });
  };

  // Function to display alert message
  const showAlert = (message) => {
    alert(message);
  };

  // Function to handle course creation form submission
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/courses', courseFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourseId(response.data.courseId);
      console.log(response.data);
      showAlert("Course created successfully!");
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  // Function to handle lesson creation form submission
  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/lessons', {
        ...lessonFormData,
        courseId: courseId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLessonCreated(true);
      setLessonFormData({ title: '', content: '' }); // Clear lesson form fields
      showAlert("Lesson created successfully!"); // Show alert message
    } catch (error) {
      console.error('Error creating lesson:', error);
    }
  };

  return (
    <div>
      <Nave/>
    <div className='create-course-container'>
      {/* Course creation form */}
      <h2>Create a New Course</h2>
      <form onSubmit={handleCourseSubmit} className='course-form'>
        <input type="text" name="title" placeholder="Title" value={courseFormData.title} onChange={handleCourseChange} />
        <textarea type="text" row='7' cols='50' name="description" placeholder="Description" value={courseFormData.description} onChange={handleCourseChange} />
        <input type="text" name="instructor_name" placeholder="Instructor Name" value={courseFormData.instructor_name} onChange={handleCourseChange} />
        <input type="date" name="start_date" value={courseFormData.start_date} onChange={handleCourseChange} />
        <input type="date" name="end_date" value={courseFormData.end_date} onChange={handleCourseChange} />
        <button type="submit" className='submit-button'>Create Course</button>
      </form>

      {/* Lesson creation form */}
      {courseId && (
        <div>
          <h2>{lessonCreated ? "Add More Lesson" : "Create a New Lesson"}</h2>
          <form onSubmit={handleLessonSubmit} className='course-form'>
            <input type="text" name="title" placeholder="Title" value={lessonFormData.title} onChange={handleLessonChange} />
            <textarea name="content" row='4' placeholder="Content" value={lessonFormData.content} onChange={handleLessonChange}></textarea>
            <button type="submit" className='submit-button'>{lessonCreated ? "Add More Lesson" : "Create Lesson"}</button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default CreateCourses;
