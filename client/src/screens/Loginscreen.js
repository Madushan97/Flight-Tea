import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen(){

    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')

    const[loading, setloading] = useState(false);
    const[error, seterror] = useState();

    async function Login(){
       
            const user = {                
                email,
                password,                
            }
            try {
                setloading(true)
                const result = (await axios.post('/api/users/login', user)).data
                setloading(false)

                // store user in local storage to navigate him anywhere
                localStorage.setItem('currentUser', JSON.stringify(result))
                window.location.href = '/home'

            } catch (error) {
                console.error(error);
                setloading(false)
                seterror(true)

            }
            
        }    

    return (
        
        <div>          

            <div className='row justify-content-center mt-5'>
            {loading && (<Loader/>)}
                <div className='col-md-5 mt-5'>

                    {error && (<Error message = 'Invalid Credentials :('/>)}

                    <div className='bs'>
                        <h2 align='center'>Login</h2>

                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='E-Mail' 
                            value={email} 
                            onChange={(e) =>{setemail(e.target.value)}}
                        />

                        <input 
                            type='password' 
                            className='form-control' 
                            placeholder='Password'
                            value={password} 
                            onChange={(e) =>{setpassword(e.target.value)}}
                        />                 

                        <button className='btn btn-success mt-3 btn-lg' onClick={Login}>Login</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen;