import React from 'react';

function Room({room}) {
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
                <button className='btn btn-success'>View Details</button>
              </div>

          </div>
        </div>
    </div>
  )
}

export default Room;
