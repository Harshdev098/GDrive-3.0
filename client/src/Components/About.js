import React from 'react';

export default function About() {
  return (
    <>
      <div className="aboutus">
        <h2>About Us</h2>
        <i className="fa fa-quote-left quote-icon" style={{color:'#b2b2b2'}}></i>
        <p>
        At GDrive 3.0, we are dedicated to providing a secure and user-friendly platform for storing, managing, and sharing files seamlessly. Our mission is to empower users with cutting-edge blockchain technology, ensuring your data remains private, transparent, and accessible only to you.
<br /><br />
Whether you're uploading important documents, sharing files with colleagues, or keeping your personal information safe, our platform is built to handle it all with speed, reliability, and simplicity.
        </p>
        <i className="fa fa-quote-right quote-icon" style={{color:'#b2b2b2'}}></i>
        <p style={{display:"block",padding:'18px'}}><b>Disclaimer: </b> To use this application you need to connect with sepolia network</p>
      </div>
    </>
  );
}
