import React, { useEffect, useRef, useState } from 'react';
import './Benifits.css';

import benefit_1 from '../../../../assets/img/benefit_1.png';
import benefit_2 from '../../../../assets/img/benefit_2.png';
import benefit_3 from '../../../../assets/img/benefit_3.png';
import benefit_4 from '../../../../assets/img/benefit_4.png';

const data = [
  {
    image_url: benefit_1,
    text: 'Awards trophy',
    blob_text: 'Pride',
  },
  {
    image_url: benefit_2,
    text: 'Certificate of excellence',
    blob_text: 'Promotion',
  },
  {
    image_url: benefit_3,
    text: 'Digital seal',
    blob_text: 'Prestige',
  },
  {
    image_url: benefit_4,
    text: 'Coffee table book',
    blob_text: 'Motivation',
  },
];
const blob_colors = ['#D97126', '#B65F20', '#F1CCB1', '#E3955F'];
export default function BenefitsSection() {
  const [isAnimation, setAnimation] = useState(false);
  const benifit = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (event) => {
        setAnimation(event[0].isIntersecting);
      },
      { threshold: 0.12 }
    );
    observer.observe(benifit.current);
  }, []);

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const getColor = () => {
    return blob_colors[Math.floor(Math.random() * blob_colors.length)];
  };
  const getSwing = () => {
    return getRndInteger(5, 12);
  };
  const getDelay = () => {
    return getRndInteger(200, 2000);
  };
  const getFall = () => {
    return getRndInteger(-26, 26);
  };
  const SwingingCard = ({ item, index }) => {
    const blobWidth = getRndInteger(20, 26);
    return (
      <div
        className='swingingCard'
        style={{
          '--blob-width': `${blobWidth}vh`,
          '--blob-color': getColor(),
          '--swing-angle': `${getSwing()}deg`,
          '--animation-delay': `${getDelay()}ms`,
        }}
      >
        <div className='topBlob'>{item.blob_text}</div>
        <img
          className='swingCardIMG'
          src={item.image_url}
          alt={`benifit ${index + 1}`}
          style={{ animationPlayState: isAnimation ? 'running' : 'paused' }}
        />
        <h4>{item.text}</h4>
      </div>
    );
  };
  const blobStyle = () => {
    return {
      '--fall-angle': `${getFall()}deg`,
      '--blob-width': `${getRndInteger(20, 25)}vh`,
      '--blob-color': getColor(),
      '--animation-delay': `${getDelay()}ms`,
    };
  };
  return (
    <section className='benefitSec' id='benefit'>
      <div className='section_title'>
        <h2>BENEFITS</h2>
      </div>
      <div className='benifitsMain' ref={benifit}>
        <div className={'blobContainer ' + (isAnimation ? 'blobFall' : '')}>
          <div style={blobStyle()}>PR</div>
          <div style={blobStyle()}>Increase sales</div>
        </div>
        <div className={'blobContainer ' + (isAnimation ? 'blobFall' : '')}>
          <div style={blobStyle()}>Exposure</div>
          <div style={blobStyle()}>Positivity</div>
          <div style={blobStyle()}>Recognition</div>
          <div style={blobStyle()}>Networking</div>
          <div style={blobStyle()}>Differentiation</div>
          <div style={blobStyle()}>Showcasing</div>
          <div style={blobStyle()}>Excellence</div>
        </div>
        <div>
          <div className='cardContainer'>
            <SwingingCard item={data[0]} index={0} />
            <SwingingCard item={data[1]} index={1} />
          </div>
          <div className='cardContainer'>
            <SwingingCard item={data[2]} index={2} />
            <SwingingCard item={data[3]} index={3} />
          </div>
          {/* {data.map((item, index) => (
            <SwingingCard item={item} index={index} />
          ))} */}
        </div>
      </div>
    </section>
  );
}
