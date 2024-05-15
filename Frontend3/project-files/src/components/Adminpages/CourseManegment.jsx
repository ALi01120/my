import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseManagement.css';
import Nave from './Nave';
const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelection = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/lessons/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Lessons:', response.data.lessons);
      setLessons(response.data.lessons);
      setSelectedCourse(courseId);
      console.log('Selected Course:', courseId);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleUpdateCourse = async (courseId, updatedCourseData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/courses/${courseId}`, updatedCourseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Course updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Course deleted successfully');
      setCourses(courses.filter(course => course.course_id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdateLesson = async (lessonId, updatedLessonData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/lessons/${lessonId}`, updatedLessonData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Lesson updated successfully');
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/lessons/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Lesson deleted successfully');
      setLessons(lessons.filter(lesson => lesson.lesson_id !== lessonId));
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  return (
    <div>
      <Nave/>
    <div id="course-management-container" className="course-management-container">
    <h1 id="courses-heading">All Courses</h1>
    <table id="course-table" className="course-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Instructor</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.course_id}>
            <td>{course.title}</td>
            <td>{course.instructor_name}</td>
            <td>{course.start_date}</td>
            <td>{course.end_date}</td>
            <td>
              <button className="view-lessons-btn" onClick={() => handleCourseSelection(course.course_id)}>View Lessons</button>
              <button className="update-course-btn" onClick={() => handleUpdateCourse(course.course_id, {/* pass updated course data here */})}>Update</button>
              <button className="delete-course-btn" onClick={() => handleDeleteCourse(course.course_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {selectedCourse && (
      <div id="selected-course-lessons" className="selected-course-lessons">
        <h2 id="lessons-heading">Lessons for Selected Course</h2>
        <ul id="lessons-list" className="lessons-list">
          {lessons.map(lesson => (
            <li key={lesson.lesson_id}>
              {lesson.title}
              <button className="update-lesson-btn" onClick={() => handleUpdateLesson(lesson.lesson_id, {/* pass updated lesson data here */})}>Update</button>
              <button className="delete-lesson-btn" onClick={() => handleDeleteLesson(lesson.lesson_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  </div>
);
};

export default CourseManagement;
