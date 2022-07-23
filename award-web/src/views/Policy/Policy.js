import React from "react";
import Footer from "../Home/components/FooterSection/Footer";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function Policy() {
  window.scrollTo(0, 0)
  return (
    <>
    
    <ToastContainer />
    <section className="detailPage">
     
      <div className="container">
        <div className="section-title">
          <h1>Privacy Policy</h1>
        </div>

          <div className="row">
               <div className="col-lg-12 col-md-12">
                  <p>This website is operated by ” The Organizer ” [Arachnomesh Technologies] and
                     whose registered address is [PF-43, B-Wing, Crystal Plaza, Hiranandani Sector-7, Kharghar, Navi
                     Mumbai, Maharashtra 410210] </p>

                  <p>The Organizer are committed to protecting and preserving the privacy of our
                     visitors when visiting our site or communicating electronically with us.</p>

                  <p>This policy sets out how we process any personal data we collect from you or
                     that you provide to us through our website. </p>

                  <p>The Organizer collects personal information/data of the participants via the
                     registration form for the purpose of registering the latter for the competition. </p>

                  <p>The information you give us may include your name, e-mail address, phone number,
                     company where you work, website of your company, product details etc.</p>

                  <p>By entering the competition, you agree and consent to provide accurate personal
                     data and have it collected and processed by Arachnomesh Technologies Pvt Ltd, as well the
                     organizer’s sub processors - AWS Inc for data storage and MailChimp for email deliverability. </p>

                  <p>No personal information of a participant who has registered, will be publicly
                     disclosed, shared or sold to a Third party, except as explicitly declared in this document. The
                     business contact information is collected for public dissemination and can be shared on various
                     public media including but not limited to display on the Competition website or the Coffee Book
                     document. The Organizer reserves the right to use either of the information to contact the
                     participant with important information, news or offers about the competition. The information will
                     also be used to provide updates about our applications including Channelier from time to time. The
                     information may be disclosed to Law enforcement authorities, if the occasion arrives. </p>

                  <p>The Organizer reserves the right to use part of data entered in the registration
                     form as part of statistics and announcements for the competition. This would not lead to any
                     personal information disclosure, but only as an aggregate data.</p>

                  <p>The personal data provided by the participants can also be used for improving
                     the development activities of ‘Arachnomesh Technologies Pvt. Ltd.’</p>

                  <h3 >Changes to our privacy policy</h3>
                  <p>Any changes we may make to our privacy policy in the future will be posted on
                     this page and, where appropriate, notified to you by e-mail. Please check back frequently to see
                     any updates or changes to our privacy policy.</p>

                  <h3>Contact</h3>
                  <p>For any more information you can contact us at
                     <a href="maito:awards@channelier.com;"> awards@channelier.com</a>
                  </p>
               </div>
            </div>
        </div>
    </section>
    <Footer/>
    </>
  );
}

export default Policy;
