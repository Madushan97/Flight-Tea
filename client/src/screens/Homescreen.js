import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Room from '../components/Room';

function Homescreen() {

    const[rooms, setrooms] = useState([])
    const[loading, setloading] = useState()
    const[error, seterror] = useState()

    useEffect( async() => {

        try {

            setloading(true)
            // fetch the details from rooms model
            const data = (await axios.get('/api/rooms/getallrooms')).data
            setrooms(data);
            setloading(false)
            
        } catch (error) { 
            seterror(true)           
            console.log(error);
            setloading(false)

        }
    }, [])

  return (
    <div className='container'>
        <div className='row justify-content-center mt-5'>
            {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (rooms.map(room => {
            // 9 columns
            return <div className='col-md-9 mt-2'>
                <Room room={room}/>
            </div>
        }))}
        </div>      
    </div>
  )
}

export default Homescreen;
