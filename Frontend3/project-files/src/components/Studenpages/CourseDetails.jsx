import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseDetails = ({ match }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course details using the course ID from the URL params
    const courseId = match.params.id;
    axios.get(`http://localhost:5000/courses/${courseId}`)
      .then(res => {
        setCourse(res.data.course);
      })
      .catch(err => console.error(err));
  }, [match.params.id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Course Details</h1>
      <strong>Title:</strong> {course.title}<br />
      <strong>Description:</strong> {course.description}<br />
      <strong>Instructor:</strong> {course.instructor_name}<br />
      <strong>Start Date:</strong> {course.start_date}<br />
      <strong>End Date:</strong> {course.end_date}
    </div>
  );
};

export default CourseDetails;
