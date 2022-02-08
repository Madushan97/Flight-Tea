import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';


const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {

        if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
            window.location.href='/home'
        }

    }, [])

    return (
        <div className='mt-3 ml-3 mr-3'>
            <h1 align='center'>Admin Panel</h1>

            <Tabs defaultActiveKey="1">

                <TabPane tab="Bookings" key="1">
                <Bookings/>
                </TabPane>

                <TabPane tab="Rooms" key="2">
                <Rooms/>
                </TabPane>

                <TabPane tab="Add Rooms" key="3">
                <h1>Add Rooms</h1>
                </TabPane>

                <TabPane tab="Users List" key="4">
                <Users/>
                </TabPane>

            </Tabs>
        </div>
    )
}

export default Adminscreen;


export function Bookings() {

    const[bookings, setbookings] = useState([])
    const[loading, setloading] = useState(true);
    const[error, seterror] = useState();

    useEffect(async() => {
        try {
            const data = await (await axios.get('/api/bookings/getallbookings')).data
            setbookings(data)
            setloading(false)
        } catch (error) {
            console.log(error);
            setloading(false)
            seterror(error)
        }

    }, [])

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Bookings</h1>
                {loading && (<Loader/>)}

                <table className='table table-border table-success'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                         {bookings.length && (bookings.map(booking => {
                             return <tr>
                                 <td>{booking._id}</td>
                                 <td>{booking.userid}</td>
                                 <td>{booking.room}</td>
                                 <td>{booking.fromdate}</td>
                                 <td>{booking.todate}</td>
                                 <td>{booking.status}</td>
                                 
                             </tr>
                         }))}
                    </tbody>
                </table>

                
            </div>
        </div>
    )
}


export function Rooms() {

    const[rooms, setrooms] = useState([])
    const[loading, setloading] = useState(true);
    const[error, seterror] = useState();

    useEffect(async() => {
        try {
            const data = await (await axios.get('/api/rooms/getallrooms')).data
            setrooms(data)
            setloading(false)
        } catch (error) {
            console.log(error);
            setloading(false)
            seterror(error)
        }

    }, [])

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Rooms</h1>
                {loading && (<Loader/>)}

                <table className='table table-border table-success'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Room ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number </th>
                            
                        </tr>
                    </thead>

                    <tbody>
                         {rooms.length && (rooms.map(room => {
                             return <tr>
                                 <td>{room._id}</td>
                                 <td>{room.name}</td>
                                 <td>{room.type}</td>
                                 <td>{room.rentperday}</td>
                                 <td>{room.maxcount}</td>
                                 <td>{room.phonenumber}</td>
                                 
                             </tr>
                         }))}
                    </tbody>
                </table>

                
            </div>
        </div>
    )
}

export function Users() {

    const[users, setusers] = useState([])
    const[loading, setloading] = useState(true);
    const[error, seterror] = useState();

    useEffect(async() => {
        try {
            const data = await (await axios.get('/api/users/getallusers')).data
            setusers(data)
            setloading(false)
        } catch (error) {
            console.log(error);
            setloading(false)
            seterror(error)
        }

    }, [])

    return(
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && (<Loader/>)}
                <table className='table table-border table-success'>

                    <thead className='thead-dark'>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}