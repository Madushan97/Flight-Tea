import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';


function Bookingscreen({match}) {

    const[loading, setloading] = useState(true);
    const[error, seterror] = useState();
    const[room, setroom] = useState();

    useEffect(async() => {

        try {

            setloading(true)
            // fetch the details from rooms model
            const data = (await axios.post('/api/rooms/getroombyid', {roomid : match.params.roomid})).data
            setroom(data);
            setloading(false)
            
        } catch (error) { 
            setloading(false)
            seterror(true)           
            // console.log(error);

        }
    }, [])

  return (
    <div className='m-5'>
        {loading ? (<Loader/>) : room ? (<div>

            <div className='row justify-content-center mt-5 bs'>

                <div className='col-md-6'>
                    <h1>{room.name}</h1>
                    <img src={room.imageurls[0]} className='bigimg'/>
                </div>

                <div className='col-md-6'>
                    <h1>Booking Details</h1>
                    <hr/>

                    <div>
                        <b>
                        <p>Name :</p>
                        <p>From Date :</p>
                        <p>To Date :</p>
                        <p>Max Count : {room.maxcount}</p>
                        </b>
                    </div>

                    <div>
                        <h1>Amount</h1>
                        <hr/>

                        <b>
                        <p>Total Days :</p>
                        <p>Rent per Day : {room.rentperday}</p>
                        <p>Total Amount :</p>                        
                        </b>
                    </div>

                    <div style={{float:'right'}}>
                        <button className='btn btn-success'>Pay Now</button>
                    </div>

                </div>

            </div>

        </div>
        ) :
             (<Error/>)
        }
        
    </div>
  )
}

export default Bookingscreen;
