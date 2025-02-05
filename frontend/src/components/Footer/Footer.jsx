import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import logo_light from '../../assets/logo.png';
import logo_dark from '../../assets/logo.png';
import './Footer.css';

const Footer = ({ theme }) => {
  return (
    <MDBFooter className={`text-center text-lg-start ${theme}`}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="social-icons">
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            
            <MDBCol md='3' lg='4' xl='4' className='mx-auto mb-4'>
              
                 <img
                    src={theme === 'light' ? logo_light : logo_dark}
                 />
             
              <p>Here you can use rows and columns to organize your footer content.</p>
            </MDBCol>

            {/* <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p><a href='#!' className='text-reset'>Angular</a></p>
              <p><a href='#!' className='text-reset'>React</a></p>
              <p><a href='#!' className='text-reset'>Vue</a></p>
              <p><a href='#!' className='text-reset'>Laravel</a></p>
            </MDBCol> */}

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p><a href='/events' className='text-reset'>Events</a></p>
              <p><a href='/about' className='text-reset'>About</a></p>
              <p><a href='/submitPost' className='text-reset'>Submit a Post for E-Magazine</a></p>
              <p><a href='#!' className='text-reset'>Help</a></p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p><MDBIcon icon='home' className='me-2' /> University of Ruhuna, Matara, Sri Lanka</p>
              <p><MDBIcon icon='envelope' className='me-3' /> info@rushikersclub.me</p>
              <p><MDBIcon icon='phone' className='me-3' /> + 01 234 567 88</p>
              <p><MDBIcon icon='print' className='me-3' /> + 01 234 567 89</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='/'>
           rushikersclub
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
