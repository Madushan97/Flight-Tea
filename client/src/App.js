import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Link} from 'react-router-dom'

import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';

function App() {
  return (
    <div className="App">

      <Navbar/>
      <BrowserRouter>

        <Route path='/home' component={Homescreen}/>
        <Route path='/book/:roomid' exact component={Bookingscreen}/>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
