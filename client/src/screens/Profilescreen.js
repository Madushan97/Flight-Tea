import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { Tag, Divider } from'antd'

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {

        if(!user) {
            window.location.href='/login'
        }
    }, [])
    
    return(
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1" >

                <TabPane tab="Profile" key="1">
                   <h1>Profile</h1><br/>
                   <h1>Name : {user.name}</h1>
                   <h1>Email : {user.email}</h1>
                   <h1>Is Admin : {user.isAdmin ? 'Yes' : 'No' }</h1>

                </TabPane>

                <TabPane tab="Bookings" key="2">
                   <MyBookings/>              
                </TabPane>
               
            </Tabs>
        </div>
    )
}

export default Profilescreen;


export function MyBookings() {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    const[bookings, setbookings] = useState([])
    const[loading, setloading] = useState(false);
    const[error, seterror] = useState();

    useEffect(async() => {

      try {
          setloading(true)
        const data = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid : user._id })).data
        console.log(data);
        setbookings(data)
        setloading(false)
       

      } catch (error) {
          console.log(error);
          setloading(false)
          seterror(error)
         
          
      }
    }, [])

    async function cancelBooking(bookingid, roomid) {

        try {
            setloading(true)
            const result = await (await axios.post('/api/bookings/cancelBooking', {bookingid, roomid})).data
            console.log(result);
            setloading(false)
            Swal.fire('congrats', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error);
            setloading(false)
            Swal.fire('Oooooops', 'Something went wrong :(', 'error')
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader/>)}
                    {bookings && (bookings.map(booking => {

                        return <div className='bs'>
                            <h1>{booking.room}</h1><br/>
                            <p>Booking ID : {booking._id}</p>
                            <p>Checking Date : {booking._id}</p>
                            <b>Booking In :</b><p> {booking.fromdate}</p>
                            <b>Checkout : </b><p>{booking.todate}</p>
                            <b>Amount : </b><p>{booking.totalamount} LKR</p>
                            <b>status : </b><p>{
                                booking.status==='Cancelled' ? (<Tag color='orange'>Cancelled</Tag>) :
                                (<Tag color='green'>Confirmed</Tag>)
                                }</p>

                           {booking.status !== 'Cancelled' && (
                                <div className='text-right'>
                                <button className ='btn btn-success' onClick={() => {cancelBooking(booking._id, booking.roomid)}}>CANCEL BOOKING</button>
                            </div>
                           )}
                        </div>

                        

                    }))}
                </div>
            </div>
        </div>
    )
}

