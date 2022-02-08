import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration: 2000
});

function Landingscreen() {

    return(
        <div className="row landing">
            <div className="col-md-12 text-center">
                <h2 data-aos='zoom-in' style={{color:'white', fontSize:'100px'}}>Flight Tea</h2>
                <h1 data-aos='zoom-out' style={{color:'white'}}>The great advantage of a hotel is that it is a refuge from home life</h1>
                <Link to='/home'>
                    <button className="btn btn-success btn-lg">Get STarted</button>
                </Link>
            </div>
        </div>
    )
}

export default Landingscreen;