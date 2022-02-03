import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Room({room}) {

  const [show, setShow] = useState(false);
  // for close
  const handleClose = () => setShow(false);
  // for popup
  const handleShow = () => setShow(true);

  return (
    <div>
        <div className='row bs'>
          {/* for the image 4 column dedicated */}
          <div className='col-md-4'>
              <img src={room.imageurls[0]} className='smallimg' />
          </div>
          {/* for the rest 7 column dedicated */}
          <div className='col-md-7'>

              <h1>{room.name}</h1>   
              <b>
                  <p>Max Count : {room.maxcount}</p>
                  <p>Phone Number : {room.phonenumber}</p>
                  <p>Type : {room.type}</p>
              </b>           
              

              <div style={{float: 'right'}}>
                <Link to={`/book/${room._id}`}>
                  <button className='btn btn-success m-2'>Book Now</button>
                </Link>
                <button className='btn btn-success' onClick={handleShow}>View Details</button>
              </div>

          </div>          

          <Modal show={show} onHide={handleClose} size='lg'>

            <Modal.Header>
              <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Carousel>

                {room.imageurls.map(url => {

                  return <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}   
                    alt = " "                 
                  />                  
                </Carousel.Item>

                })}
                
              </Carousel>

                <p>{room.description}</p>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>

          </Modal>

        </div>        

    </div>
  )
}

export default Room;
