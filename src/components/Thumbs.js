import React, { Fragment } from 'react'

function Thumbs({ items, currentIndex ,selectedThumb}) {
    
    return (
        <Fragment>
            {
                items.map((catalog, idx) => (
                    <span   
                        id={idx} 
                        key={idx} 
                        data-testid={'thumb-button-' + idx}
                        onClick={()=> selectedThumb(idx)}
                    >
                        <span 
                            className={'inline-flex w-90 pa-4 image-thumb ' + 
                                (idx === currentIndex ? 'thumb-selected' : '')} 
                        >
                            <span 
                                className='mx-5 thumb' 
                                id={idx} 
                                style={{ backgroundImage: 'url('+ catalog.thumb + ')' }}
                            />
                        </span>
                    </span>
                ))
            }
        </Fragment>
    )
}

export default Thumbs

