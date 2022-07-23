import React from 'react';
import AboutFMCG from './components/AboutSection/AboutFMCG';
import BenefitsSection from './components/BenefitsSection/Benefits';
import HomeSection from './components/HomeSection/HomeSection';
// import Jury from './components/JurySection/Jury';
// import PatnersSection from './components/PartnersSection/Partners';
// import Testimonials from './components/TestimonialsSection/Testimonials';
import Winners from './components/WinnersSection/Winners';
import AwardCategory from './components/AwardsCategory/AwardsCategory';
import Footer from './components/FooterSection/Footer';
import '../../assets/css/custom.css';

import HomeModal from './components/HomeModal/Modal';
import Sliders from './components/SliderSec/Slider';

function Home() {
  return (
    <div className='mainContainer'>
      <HomeSection />
      {/* <Sliders/> */}
      <Winners />
      <AboutFMCG />
      <AwardCategory />
      <BenefitsSection />
      {/* <Jury /> */}
      {/* <Testimonials /> */}
      {/* <PatnersSection /> */}
      <Footer />
      <HomeModal/>
    </div>
  );
}

export default Home;
