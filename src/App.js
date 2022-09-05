import React, { Fragment, useState } from 'react'


import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(false)
  const [ slideDuration ] = useState(3000)

  const selectedThumb = (index)=>{
    setActiveIndex(index)
  }



  const timer = () => {
    
    if(slideTimer){
      clearInterval(slideTimer)
      setSlideTimer(false)
      return
    }


    const turnover = setInterval(() => {
      setActiveIndex(prevCount => prevCount == catalogs.length-1?0:prevCount+1)
      
    }, slideDuration)
    setSlideTimer(turnover)
   

  }

  return (
    <Fragment>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={()=>activeIndex == 0?setActiveIndex(catalogs.length-1):setActiveIndex(activeIndex-1)}
   
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex } 
                selectedThumb={selectedThumb}
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={()=>activeIndex == catalogs.length-1?setActiveIndex(0):setActiveIndex(activeIndex+1)}
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            value={slideTimer}
            onChange={timer}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

