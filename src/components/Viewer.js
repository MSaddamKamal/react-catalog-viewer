import React from 'react'

function Viewer({ catalogImage }) {
  return (
    <div className='layout-row justify-content-center'>
      <img 
        alt='catalog-view' 
        className='w-75' 
        src={catalogImage}
        data-testid='catalog-view' 
      />
    </div>
  )
}

export default Viewer

