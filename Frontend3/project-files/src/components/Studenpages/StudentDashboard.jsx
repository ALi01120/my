import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import NotificationList from './NotificationList';
import Nave from './Nave';


const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    instructor: '',
    courseName: ''
  });
  const coursesPerPage = 3;
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

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

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/enrollments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrolledCourses(response.data.enrollments.map(enrollment => enrollment.course_id));
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/enrollments', { course_id: courseId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Course enrolled successfully');
      navigate(`/Student/courses/${courseId}/lessons`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredCourses = currentCourses.filter((course) => {
    const lowerCaseInstructor = course.instructor_name ? course.instructor_name.toLowerCase() : '';
    const lowerCaseCourseName = course.title ? course.title.toLowerCase() : '';
    return (
      lowerCaseInstructor.includes(filters.instructor.toLowerCase()) &&
      lowerCaseCourseName.includes(filters.courseName.toLowerCase())
    );
  });

  return (
    <div>
      <Nave/>
      <div className='start01'>
        <h1>Wlcome to Maritime LMS</h1>
      <header className='header02'>
          <p>
          <h3>Maritime Education</h3>
Maritime education plays a vital role in shaping the future of the maritime industry. At Maritime Education System, we are committed to providing high-quality education and training to aspiring maritime professionals.

Explore our courses and start your journey towards a rewarding career at sea.</p>
      </header>
      
        <div className="filters01">
          <h3>Filters</h3>
          <label>
            Search By Instructor:
            <input type="text" name="instructor" value={filters.instructor} onChange={handleFilterChange} />
          </label>
          <label>
            Search By Course Name:
            <input type="text" name="courseName" value={filters.courseName} onChange={handleFilterChange} />
          </label>
        </div>
        <h2 id='hed01'>Popler Course</h2>
        <div className='view-courses-container01'>
       
        <ul className='ul01'>
          {filteredCourses.map((course) => (
            <li key={course.course_id} className="course-card01">
              <div>
                <strong>{course.title}</strong>
                <p>Instructor: {course.instructor_name}</p>
                <p>Start Date: {course.start_date}</p>
                <p>End Date: {course.end_date}</p>
                <button onClick={() => handleViewDetails(course)}>View Details</button>
                {!enrolledCourses.includes(course.course_id) && ( // Check if course is not enrolled
                  <button onClick={() => handleEnroll(course.course_id)}>Enroll</button>
                )}
              </div>
            </li>
          ))}

        </ul>
            
        {showModal && (
          <div className="modal01">
            <div className="modal-content01">
              <span className="close01" onClick={closeModal}>&times;</span>
              <h2>{selectedCourse.title}</h2>
              <p>Instructor: {selectedCourse.instructor_name}</p>
              <p>Start Date: {selectedCourse.start_date}</p>
              <p>End Date: {selectedCourse.end_date}</p>
              <p>Description: {selectedCourse.description}</p>
            </div>
          </div>
        )}

        <div className="pagination01">
          {courses.length > coursesPerPage && (
            <ul>
              {Array(Math.ceil(courses.length / coursesPerPage))
                .fill()
                .map((_, i) => (
                  <li key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                    {i + 1}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    <NotificationList/>
    </div>
  );
};

export default StudentDashboard;
