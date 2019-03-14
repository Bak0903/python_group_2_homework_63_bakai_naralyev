import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import './Layout.css';


class Layout extends Component {
    render() {
        return <div className='App'>
            <div className='m-2 col-12 clearfix bg-info p-2'>
                <div><NavLink to='/' className="btn btn-dark float-left mr-2">Фильмы</NavLink></div>
                <div><NavLink to='/halls' className="btn btn-dark float-left">Залы</NavLink></div>
            </div>
            <div>
                {this.props.children}
            </div>
        </div>;
    }
}


export default Layout;