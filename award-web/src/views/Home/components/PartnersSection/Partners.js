import React, { useState, useEffect, useRef } from 'react';
import './Partners.css';

//These are dummy images - might delete later
import partner1 from '../../../../assets/img/partner1.png';
import partner2 from '../../../../assets/img/partner2.png';
import partner3 from '../../../../assets/img/partner3.png';
import partner4 from '../../../../assets/img/partner4.png';
import partner5 from '../../../../assets/img/partner5.png';

//Dummy data for partner cards
const data = [
  {
    partner_name: 'something',
    image_url: partner1,
  },
  {
    partner_name: 'something',
    image_url: partner2,
  },
  {
    partner_name: 'something',
    image_url: partner3,
  },
  {
    partner_name: 'something',
    image_url: partner4,
  },
  {
    partner_name: 'something',
    image_url: partner5,
  },
  {
    partner_name: 'something',
    image_url: partner1,
  },
  {
    partner_name: 'something',
    image_url: partner2,
  },
  {
    partner_name: 'something',
    image_url: partner3,
  },
  {
    partner_name: 'something',
    image_url: partner4,
  },
];

function PatnersSection() {
  const [startAnimation, setAnimation] = useState(false);
  const partnerElement = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (event) => {
        setAnimation(event[0].isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(partnerElement.current);
  }, []);

  const PartnerCard = ({ item, index }) => {
    const classHandler = () => {
      const n = index + 1;
      if (n % 3 === 0) {
        return 'middleText';
      } else if ((n - 2) % 3 === 0) {
        return 'rightText';
      } else {
        return 'leftText';
      }
    };

    const delayFactor = 0.5;
    return (
      <>
        <div
          className={
            'partnerCard ' + (startAnimation ? 'partnerCardAnimation' : '')
          }
          style={{ animationDelay: `${index * delayFactor}s` }}
        >
          <h4 className={classHandler()}>{item.partner_name + index}</h4>
          <img src={item.image_url} alt='partner' />
        </div>
        <div></div>
      </>
    );
  };
  return (
    <div className='partnerMain'>
      <section>
        <h1>OUR PARTNERS</h1>
        <h5>
          Aut asperiores id iste rem nulla ratione. Non rerum architecto ut. Sit
          placeat sunt. Sint dolore debitis sint. Cupiditate omnis est iste
          officia. Facere quaerat accusamus tempore enim.
          <br />
          Aut asperiores id iste rem nulla ratione. Non rerum architecto ut. Sit
          placeat sunt. Sint dolore debitis sint. Cupiditate omnis est iste
          officia. Facere quaerat accusamus tempore enim.
        </h5>
      </section>
      <section ref={partnerElement}>
        {data.map((item, index) => (
          <PartnerCard item={item} index={index} />
        ))}
      </section>
    </div>
  );
}

export default PatnersSection;
