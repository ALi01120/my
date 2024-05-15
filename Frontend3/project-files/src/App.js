// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Authpages/Login';
import IndexHomePage from './components/indexHomePage';
import AdminPage from './components/Adminpages/AdminPage';
import Register from './components/Authpages/Register';
import StudentDashboard from './components/Studenpages/StudentDashboard';
import StudentProfile from './components/Studenpages/UserProfile';
import JobSeekerProfile from './components/Jobsekerpages/UserProfile';
import ClientProfile from './components/clientpages/UserProfile';
import CreateJob from './components/clientpages/CreateJob';
import ManageJobs from './components/clientpages/ManageJobs';
import AllJobs from './components/clientpages/AllJobs';
import Jobs from './components/Jobsekerpages/Jobs';
import ApplyJobPage from './components/Jobsekerpages/ApplyJobPage';
import ViewApplicationsPage from './components/Jobsekerpages/ViewJobseekerApplications';
import ClientJobApplications from './components/clientpages/ClientJobApplications';
import CreateCourses from './components/Adminpages/CreateCourse';
import ViewCourses from './components/Studenpages/ViewCourses';
import CourseManegment from './components/Adminpages/CourseManegment';
import Slider from './slider';
import AboutPage from './components/About';
import ContactUsPage from './components/ContactUsPage ';
import LessonList from './components/Studenpages/LessonList';
import EnrolledCourses from './components/Studenpages/EnrolledCourses';
import TeacherDashboard from './components/Adminpages/TeacherDashboard';
import AdminDashboard from './components/Adminpages/AdminDashboard';
import NotificationForm from './components/Adminpages/NotificationForm';
import NotificationList from './components/Studenpages/NotificationList';
import NotificationList1 from './components/clientpages/NotificationList';
import NotificationList2 from './components/Jobsekerpages/NotificationList';
import { isAuthenticated } from './components/Auth';

const ProtectedRoute = ({ element, role, ...rest }) => {
  const isLoggedIn = isAuthenticated();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const userRole = localStorage.getItem('role');
  if (userRole !== role) {
    return <Navigate to="/login" />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <Routes>

      <Route path="/slider" element={<Slider />} />
        <Route path="/" element={<IndexHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        
        <Route path="/Admin" element={<ProtectedRoute element={<AdminDashboard />} role="Administrator" />} />
        <Route path="/Admin/Adminpage1" element={<ProtectedRoute element={<AdminPage />} role="Administrator" />} />
        <Route path="/Admin/Adminpage2" element={<ProtectedRoute element={<CourseManegment />} role="Administrator" />} />
        <Route path="/Admin/Adminpage3" element={<ProtectedRoute element={<CreateCourses />} role="Administrator" />} />
        <Route path="/Admin/Adminpage4" element={<ProtectedRoute element={<TeacherDashboard />} role="Administrator" />} />
        <Route path="/Admin/Adminpage5" element={<ProtectedRoute element={<NotificationForm />} role="Administrator" />} />

        <Route path="/Student" element={<ProtectedRoute element={<StudentDashboard />} role="Student" />} />
        <Route path="/Student/profile" element={<ProtectedRoute element={<StudentProfile/>} role="Student" />} />
        <Route path="/Student/View_Couses" element={<ProtectedRoute element={<ViewCourses/>} role="Student" />} />
        <Route path="/Student/courses/:courseId/lessons" element={<ProtectedRoute element={<LessonList/>} role="Student" />} />
        <Route path="/Student/enroled_corse" element={<ProtectedRoute element={<EnrolledCourses/>} role="Student" />} />
        <Route path="/Student/NotificationList" element={<ProtectedRoute element={<NotificationList/>} role="Student" />} />



        <Route path="/client" element={<ProtectedRoute element={<AllJobs/>} role="Client" />} />
        <Route path="/client/profile" element={<ProtectedRoute element={<ClientProfile/>} role="Client" />} />
        <Route path="/client/create_job"  element={<CreateJob/>}  />
        <Route path="/client/manage_Job/:job_id" element={<ProtectedRoute element={<ManageJobs />} role="Client" />} />
        <Route path="/client/view-Application" element={<ClientJobApplications/>}  />
        <Route path="/client/NotificationList" element={<ProtectedRoute element={<NotificationList1 />} role="Client" />} />



        <Route path="/JobSeeker"  element={<ProtectedRoute element={<Jobs />} role="Job Seeker" />} /> 
        <Route path="/jobseeker/profile" element={<ProtectedRoute element={<JobSeekerProfile/>} role="Job Seeker" />} /> 
        <Route path="/JobSeeker/apply-job" element={<ProtectedRoute  element={<ApplyJobPage />}  role="Job Seeker" />}  />
        <Route path="/JobSeeker/view_application"element={<ProtectedRoute  element={<ViewApplicationsPage />} role="Job Seeker" />}  />
        <Route path="/JobSeeker/NotificationList"element={<ProtectedRoute  element={<NotificationList2 />} role="Job Seeker" />}  />
      </Routes>
    </Router>
  );
}

export default App;