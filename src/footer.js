import React from 'react';
import { Grid, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import './Footer.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '20px', marginTop: 'auto' }}>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={6} md={3} style={{color: '#90caf9', textDecoration: 'none'}}>
        <Typography variant="h6" color="primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {/* Fix the link by wrapping the icon in a separate element */}
          <a className="footer-link" href="mailto:a.bruehl2019@gmail.com">
            <span><MarkAsUnreadIcon /></span>a.bruehl2019@gmail.com
          </a><br />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <a className="footer-link" href="https://github.com/AndiBruehl" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />https://github.com/AndiBruehl
          </a><br />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <a className="footer-link" href="https://www.linkedin.com/in/andreas-brühl/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />https://www.linkedin.com/in/andreas-brühl/
          </a>
        </Typography>
      </Grid>
        <Grid item xs={6} md={3} marginTop={'35px'}>
          <Typography variant="body2" color="textSecondary">
          <a className="footer-link" href="mailto:sebastian.hufeld@gmail.com"> 
          <MarkAsUnreadIcon />sebastian.hufeld@gmail.com
          </a><br />
          </Typography>
          <Typography variant="body2" color="textSecondary">
          <a className="footer-link" href="https://github.com/BastiWho" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />https://github.com/BastiWho</a><br />
          </Typography>
          <Typography variant="body2" color="textSecondary">
          <a className="footer-link" href="https://www.linkedin.com/in/sebastian-hufeld/" target="_blank" rel="noopener noreferrer"> 
          <LinkedInIcon />https://www.linkedin.com/in/sebastian-hufeld/
          </a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
