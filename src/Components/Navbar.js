import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="shadow " style={{display:'flex' ,background:"#EBEDEF",paddingBottom:'1rem',paddingLeft:'1rem',marginBottom:"2rem"}}>
                <Link to="/" style={{textDecoration:'none'}}><h1 style={{marginTop:'1rem',marginLeft:'1rem'}}>Movies App</h1></Link>
                <Link to="/favourites" style={{textDecoration:'none'}}><h2 style={{marginLeft:'2rem',marginTop:'1.5rem'}}>Favourites</h2></Link>
                
                
            </div>
        )
    }
}
