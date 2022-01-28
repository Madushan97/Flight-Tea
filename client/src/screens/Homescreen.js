import React, { useEffect, useState } from 'react';
import axios from 'axios'

function Homescreen() {

    const[rooms, setrooms] = useState([])

    useEffect( async() => {

        try {

            // fetch the details from rooms model
            const data = (await axios.get('/api/rooms/getallrooms')).data

            setrooms(data);
            
        } catch (error) {
            
            console.log(error);

        }
    }, [])

  return (
    <div>
        <h2>Home Screen</h2>
        <h3>There are {rooms.length} rooms </h3>
    </div>
  )
}

export default Homescreen;
