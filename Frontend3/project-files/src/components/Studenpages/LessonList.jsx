import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './LessonList.css';
import Nave from './Nave';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { courseId } = useParams();
  const [scorePerLesson, setScorePerLesson] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [lessonScore, setLessonScore] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [allLessonsCompleted, setAllLessonsCompleted] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/messages/sent', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`http://localhost:5000/lessons/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLessons(data.lessons);
        setScorePerLesson(100 / data.lessons.length);
        const storedLessonIndex = parseInt(localStorage.getItem('currentLessonIndex'));
        if (!isNaN(storedLessonIndex) && storedLessonIndex >= 0 && storedLessonIndex < data.lessons.length) {
          setSelectedLesson(data.lessons[storedLessonIndex]);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
    fetchMessages(); // Fetch messages once on component mount
  }, [courseId]);

  useEffect(() => {
    let timer;
    if (lessonCompleted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (lessonCompleted && timeLeft === 0) {
      setCanProceed(true);
      setLessonScore(Math.round(scorePerLesson * lessons.findIndex(les => les === selectedLesson)));
    }
    return () => clearTimeout(timer);
  }, [lessonCompleted, timeLeft, lessons, selectedLesson, scorePerLesson]);

  const handleLessonStart = (lesson) => {
    setSelectedLesson(lesson);
    setLessonCompleted(false);
    setTimeLeft(5);
    setCanProceed(false);
    const lessonIndex = lessons.findIndex(les => les === lesson);
    if (lessonIndex !== -1) {
      setLessonScore(Math.round(scorePerLesson * lessonIndex));
    }
    localStorage.setItem('currentLessonIndex', lessonIndex.toString());
  };

  const handleLessonEnd = () => {
    setLessonCompleted(true);
    if (selectedLesson === lessons[lessons.length - 1]) {
      setAllLessonsCompleted(true);
    }
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(lesson => lesson === selectedLesson);
    if (currentIndex < lessons.length - 1) {
      setSelectedLesson(lessons[currentIndex + 1]);
      setLessonCompleted(false);
      setTimeLeft(5);
      setCanProceed(false);
      localStorage.setItem('currentLessonIndex', (currentIndex + 1).toString());
    }
  };

  const handleMessageSend = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/messages', {
        receiver_id: selectedLesson.instructor_id,
        message: message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMessages(); // Fetch messages after sending a new message
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    
    <div>
      <Nave/>
    <div>
           
      <div className="lesson-list-container">
        <div className="lesson-titles">
          <h2>Lessons for Course {courseId}</h2>
          <ul>
            {lessons.map((lesson, index) => (
              <li key={lesson.lesson_id} onClick={() => handleLessonStart(lesson)} className={lesson === selectedLesson ? 'active' : ''} disabled={!canProceed && lesson !== selectedLesson}>
                {lesson.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="lesson-content">
          <h2>{selectedLesson ? selectedLesson.title : ''}</h2>
          {selectedLesson && (
            <>
              <p>{selectedLesson.content}</p>
              <div className="progress-report">
                <p>Score Earned: {lessonScore}%</p>
              </div>
              <button onClick={handleLessonEnd} disabled={!selectedLesson}>Complete Lesson</button>
              {lessonCompleted && timeLeft > 0 && <p>Time Left: {timeLeft} seconds</p>}
              {allLessonsCompleted ? (
                <button>Congratulations, you have completed this Course</button>
              ) : (
                <button onClick={handleNextLesson} disabled={!canProceed}>Next Lesson</button>
              )}
              <div className="message-box">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="4" cols="50" placeholder="Type your message here"></textarea>
                <button onClick={handleMessageSend}>Send Message</button>
              </div>
              <div className="message-list">
                <h3>Messages</h3>
                <ul>
                  {messages.map((msg, index) => (
                    <li key={index}>{`Sender ID: ${msg.sender_id}, Message: ${msg.message}`}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default LessonList;
