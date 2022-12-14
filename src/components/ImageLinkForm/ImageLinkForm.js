import React from 'react';
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange,onButtonSubmit}) {
  return (
    <div>
        <p className="f3 pa0">
            {"This Magic will detect faces in your pictures.Give it a try"}
        </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input className="f6 pa0 w-70 center" type="text" onChange={onInputChange}/>
                <button className='w-30 grow f6 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    </div>
  )
}

export default ImageLinkForm