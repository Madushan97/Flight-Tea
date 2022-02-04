import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import moment from 'moment';

const { RangePicker } = DatePicker;

function Homescreen() {

    const[rooms, setrooms] = useState([])
    const[loading, setloading] = useState(true)
    const[error, seterror] = useState()

    const[fromdate, setfromdate] = useState()
    const[todate, settodate] = useState()

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

    function filterByDate(dates) {
        
        setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
        settodate(moment(dates[1]).format('DD-MM-YYYY'));
        
    }

  return (
    <div className='container mt-5'>

        <div className='row'>
            <div className='col-md-3'>
                <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
            </div>
        </div>

        <div className='row justify-content-center mt-5'>
            {loading ? (<Loader/>) : rooms.length>1 ? (rooms.map((room) => {
            // 9 columns
            return <div className='col-md-9 mt-2'>
                <Room room={room} fromdate={fromdate} todate={todate}/>
            </div>
        })
            ) : (<Error/>)
        }
        </div>      
    </div>
  )
}

export default Homescreen;
