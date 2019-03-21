import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import './Layout.css';


class Layout extends Component {
    render() {
        return <div className='App'>
            <div className='mb-2 col-12 clearfix bg-info p-2'>
                {localStorage.getItem('auth-token')
                    ? <div><NavLink className='btn btn-danger float-left mr-2' to="/logout">Выйти</NavLink></div>
                    : <div><NavLink className='btn btn-danger float-left mr-2' to="/login">Войти</NavLink></div>}
                <div><NavLink to='/halls/add' className='btn btn-warning float-right mr-2'>Добавить зал</NavLink></div>
                <div><NavLink to='/movies/add' className='btn btn-warning float-right mr-2'>Добавить фильм</NavLink></div>
                <div><NavLink to='/' className="btn btn-dark float-left mr-2">Фильмы</NavLink></div>
                <div><NavLink to='/halls' className="btn btn-dark float-left  mr-2">Залы</NavLink></div>
            </div>
            <div>
                {this.props.children}
            </div>
        </div>;
    }
}


export default Layout;