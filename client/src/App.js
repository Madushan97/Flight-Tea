import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route} from 'react-router-dom'
import Registerscreen from './screens/Registerscreen';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen'
import Profilescreen from './screens/Profilescreen'
import Adminscreen from './screens/Adminscreen'

function App() {
  return (
    <div className="App">

      <Navbar/>
      <BrowserRouter>

        <Route path='/home' component={Homescreen}/>
        <Route path='/book/:roomid/:fromdate/:todate' exact component={Bookingscreen}/>
        <Route path='/register' exact component={Registerscreen}/>
        <Route path='/login' exact component={Loginscreen}/>
        <Route path='/profile' exact component={Profilescreen}/>
        <Route path='/admin' exact component={Adminscreen}/>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
