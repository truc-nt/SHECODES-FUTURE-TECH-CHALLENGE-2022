import Album from './components/Album'
import React, {useState} from 'react'
import ImageInfo from './components/ImageInfo'

import './assets/css/Modal.css'

const Modal = (props) => {
    return (
        <div className = 'modal'>
          <div className = 'modal-container'>
            <div className = 'modal-header'>
              <h5>IMAGE CREDITS</h5>
              <p>A list of all the sources where I get the images. If the image is not listed here, that means I can't find its source or it is owned by me.</p>
              <button onClick = {()=>props.setOpenModal(false)} className = "close"><i className ="fa fa-times"></i></button>
            </div>
            <div className = 'modal-body'>
              {
                props.ImageInfo.map((image) => (
                  <div key = {image.img} className = 'image-info'>
                    <div><img src = {require(`${image.img}`)} target = "_blank" rel = "noopener noreferrer"></img></div>
                    <div><a href = {image.src}><p>{image.name}</p></a></div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
    );
}

function debounce(func, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      func.apply(this, arguments)
    }, ms)
  }
}

const App = () => {
  /*rerender when resize browser*/
  const [dimesion, setDimension] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)

    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }  
  })
  /* */
  window.onerror = () => {
    window.location.reload();
  }

  const [showModal, setOpenModal] = useState(false)
  return (
    <div>
      <Album></Album>
      <div id = 'footer'>
            <p style = {{display: window.innerWidth <= 500 ? 'inline-block' : 'none' }}>Nếu có thể, bạn hãy xoay màn hình ngang để xem trọn vẹn hơn nha!!!</p>
            <p>All image credits are listed here</p>
            <button  onClick={() => setOpenModal(true)}><i className ="fa fa-list-alt"></i></button>
            {showModal && <Modal setOpenModal={setOpenModal} ImageInfo = {ImageInfo} />}
      </div>
    </div>
  );
}

export default App
