import { Row, Col } from 'react-bootstrap';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import rotateTxt from '../../../../assets/img/rotateTxt.png';
import { BsArrowRight } from 'react-icons/bs';

function Footer() {
  return (
    <section className='footer_section bg-brown p-0' id='contact'>
      <div className='container-fluid'>
        <Row>
          <Col lg='6' md='12' sm='6' className='p-0 bg_light_orange bdr_btm'>
            <div className='footer_form_div'>
              <img src={rotateTxt} alt='' className='rotataImg' />
              <div className='footer_form'>
                <div className='form_inner'>
                  <FloatingLabel
                    controlId='floatingInput'
                    label='Enter your name'
                    className='mb-4'
                  >
                    <Form.Control type='text' placeholder='Enter your name' />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId='floatingInput'
                    label='Enter your phone no.'
                    className='mb-4'
                  >
                    <Form.Control
                      type='text'
                      placeholder='Enter your phone no.'
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId='floatingInput'
                    label='Enter your email'
                    className='mb-4'
                  >
                    <Form.Control type='text' placeholder='Enter your email' />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId='floatingTextarea'
                    label='Message'
                    className='mb-4'
                  >
                    <Form.Control as='textarea' placeholder='Message' />
                  </FloatingLabel>
                  <div className='submitDiv'>
                    <span>
                      {' '}
                      <BsArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg='6' md='12' sm='6' className='p-0'>
            <div className='footer_details bg_light_orange'>
              <div className='footer_text'>
                <h3 className='mb-4'>Get In Touch</h3>
                <h6>Contact Us</h6>
                <p>
                  #28, JSSATE-STEP, C-20/1
                  <br />
                  Sector 62, Noida, Uttar <br />
                  Pradesh India - 201309
                </p>

                <p className='mb-0'>
                
                  <a href='telto:+91 8882957186;'>+91 8882957186</a>
                </p>

                <p className='mb-0'>
                  <a href='telto:+91 7973794384;'>+91 7973794384</a>
                </p>
              </div>
              <div className='footer_links'>
                <ul>
                  <li>
                    <a href='#about'> About Us </a>
                  </li>
                  <li>
                    <a href='https://channelier.com/' target='_blank' rel="noreferrer">
                     
                      Channelier
                    </a>
                  </li>
                  <li>
                    <a href='#benefit'> Benefits</a>
                  </li>
                  <li>
                    <a href='#2021'> Winners</a>
                  </li>
                  <li>
                    <a href='#category'> Categories</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='footer_bottom'>
              <div className='social_connect'>
                <h5 className='text-white mb-4'>Follow Us On</h5>
                <div className='social_links'>
                  <ul>
                    <li>
                      <a
                        href='https://www.facebook.com/channelier/'
                        target='_blank'
                        rel="noreferrer"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.instagram.com/channelier_/'
                        target='_blank'
                        rel="noreferrer"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.linkedin.com/company/channelier/'
                        target='_blank'
                        rel="noreferrer"
                      >
                        Linkedin
                      </a>
                    </li>
                    <li>
                      <a href='https://channelier.com/' rel="noreferrer"  target='_blank'>
                        Channelier
                      </a>
                    </li>
                  </ul>
                </div>
                <p>
                  © Arachnomesh Technologies, 2022
                  <Link to='/auth/policy'>Privacy Policy </Link>
                  <Link to='/auth/terms'> T&C </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Footer;
