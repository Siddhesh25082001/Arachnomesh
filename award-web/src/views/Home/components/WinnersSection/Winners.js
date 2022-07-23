import React, { useCallback, useEffect, useRef, useState } from 'react';
import leftarrow from '../../../../assets/img/leftarrow.png';
import rightarrow from '../../../../assets/img/rightarrow.png';
import podium from '../../../../assets/img/podium.png';
import './Winners.css';





function Winnners() {

  const [productImageSet,setProductImageSet] = useState([]);
   
 

  
  // This state changes the postion of items in a winner category
  const [atFront, setAtFront] = useState(0);
  // This state handles which category to show
  const [category, setCategory] = useState(0);
  //This state changes onclicking the 2021 and 2020 buttons, the data changes upon clicking.'
  const [year2021, set2021] = useState();
  const [spliceIndex,setSpliceIndex]=useState(0)

  const atFrontref = useRef(0);



  const brands = [
  
    
  ];

  const launch = [
    
  ];

  useEffect(()=>{
    if (category) {
      set2021(getAllImages(category))
    }
    
  },[category])



function getAllImages(c){ 
 
  if(c===0){
    return importAll(require.context("../../../../assets/img/winners/product_year", false, /\.(png|jpe?g|svg)$/));
  }
  if(c===1){
    return importAll(require.context("../../../../assets/img/winners/product_launch", false, /\.(png|jpe?g|svg)$/));
  }
  if(c===2){
    return importAll(require.context("../../../../assets/img/winners/brand_year", false, /\.(png|jpe?g|svg)$/));
  }

}

  function importAll(r) {
    return r.keys().map(r);
  }
  const rotateimage = () => {
       console.log("ravi",productImageSet);
    // if (counter < 3) {
      let newPeod=[]
      let allImages=year2021
      console.log(allImages);
      let SplicedArray=year2021.splice(spliceIndex,spliceIndex+3)
      console.log(SplicedArray.length,"splicedLength");
      console.log(SplicedArray,"splicedArray");
      for (let index = 0; index < (SplicedArray.length); index++) {
        const imageUrl = year2021[index];
        console.log(imageUrl);
        newPeod.push(imageUrl)
       
      }
      
      setProductImageSet(newPeod);
      setSpliceIndex(spliceIndex+3)
      // if (productnewURL.length === spliceIndex+3) {
      //   spliceIndex=0
      // }
      
 
     
    // }

    // else {
    //   counter = 0;
    // }

    console.log(productImageSet);
        
  }

  useEffect(() => {
    setInterval(() => {
      handleFront();
      rotateimage();
    }, 4000);
  }, []);

  // This function handles the cycle of item in a category
  const handleFront = useCallback(() => {
    if (atFrontref.current === 2) {
      atFrontref.current = 0;
    } else {
      atFrontref.current += 1;
    }
    setAtFront(atFrontref.current);
  }, []);

  //This function handles the click on arrow
  const handleClick = (operation) => {
    if (operation === 'increase') {
      if (category === 2) {
        setCategory(0);
      } else { 
        setCategory(category + 1);
        
      }
    } else {
      if (category === 0) {
        setCategory(2);
      } else {
        setCategory(category - 1);
      }
    }
   
  };



  // This component contains three products cycling at an interval for a single winner category
  const WinnerProducts = ({ frontToken = 0, imageData = [] }) => {
    const tokenCalculator = () => {
      let prevToken, nextToken;
      if (frontToken === 0) {
        prevToken = 2;
        nextToken = 1;
      } else if (frontToken === 1) {
        prevToken = 0;
        nextToken = 2;
      } else {
        prevToken = 1;
        nextToken = 0;
      }

      return { prevToken, nextToken };
    };
    const { prevToken: prev, nextToken: next } = tokenCalculator();

    return (
      <div
        className={
          'winnerProductsMain ' +
          (category === prev
            ? 'prevWinner'
            : category === next
            ? 'nextWinner'
            : '')
        }
      >
        <div
          className={
            'innitialFront ' +
            (atFront === 0
              ? 'atFront'
              : atFront === 1
              ? 'atLeftBack'
              : atFront === 2
              ? 'atRightBack'
              : '')
          }
        >
          <img
            src={imageData[1]}
            // style={{ height: '20vh' }}
            alt='product'
          />
          <img src={podium} alt='podium' />
        </div>
        <div
          className={
            'innitialFront ' +
            (atFront === 1
              ? 'atFront'
              : atFront === 2
              ? 'atLeftBack'
              : atFront === 0
              ? 'atRightBack'
              : '')
          }
        >
          <img
            src={imageData[2]}
            // style={{ height: '16vh' }}
            alt='product '
          />
          <img src={podium} alt='podium' />
        </div>
        <div
          className={
            'innitialFront ' +
            (atFront === 2
              ? 'atFront'
              : atFront === 0
              ? 'atLeftBack'
              : atFront === 1
              ? 'atRightBack'
              : '')
          }
        >
          <img src={imageData[0]} alt='product ' />
          <img src={podium} alt='podium' />
        </div>
      </div>
    );
  };

  return (
    <section className='winnerSec pb-0' id="2021">
      <div class='section_title'>
        <h2>Previous winners 2021</h2>
      </div>
      <div className='winnersInner'>
        {/* <div>
          <div
          onClick={() => set2021(false)}
          className={'card2020 ' + (!year2021 ? 'cardAbove' : 'cardBelow')}
        >
          20
          <br/>
          20
        </div>
          <div
            onClick={() => set2021(true)}
            className={'card2021 ' + (year2021 ? 'cardAbove' : 'cardBelow')}
          >
            20
            <br />
            21
          </div>
        </div> */}
        <div className='winnerSliderContainer'>
     
          <WinnerProducts frontToken={0} imageData={productImageSet} />
          <WinnerProducts frontToken={1} imageData={launch} />
          <WinnerProducts frontToken={2} imageData={brands} />
          <div className='arrowBottom'>
            <img
              src={leftarrow}
              onClick={() => handleClick('decrease')}
              alt='arrow'
            />
            <h4>
              {category === 0
                ? 'Product of the year'
                : category === 1
                ? 'Product launch of the year'
                : category === 2
                ? 'Brand of the year'
                : ''}
            </h4>
            <img
              src={rightarrow}
              onClick={() => handleClick('increase')}
              alt='arrow'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Winnners;
