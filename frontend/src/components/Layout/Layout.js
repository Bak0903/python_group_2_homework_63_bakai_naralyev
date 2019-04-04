import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import './Layout.css';
import AuthBar from '../AuthBar/AuthBar';


class Layout extends Component {
    render() {
            return <div className='App'>
                <div className='d-flex justify-content-between col-12 mb-2 bg-info p-2'>
                    <div className='d-flex'>
                        <NavLink to='/' className="myButton">Фильмы</NavLink>
                        <NavLink to='/halls' className="myButton">Залы</NavLink>
                    </div>
                    <div className='d-flex'>
                        <NavLink to='/halls/add' className='myButton'>Добавить зал</NavLink>
                        <NavLink to='/movies/add' className='myButton'>Добавить фильм</NavLink>
                    </div>

                    <div className='d-flex'>
                        <AuthBar/>
                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>;
        }
    }

export default (Layout);