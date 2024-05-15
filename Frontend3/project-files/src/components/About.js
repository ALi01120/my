import React from 'react';
import './AboutPage.css'; // Import CSS file for styling
import Navbar from './Navbar';
import Footer from './Footer';
const AboutPage = () => {
    return (
        <div>
            <Navbar/>
        <div className="about-container">
            <div className="about-content">
                <h1>About Us</h1>
                <p>Welcome to our project! We've developed a web application that serves both education and job sectors, providing a seamless platform for users to explore educational opportunities and job openings.</p>
                <p>MaritimEducation aims to support safe, secure, efficient, and sustainable shipping on clean oceans. MaritimEducation is a platform for online maritime training. Where anyone can explore, take, or even teach a course. With new content added regularly, you can find the latest in maritime education.</p>
                <p>MaritimEducation was established to provide pioneering innovative education to the maritime sector, particularly seafarers. Some materials are free to download for non-commercial purposes. We see MaritimEducation as a paradigm shift, focusing on modern-day learning techniques aimed at new generations who behave and learn differently due to their lifelong association with digital technology.</p>
                <div className="disclaimer-container">
                    <p className="disclaimer">
                        DISCLAIMER: The information and educational materials provided on www.maritimeducation.com are for general informational and educational purposes only. All content on this website, including but not limited to text, images, graphics, videos, and other materials, is provided “as is” and without any express or implied warranties, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                    </p>
                    <p className="disclaimer">
                        MaritimEducation makes no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content, services, software, text, graphics, or links provided on this website. Any reliance you place on such information is strictly at your own risk. In no event will MaritimEducation be liable for any loss or damage, including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of this website or the information contained herein.
                    </p>
                    <p className="disclaimer">
                        MaritimEducation does not guarantee that the website will operate error-free or that the website and its server are free of computer viruses or other harmful elements. If your use of the website or the material results in the need for servicing or replacing equipment or data, MaritimEducation is not responsible for those costs.
                    </p>
                    <p className="disclaimer">
                        MaritimEducation reserves the right to make changes, updates, or corrections to the content on this website at any time without notice. By using this website, you agree to be bound by this disclaimer and any modifications that may be made.
                    </p>
                    <p className="disclaimer">
                        This website may contain links to external websites that are not affiliated with or controlled by MaritimEducation. MaritimEducation is not responsible for the content, privacy policies, or practices of any third-party websites or services. By using this website, you acknowledge and agree that MaritimEducation is not liable for any loss or damage that may be caused by your use of any third-party websites or services.
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default AboutPage;
