import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';


function Bookingscreen({ match }) {

    const[loading, setloading] = useState(true);
    const[error, seterror] = useState();
    const[room, setroom] = useState();

    const roomid = match.params.roomid
    const rentperday = match.params.rentperday
    const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
    const todate = moment(match.params.todate, 'DD-MM-YYYY')
   
    // different between 2 days
    const totaldays = moment.duration(todate.diff(fromdate)).asDays()+1;
    
    const[totalamount, settotalamount] = useState()

    useEffect(async() => {

        try {
            setloading(true);            
            const data = (await axios.post('/api/rooms/getroombyid', {roomid : match.params.roomid})).data;
            settotalamount(data.rentperday * totaldays)
            setroom(data);
            setloading(false);
            
        } catch (error) { 
            seterror(true)           
            setloading(false)
        }
    }, []);

    async function bookRoom() {

        const bookingDetails = {

            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays
        }

        try {
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)

        } catch (error) {
            
        }
    }

  return (
    <div className='m-5'>

        {loading ? (<Loader/>) : room ? (<div>

            <div className='row justify-content-center mt-5 bs'>
            
                <div className='col-md-6'>
                    <h1>{room.name}</h1>
                    <img src={room.imageurls[0]} className='bigimg' alt=''/>
                </div>

                <div className='col-md-6'>
                    <h1>Booking Details</h1>
                    <hr/>

                    <div>
                        <b>
                        <p>Name :{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                        <p>From Date : {match.params.fromdate}</p>
                        <p>To Date : {match.params.todate}</p>
                        <p>Max Count : {room.maxcount}</p>
                        </b>
                    </div>

                    <div>
                        <h1>Amount</h1>
                        <hr/>

                        <b>
                        <p>Total Days : {totaldays}</p>
                        <p>Rent per Day : {room.rentperday}</p>
                        <p>Total Amount : {totalamount}</p>                        
                        </b>
                    </div>

                    <div style={{float:'right'}}>
                        <button className='btn btn-success' onClick={bookRoom}>Pay Now</button>
                    </div>

                </div>

            </div>

        </div>) : (<Error/>)}        
        
    </div>
  );
}

export default Bookingscreen;
