import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EnrolledCourses.css'; // Import the CSS file
import Nave from './Nave';



const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/enrollments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrolledCourses(response.data.enrollments);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const handleRemoveEnrollment = async (enrollmentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/enrollments/${enrollmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After successful removal, fetch enrolled courses again to update the list
      fetchEnrolledCourses();
    } catch (error) {
      console.error('Error removing enrollment:', error);
    }
  };

  return (
    <div>
        <Nave/>
    <div className="enrolled-courses-container">
      <h2>Enrolled Courses</h2>
      <ul className="enrolled-courses-list">
        {enrolledCourses.map(course => (
          <li key={course.course_id} className="enrolled-course-item">
            <p>Course ID: {course.course_id}</p>
            <p>Course Name: {course.title}</p> {/* Ensure course.title exists in the response */}
            <p>Instructor: {course.instructor_name}</p>
            <p>Enrollment Date: {course.enrollment_date}</p>
            <Link to={`/Student/courses/${course.course_id}/lessons`}>
              <button>View Lessons</button>
            </Link>
            <button onClick={() => handleRemoveEnrollment(course.enrollment_id)}>Remove Enrollment</button>
          </li>
        ))}
      </ul>
    </div>
    
    </div>
  );
};

export default EnrolledCourses;
