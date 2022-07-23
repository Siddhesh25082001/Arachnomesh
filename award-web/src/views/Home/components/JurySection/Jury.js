import React, { useEffect, useRef, useState } from 'react';
import './Jury.css';

//This is the dummy image of jury section
import jury1 from '../../../../assets/img/jury1.png';
//This is the dummy iamge of jury's company
import company from '../../../../assets/img/companyName.png';

//This is the dummy data for jury members
const data = [
  {
    jury_name: 'Pulkit Gupta',
    jury_image_url: jury1,
    jury_company_image: company,
  },
  {
    jury_name: 'Manmeet Singh Duggal',
    jury_image_url: jury1,
    jury_company_image: company,
  },
  {
    jury_name: 'Rishabh Marathe',
    jury_image_url: jury1,
    jury_company_image: company,
  },
  {
    jury_name: 'Tinson Thomas',
    jury_image_url: jury1,
    jury_company_image: company,
  },
  {
    jury_name: 'Aashutosh Taparia',
    jury_image_url: jury1,
    jury_company_image: company,
  },
  

];

function Jury() {
  const [selected, setSelected] = useState(0);
  const [previous, setPrevious] = useState();
  const selectedRef = useRef(0);

  const cycleHandler = () => {
    setPrevious(selectedRef.current);
    if (selectedRef.current === data.length - 1) {
      selectedRef.current = 0;
    } else {
      selectedRef.current += 1;
    }
    setSelected(selectedRef.current);
    // handleState(selectedRef.current);
  };
  useEffect(() => {
    setInterval(() => {
      cycleHandler();
    }, 4000);
  }, []);

  const handleState = (n) => {
    setPrevious(selected);
    setSelected(n);
  };
  const JuryCard = ({ item, index }) => {
    return (
      <div
        className={
          'juryCard ' +
          (selected === index
            ? 'juryCardActive'
            : previous === index
            ? 'juryCardInactive'
            : '')
        }
        onMouseEnter={() => handleState(index)}
      >
        <div
          className={
            'section ' +
            (selected === index
              ? 'sectionActive'
              : previous === index
              ? 'sectionInactive'
              : '')
          }
        >
          <h4
            className={
              'juryName ' +
              (selected === index
                ? 'juryNameActive'
                : previous === index
                ? 'juryNameInactive'
                : '')
            }
          >
            {item.jury_name}
          </h4>
          <img src={item.jury_image_url} alt='jury' className='juryImage' />
        </div>
        <img
          src={item.jury_company_image}
          alt='brand logo'
          className='brandLogo'
        />
      </div>
    );
  };
  return (
    <section className='juryMain pb-0'>
      <div className='section_title'>
       <h2 className='text-white'>Our Jury</h2>
      </div>
    
      <div className='juryContainer'>
        {data.map((item, index) => (
          <JuryCard item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Jury;
