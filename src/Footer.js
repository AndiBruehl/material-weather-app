import React from 'react';
import './Footer.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="content">
      </div>
      <footer className="footer">
        <div className="contact-me">
          <div>
            <h3>Contact Us</h3>
            <a className="footer-link" href="mailto:a.bruehl2019@gmail.com"> <MarkAsUnreadIcon />a.bruehl2019@gmail.com</a><br />
            <a className="footer-link" href="https://github.com/AndiBruehl" target="_blank" rel="noopener noreferrer"><GitHubIcon />https://github.com/AndiBruehl</a><br />
            <a className="footer-link" href="https://www.linkedin.com/in/andreas-brühl/" target="_blank" rel="noopener noreferrer"> <LinkedInIcon />https://www.linkedin.com/in/andreas-brühl/</a>
            <p></p>
            <a className="footer-link" href="mailto:bastis@email.adresse"> <MarkAsUnreadIcon />bastis@email.adresse</a><br />
            <a className="footer-link" href="https://github.com/BastiWho" target="_blank" rel="noopener noreferrer"><GitHubIcon />https://github.com/BastiWho</a><br />
            <a className="footer-link" href="https://www.linkedin.com/in/sebastian-hufeld/" target="_blank" rel="noopener noreferrer"> <LinkedInIcon />https://www.linkedin.com/in/sebastian-hufeld/</a>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} - Andreas Brühl & Sebastian Hufeld
        </div>
      </footer>
    </div>
  );
};

export default Footer;
