import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Loginscreen(){

    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')

    async function Login(){
       
            const user = {                
                email,
                password,                
            }
            try {
                const result = await axios.post('/api/users/login', user).data

            } catch (error) {
                console.error(error);

            }
            console.log(user)        
        }        
    

    return (

        
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5'>

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