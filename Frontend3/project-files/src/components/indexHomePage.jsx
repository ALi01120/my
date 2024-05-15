import React from 'react';
import { Link } from 'react-router-dom'; 
import './indexHomePage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import img from  './images/slider-image1.jpg'
import img1 from './images/Edu2.jpg';
import img2 from './images/Edu3.jpg';
import img3 from './images/news1.jpg';
import img4 from './images/news2.jpg';
import img5 from './images/news3.jpg';
import img6 from './images/news4.jpg';
import img7 from './images/find_Courses.jpg';
import img8 from './images/Find_job.jpg';
import img9 from './images/Clint.jpg';
const IndexHomePage = () => {
    return (
        <div>
            <Navbar />
            <header className='header1'>
                <div className="text-overlay1">
                    <h1>Welcome to Maritime </h1>
                    <p>Providing quality education for a better future</p>
                    <Link to="/register" className="join-now-button">Join Now </Link>
                </div>
                <img src={img} alt='education' />
            </header>
            <section className="news-section">
                <h2>Eduction</h2>
                <div className="news-images">
                    <div className="image-container">
                        <img src={img1} alt='education1' />
                        <p>Maritime Engineering</p>
                    </div>
                    <div className="image-container">
                        <img src={img2} alt='education2' />
                        <p>Nautical Science</p>
                    </div>
                </div>
            </section>
            <section className="education-section1">
                <h2>News</h2>
                <div className="education-images">
                    <div className="image-container">
                        <img src={img3} alt='news1' />
                        <p>Shipping and Offshore</p>
                    </div>
                    <div className="image-container">
                        <img src={img4} alt='news2' />
                        <p>Port and Logistics</p>
                    </div>
                    <div className="image-container">
                        <img src={img5} alt='news3' />
                        <p>Marine Science</p>
                    </div>
                    <div className="image-container">
                        <img src={img6} alt='news4' />
                        <p>Persian Gulf</p>
                    </div>
                </div>
            </section>

            <section className="future-section">
                <h2>Features</h2>
             <div className="future-images">
             <div className="image-container">
            <Link to="/register">
                <img src={img7} alt='future1' />
                <p>Maritime LMS</p>
            </Link>
               </div>
        <div className="image-container" >
            <Link to="/register">
             <img src={img8} alt='future2' />
             <p>Find a job</p>
            </Link>
        </div>
        <div className="image-container">
            <Link to="/register">  
             <img src={img9} alt='future3' />
             <p>Hire Client</p>
             </Link>
        </div>
    </div>
</section>
            <Footer />
        </div>
    );
}

export default IndexHomePage;
